import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SingleRecipe from "./SingleRecipe/SingleRecipe";

function CardRecipe(props) {
  const [state, setstate] = useState(null);

  useEffect(() => {
    if (props.recipies) {
      setstate([ ...props.recipies ]);
    }
  }, [props.recipies]);
  console.log(state);

  let recipelist = "";
  if (state) {
    recipelist = state.map((r) => <SingleRecipe key={r.date} recipe={r} />);
  }

  return recipelist;
}

const mapStateToProps = (state) => {
  return {
    recipies: state.RecipeReducer.recipies,
  };
};

export default connect(mapStateToProps)(CardRecipe);
