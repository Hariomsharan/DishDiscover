import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../features/Recipes/recipeSlice";

const RecipeCard = (props) => {
  const { dish, chef, description, image, _id } = props.recipe;
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMyRecipePage = location.pathname === "/my-recipe";

  const viewrecipe = (e) => {
    navigate("/view-recipe", { state: { recipe: e } });
  };

  const handleUpdate = (e) => {
    navigate("/update-recipe", { state: { recipe: e } });
  };

  const handleDelete = () => {
    dispatch(deleteRecipe(_id));
    setShowDropdown(false); // Close the dropdown after deleting
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <div className="flex flex-wrap justify-center items-center mr-4">
      <div className="bg-[#FCF5E5] rounded-lg shadow-lg p-4 m-4 w-[300px] h-[400px] relative">
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{dish}</h2>
            <p className="text-gray-600 text-sm font-medium">
              By {chef.username}
            </p>
          </div>
          {isMyRecipePage && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <i className="ri-more-2-fill text-xl text-gray-600"></i>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => handleUpdate(props.recipe)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <i className="ri-edit-line mr-2"></i>
                    Update Recipe
                  </button>
                  <button
                    onClick={handleDelete}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <i className="ri-delete-bin-line mr-2"></i>
                    Delete Recipe
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <img
          src={image}
          alt="Recipe"
          className="rounded-t-lg h-[200px] w-full object-cover"
        />
        <div className="mt-4">
          <p className="text-gray-600 truncate">{description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => viewrecipe(props.recipe)}
              className="mt-4 bg-[#4CAF50] text-white py-2 px-4 rounded hover:bg-[#45a049]"
            >
              View Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
