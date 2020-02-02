import React, { useEffect, useState } from "react";
//import AppInfo from "./AppInfo";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "84242fbb";
  const APP_KEY = "ad028f406ecb3a11937225bffb20eb36";

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        console.log(URL);
        const response = await fetch(URL, {
          mode: "cors"
        });
        console.log(response);
        const data = await response.json();
        console.log("response done, let's read the json");
        setRecipes(data.hits);
        console.log(data.hits);
      } catch (error) {
        setError(error);
        console.log("it is broken");
        console.error(error.message);
      }
    };

    getRecipes();
    console.log("effect has been run");
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  if (error) {
    return <div style={{ color: "red" }}>{error.message}</div>;
  }

  return (
    <div className="App">
      <h1 className="header">Recipe Search</h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
