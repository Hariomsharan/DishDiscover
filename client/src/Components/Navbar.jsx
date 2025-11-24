import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/userAuth/authSlice";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const { recipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter recipes based on search term
  const filteredRecipes = recipes
    ?.filter((recipe) =>
      recipe.dish.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.dish.localeCompare(b.dish)); // Sort alphabetically

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-screen h-14 flex justify-between items-center px-6">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-18 w-18" />
        <Link
          to="/home"
          className="text-base font-medium text-[#4CAF50] hover:text-yellow-500"
        >
          Home
        </Link>
        <Link
          to="/my-recipe"
          className="text-base font-medium text-[#4CAF50] hover:text-yellow-500"
        >
          MyRecipies
        </Link>
        <Link
          to="/add-recipe"
          className="text-base font-medium text-[#4CAF50] hover:text-yellow-500"
        >
          AddRecipe
        </Link>
        <Link
          to="/reset-password"
          className="text-base font-medium text-[#4CAF50] hover:text-yellow-500"
        >
          ResetPassword
        </Link>
      </div>
      <div className="flex items-center relative" ref={searchRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          placeholder="Search for a dish..."
          className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#4CAF50] w-64"
        />
        <i className="ri-search-2-line absolute right-18 top-5 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
        <button onClick={() => dispatch(logout())} className="bg-[#4CAF50] hover:bg-yellow-500 hover:cursor-pointer text-white font-medium py-2 px-3 ml-5 rounded-full">
          <i className="ri-logout-circle-r-line"></i>
        </button>

        {/* Search Results Dropdown */}
        {showResults && searchTerm && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
            {filteredRecipes?.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Link
                  key={recipe._id}
                  to={{
                    pathname: '/view-recipe/',
                    state: { recipe }
                  }}
                  state={{ recipe }}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowResults(false)}
                >
                  <div className="flex items-center">
                    <img
                      src={recipe.image}
                      alt={recipe.dish}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {recipe.dish}
                      </div>
                      <div className="text-sm text-gray-500">
                        by {recipe.chef.username}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No recipes found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
