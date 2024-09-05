import "./modal.css";
function Modal({ recipe, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{recipe.name}</h2>
        <img src={recipe.imageUrl} alt={recipe.name} />
        <p> Ingredients :{recipe.ingredients}</p>
        <p>{recipe.instructions}</p>
        <p>Cooking Time : {recipe.cookingTime} minutes</p>
      </div>
    </div>
  );
}

export default Modal;
