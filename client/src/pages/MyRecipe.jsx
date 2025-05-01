import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard";
import Navbar from "../Components/Navbar";
import { getUserRecipes } from "../features/Recipes/recipeSlice";

const MyRecipe = () => {
  const { myRecipes, loading } = useSelector((state) => state.recipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(getUserRecipes());
    }
  }, [10000]);

  let recipielist = <div className="text-2xl">Loading...</div>;
  if (myRecipes) {
    recipielist = myRecipes.map((r) => <RecipeCard key={r._id} recipe={r} />);
  } 
  if (myRecipes.length === 0) {
    recipielist = (
      <div className="text-2xl text-center w-full h-full flex justify-center items-center">
        No Recipes Found
      </div>
    );

  }
  else if (loading === true) {
    recipielist = <div className="text-2xl">Loading...</div>;
  }


  return (
    <div className="h-[100%] w-[100%] overflow-y-hidden">
      <Navbar />
      <div className="py-5 px-15 h-[100%] w-full flex flex-wrap overflow-y-hidden">
        {recipielist}
      </div>
    </div>
  );
};

export default MyRecipe;
