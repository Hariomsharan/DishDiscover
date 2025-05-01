import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/userAuth/authSlice";
import recipeReducer from "../features/Recipes/recipeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer
  }, // Add your reducers here
}); 

 