import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./nav.css";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost/Recipe-App/Backend/api/search.php`,
        {
          params: { recipe_name: searchTerm },
        }
      );
      setSearchResult(response.data);
      // Handle the result as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Recipe App</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <button>
            <Link to="/home">All Recipes</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/addNewRecipe">Add New Recipe</Link>
          </button>
        </li>
        <li>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Recipes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
