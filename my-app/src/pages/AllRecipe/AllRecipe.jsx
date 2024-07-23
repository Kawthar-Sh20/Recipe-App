import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AllRecipe.css"; // Import the CSS file
import NavBar from "../navBar/nav";
import jsPDF from "jspdf";
// import "jspdf-autotable";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [starValue, setStarValue] = useState(0);
  const [userId, setUserId] = useState(10); // Replace with actual user ID

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost/Recipe-App/Backend/api/get.php"
        );
        console.log(response.data); // Log the response data
        setRecipes(response.data); // Directly set the array of recipes
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const parseIngredients = (ingredients) => {
    try {
      return JSON.parse(ingredients);
    } catch (error) {
      console.error("Error parsing ingredients:", error);
      return [];
    }
  };

  const parseSteps = (steps) => {
    try {
      return JSON.parse(steps);
    } catch (error) {
      console.error("Error parsing steps:", error);
      return [];
    }
  };

  const toggleRecipe = (id) => {
    setSelectedRecipe(selectedRecipe === id ? null : id);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleStarChange = (e) => {
    setStarValue(e.target.value);
  };

  const handleCommentSubmit = async (recipeId) => {
    console.log(
      "Submitting comment for user_id:",
      userId,
      "recipe_id:",
      recipeId
    ); // Log user_id and recipe_id
    try {
      const response = await axios.post(
        "http://localhost/Recipe-App/Backend/api/comment.php",
        {
          recipe_id: recipeId,
          user_id: userId,
          content: comment,
        }
      );
      console.log(response.data);
      if (response.data.message) {
        alert("Comment added successfully");
        setComment(""); // Clear the comment input
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment: " + error.message);
    }
  };

  const handleStarSubmit = async (recipeId) => {
    console.log(
      "Submitting star for user_id:",
      userId,
      "recipe_id:",
      recipeId,
      "star_value:",
      starValue
    ); // Log user_id, recipe_id, and star_value
    try {
      const response = await axios.post(
        "http://localhost/Recipe-App/Backend/api/star.php",
        {
          id_recipe: recipeId,
          id_user: userId,
          star_value: starValue,
        }
      );
      console.log(response.data);
      if (response.data.message) {
        setStarValue(0); // Clear the star input
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      console.error("Error adding star:", error);
      alert("Error adding star: " + error.message);
    }
  };

  const downloadPDF = (recipe) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 10;
    let y = 20;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(24);
    doc.text(recipe.recipe_name, margin, y);
    y += 10;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(16);
    doc.text(`Created by: ${recipe.username}`, margin, y);
    y += 20;

    doc.setFontSize(18);
    doc.setTextColor("#007bff");
    doc.text("Ingredients", margin, y);
    y += 10;
    doc.setTextColor("#000000");
    const ingredients = parseIngredients(recipe.ingredients);
    ingredients.forEach((ingredient) => {
      const lines = doc.splitTextToSize(
        `- ${ingredient.ingredient}: ${ingredient.quantity}`,
        maxLineWidth
      );
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
    });

    doc.setFontSize(18);
    doc.setTextColor("#007bff");
    doc.text("Steps", margin, y);
    y += 10;
    doc.setTextColor("#000000");
    const steps = parseSteps(recipe.steps);
    steps.forEach((step, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${step}`, maxLineWidth);
      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
    });

    doc.save(`${recipe.recipe_name}.pdf`);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error)
    return <p className="error">Error loading recipes: {error.message}</p>;

  return (
    <div className="container">
      <NavBar />
      <h1>All Recipes</h1>
      <div className="recipe-list">
        {Array.isArray(recipes) && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className={`recipe-item ${
                selectedRecipe === recipe.recipe_id ? "selected" : ""
              }`}
              onClick={() => toggleRecipe(recipe.recipe_id)}
            >
              <h2>{recipe.recipe_name}</h2>
              {selectedRecipe === recipe.recipe_id && (
                <div>
                  <h3>Ingredients:</h3>
                  <ul>
                    {parseIngredients(recipe.ingredients).map(
                      (ingredient, index) => (
                        <li key={index}>
                          {ingredient.ingredient}: {ingredient.quantity}
                        </li>
                      )
                    )}
                  </ul>
                  <h3>Steps:</h3>
                  <ol>
                    {parseSteps(recipe.steps).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                  <div className="comment-section">
                    <h3>Add a Comment:</h3>
                    <textarea
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Enter your comment"
                    />
                    <button
                      onClick={() => handleCommentSubmit(recipe.recipe_id)}
                    >
                      Submit Comment
                    </button>
                  </div>
                  <div className="star-section">
                    <h3>Rate this Recipe:</h3>
                    <input
                      type="number"
                      value={starValue}
                      onChange={handleStarChange}
                      placeholder="Enter star value (1-5)"
                    />
                    <button onClick={() => handleStarSubmit(recipe.recipe_id)}>
                      Submit Star
                    </button>
                  </div>
                  <div className="pdf-section">
                    <button onClick={() => downloadPDF(recipe)}>
                      Download as PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-recipes">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default AllRecipe;
