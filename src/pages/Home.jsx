import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";

export const Home = () => {
  const { dispatch } = useGlobalReducer();
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);


  useEffect(() => {
    fetchData("people", setPeople);
    fetchData("vehicles", setVehicles);
    fetchData("planets", setPlanets);
  }, []);

  const fetchData = async (type, setFunc) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}`);
      const data = await res.json();
      setFunc(data.results);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Characters</h2>
      <div className="row">
        {people.map((p) => (
          <div className="col-md-4 mb-3" key={p.uid}>
            <Card item={p} type="people" dispatch={dispatch} />
          </div>
        ))}
      </div>

      <h2 className="mt-5">Vehicles</h2>
      <div className="row">
        {vehicles.map((v) => (
          <div className="col-md-4 mb-3" key={v.uid}>
            <Card item={v} type="vehicles" dispatch={dispatch} />
          </div>
        ))}
      </div>

      <h2 className="mt-5">Planets</h2>
      <div className="row">
        {planets.map((pl) => (
          <div className="col-md-4 mb-3" key={pl.uid}>
            <Card item={pl} type="planets" dispatch={dispatch} />
          </div>
        ))}
      </div>
    </div>
  );
};
