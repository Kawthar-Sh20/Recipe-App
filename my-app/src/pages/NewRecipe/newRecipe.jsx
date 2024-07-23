import React, { useState } from "react";
import axios from "axios";
import "./newRecipe.css";
import NavBar from "../navBar/nav";

const NewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
  ]);
  const [steps, setSteps] = useState([""]);
  const [userId, setUserId] = useState(""); // Assuming user_id is available and will be provided
  const [message, setMessage] = useState("");

  const handleRecipeNameChange = (e) => {
    setRecipeName(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = steps.map((step, i) => (i === index ? value : step));
    setSteps(newSteps);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      recipe_name: recipeName,
      ingredients,
      steps,
      user_id: userId,
    };

    try {
      const response = await axios.post(
        "http://localhost/Recipe-App/Backend/api/insertRecipe.php",
        newRecipe,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      setMessage("Error creating recipe");
    }
  };

  return (
    <div className="create-recipe-container">
      <NavBar />
      <form className="create-recipe-form" onSubmit={handleSubmit}>
        <h2>Create Recipe</h2>
        <div className="form-group">
          <label>Recipe Name:</label>
          <input
            type="text"
            value={recipeName}
            onChange={handleRecipeNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient.ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, "ingredient", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <div className="form-group">
          <label>Steps:</label>
          {steps.map((step, index) => (
            <div key={index} className="step-group">
              <input
                type="text"
                placeholder="Step"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addStep}>
            Add Step
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewRecipe;
