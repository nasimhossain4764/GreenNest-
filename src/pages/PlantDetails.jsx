import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        const foundPlant = data.find((p) => p.plantId == id);
        setPlant(foundPlant);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    toast.success("Consultation Booked Successfully!");
    e.target.reset();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Plant Not Found</h2>
        <p className="text-gray-500">The plant you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 h-96 lg:h-auto">
          <img
            src={plant.image}
            alt={plant.plantName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="badge badge-primary">{plant.category}</span>
            <span className="badge badge-outline">Care: {plant.careLevel}</span>
            <span className="flex items-center gap-1 text-orange-500 font-medium">
              ★ {plant.rating}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {plant.plantName}
          </h1>
          <p className="text-2xl text-primary font-semibold mb-6">${plant.price}</p>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {plant.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 bg-base-200 p-4 rounded-xl">
            <div>
              <p className="text-sm text-gray-500">Provider</p>
              <p className="font-semibold">{plant.providerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Stock</p>
              <p className="font-semibold">{plant.availableStock} units</p>
            </div>
          </div>

          <div className="divider">Book Consultation</div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-lg"
              disabled={plant.availableStock === 0}
            >
              {plant.availableStock === 0 ? "Out of Stock" : "Book Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
