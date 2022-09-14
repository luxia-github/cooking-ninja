// styles
import "./Create.css";
//
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebasee/config";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInputRef = useRef();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title: title,
      ingredients: ingredients,
      method: method,
      cookingTime: cookingTime + "minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients((prev) => [...prev, newIngredient]);
      setNewIngredient("");
      ingredientInputRef.current.focus();
    }
  };

  return (
    <div className="create">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value.trim())}
              value={newIngredient}
              ref={ingredientInputRef}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}{" "}
        </p>

        <label>
          <span>Method:</span>
          <textarea
            type="text"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
}
