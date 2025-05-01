import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Utility/AxiosConfig";
import { jwtDecode } from "jwt-decode";

const initialState = {
  recipes: [],
  loading: false,
  error: null,
  myRecipes: [],
};

export const getRecipes = createAsyncThunk("recipes/getRecipes", async () => {
  try {
    const response = await axios.get("users/recipe/getRecipesRoute", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe) => {
    try {
      const response = await axios.post("users/recipe/createrecipe", recipe, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getUserRecipes = createAsyncThunk(
  "recipes/getUserRecipes",
  async () => {
    try {
      const response = await axios.get(
        `users/recipe/getUserRecipe/${
          jwtDecode(localStorage.getItem("token")).user._id
        }`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe) => {
    try {
      const response = await axios.post(
        `users/recipe/editrecipe/${recipe.id}`,
        recipe,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    try {
      const response = await axios.delete(
        `users/recipe/deleterecipe/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.recipes;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload.recipe); // Assuming the response contains the added recipe
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.myRecipes = action.payload.recipes; // Assuming the response contains the user's recipes
      })
      .addCase(getUserRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recipes.findIndex(
          (recipe) => recipe._id === action.payload.recipe._id
        );
        if (index !== -1) {
          state.recipes[index] = action.payload.recipe; // Update the recipe in the state
        }
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recipes.findIndex(
          (recipe) => recipe._id === action.payload.recipe._id
        );
        if (index !== -1) {
          state.recipes.splice(index, 1); // Remove the recipe from the state
        }
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
