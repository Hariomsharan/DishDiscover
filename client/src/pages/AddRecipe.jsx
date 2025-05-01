import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch } from "react-redux";
import { addRecipe } from "../features/Recipes/recipeSlice";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    dish: "",
    ingredients: [""],
    image: "",
    description: "",
  });

  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setRecipe((prev) => ({
  //       ...prev,
  //       image: file,
  //     }));
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submission logic here
    dispatch(addRecipe(recipe));


    setRecipe({
      dish: "",
      ingredients: [""],
      image: "",
      description: "",
    });


    // Show notification
    setShowNotification(true);
    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-500">
          Successfully Created!
        </div>
      )}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Create New Recipe
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dish Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dish Name
                </label>
                <input
                  type="text"
                  name="dish"
                  value={recipe.dish}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recipe Image Link
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    name="image"
                    value={recipe.image}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                  />
                </div>
                {/* {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Recipe preview"
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                )} */}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                  required
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients
                </label>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                      placeholder="Add ingredient"
                      required
                    />
                    {recipe.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-2 px-4 py-2 border border-[#4CAF50] text-[#4CAF50] rounded-md hover:bg-[#4CAF50] hover:text-white"
                >
                  Add Ingredient
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-5">
                <button
                  type="submit"
                  className="w-full bg-[#4CAF50] text-white py-2 px-4 rounded-md hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50]"
                >
                  Create Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
