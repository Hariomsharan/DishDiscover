import React from 'react';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';

const ViewRecipe = () => {
  const location = useLocation();
  const recipe = location.state?.recipe; // Get the recipe from the state passed by the router

  return (
    <div className="w-[100%] bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Recipe Image */}
          <div className="h-78 w-full overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.dish}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=No+Image+Available';
              }}
            />
          </div>

          {/* Recipe Content */}
          <div className="p-6">
            {/* Title and Chef Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.dish}</h1>
              <p className="text-sm text-gray-600">
                Created by <span className="font-medium text-[#4CAF50]">{recipe.chef.name}</span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700">{recipe.description}</p>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Ingredients</h2>
              <ul className="grid grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#4CAF50] mr-2">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timestamp Info */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;