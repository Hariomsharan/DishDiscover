import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import RecipeCard from "../Components/RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../features/Recipes/recipeSlice";

const Home = () => {
  const { recipes, loading } = useSelector((state) => state.recipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(getRecipes());
    }
  }, [10000]);

  let recipielist = <div className="text-2xl">Loading...</div>;
  if (recipes) {
    recipielist = recipes.map((r) => <RecipeCard key={r._id} recipe={r} />);
  } else if (loading === true) {
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

export default Home;
