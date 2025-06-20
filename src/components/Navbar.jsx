import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (fav) => {
    dispatch({
      type: "toggle_favorite",
      payload: fav
    });
  };

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        StarWars App
      </Link>

      <div className="dropdown ms-auto">
        <button
          className="btn btn-warning dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites <span className="badge bg-dark">{store.favorites.length}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: "250px" }}>
          {store.favorites.length === 0 ? (
            <li className="dropdown-item text-muted">No favorites yet</li>
          ) : (
            store.favorites.map((fav, index) => (
              <li key={`${fav.type}-${fav.uid}`} className="dropdown-item d-flex justify-content-between align-items-center">
                <Link to={`/${fav.type}/${fav.uid}`} className="me-2 text-decoration-none text-dark">
                  {fav.name}
                </Link>
                <button
                  onClick={() => handleRemove(fav)}
                  className="btn btn-sm btn-outline-danger"
                >
                  &times;
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};
