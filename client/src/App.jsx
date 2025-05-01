import React from "react";
import 'remixicon/fonts/remixicon.css';
import Navbar from "./Components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ViewRecipe from "./pages/ViewRecipe";
import AddRecipe from "./pages/AddRecipe";
import MyFavourites from "./pages/MyFavourites";
import MyRecipe from "./pages/MyRecipe";
import { useSelector } from "react-redux";
import UpdateRecipe from "./pages/UpdateRecipe";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {

  const auth = useSelector((state) => state.auth);

  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/view-recipe" element={<ViewRecipe />} />
        <Route path="/add-recipe" element={<AddRecipe />} /> 
        <Route path="/my-favourites" element={<MyFavourites />} />
        <Route path="/my-recipe" element={<MyRecipe />} />
        <Route path="/update-recipe" element={<UpdateRecipe />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
