import React from 'react';

const SavedRecipes = (props) => {
  const list = props.data.map((recipe, ind) => (
      <p className="list" key={ind} onClick={() => props.handleClick(ind)}>{recipe.name}</p>
    )
  )

  if(props.data.length < 1) {
    return (
      <h1 className="defaultMessage">Add A Recipe</h1>
    )
  }

  return (
    <div className="savedRecipes">
      {list}
    </div>
  );
}

export default SavedRecipes;
