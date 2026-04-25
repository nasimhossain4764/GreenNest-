import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Explore Our Plants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants.map((plant) => (
          <div key={plant.plantId} className="card bg-base-100 shadow-xl group hover:shadow-2xl transition-shadow">
            <figure className="h-64 overflow-hidden relative">
              <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-primary shadow">
                ${plant.price}
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{plant.plantName}</h2>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Category: {plant.category}</span>
                <span className="flex items-center gap-1 text-orange-500">
                  ★ {plant.rating}
                </span>
              </div>
              <p className="line-clamp-2 text-gray-600">{plant.description}</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/plant/${plant.plantId}`} className="btn btn-primary w-full">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plants;
