import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Transhcan from "../assets/trashcan.svg";
import { projectFirestore } from "../firebasee/config";

// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No recipes found</div>;
  }

  const handleCLick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            src={Transhcan}
            alt="delete icon"
            onClick={() => handleCLick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
