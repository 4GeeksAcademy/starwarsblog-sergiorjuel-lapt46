import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Single = () => {
  const { type, uid } = useParams(); 
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const data = await res.json();
        setDetails(data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, uid]);

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (!details) return <div className="container mt-5 text-center">Item not found.</div>;

  const imageUrl = `https://placehold.co/400x600?text=${encodeURIComponent(details.properties.name)}`;

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={imageUrl}
              className="img-fluid rounded-start"
              alt={details.properties.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{details.properties.name}</h5>
              <p className="card-text text-muted">{details.description || "No description available."}</p>
              <ul className="list-group list-group-flush mt-3">
                {Object.entries(details.properties).map(([key, value]) => (
                  <li key={key} className="list-group-item">
                    <strong>{key.replaceAll("_", " ")}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
