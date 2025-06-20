import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const isFav = store.favorites.some(
    (fav) => fav.uid === item.uid && fav.type === type
  );

 
  const imageUrl = `https://placehold.co/400x600?text=${encodeURIComponent(item.name)}`;

  const handleToggleFavorite = () => {
    dispatch({
      type: "toggle_favorite",
      payload: {
        uid: item.uid,
        name: item.name,
        type: type
      }
    });
  };

  return (
    <div className="card h-100">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={item.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <div className="mt-auto d-flex justify-content-between">
          <Link to={`/${type}/${item.uid}`} className="btn btn-primary">
            Details
          </Link>
          <button
            onClick={handleToggleFavorite}
            className={`btn ${isFav ? "btn-danger" : "btn-outline-danger"}`}
          >
            {isFav ? "Remove" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
