import React, { useEffect, useState } from "react";
import {_APP_ID, _APP_KEY} from "./AppInfo";
import Recipe from "./Recipe";
import "./App.css";

console.log("from:" + _APP_KEY)

const App = () => {
  
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("vegan");

  useEffect(() => {
    const APP_ID = _APP_ID;
    const APP_KEY = _APP_KEY;

    const getRecipes = async () => {
      try {
        const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        //console.log(URL);
        const response = await fetch(URL, {
          mode: "cors"
        });
        //console.log(response);
        const data = await response.json();
        console.log("response done, let's read the json");
        setRecipes(data.hits);
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
      <header className="app_header">
        <h1 className="app_title">Recipe Search</h1>
      </header>
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
            key={recipe.recipe.uri}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
