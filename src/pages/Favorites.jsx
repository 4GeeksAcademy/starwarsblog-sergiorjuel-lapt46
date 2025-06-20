import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

export const Favorites = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Saved Favorites</h2>

      {store.favorites.length === 0 ? (
        <p className="text-muted">You have no favorites yet. Go save something from the main page!</p>
      ) : (
        <div className="row">
          {store.favorites.map((item) => (
            <div className="col-md-4 mb-3" key={`${item.type}-${item.uid}`}>
              <Card item={item} type={item.type} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
