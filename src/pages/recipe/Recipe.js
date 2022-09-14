// styles
import "./Recipe.css";

//
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebasee/config";

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setIsPending(false);
            setRecipe(doc.data());
          } else {
            setIsPending(false);
            setError("Could not find that recipe");
          }
        },
        (err) => console.log(err)
      );

    // the clean up functin will automatically fire when the component unmounts from the dom
    return () => unsub();
  }, [id]);

  const handleCLick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Something compeletly different",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleCLick}>Update me</button>
        </>
      )}
    </div>
  );
}
