import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data.slice(0, 3))); // Top 3 rated plants
  }, []);

  const careTips = [
    { title: "Watering", desc: "Check the soil before watering. Most indoor plants prefer slightly dry soil over soggy roots.", icon: "💧" },
    { title: "Sunlight", desc: "Find the right light. South-facing windows offer bright light, while north-facing ones are lower light.", icon: "☀️" },
    { title: "Fertilizing", desc: "Feed your plants during the growing season (spring and summer) using a balanced liquid fertilizer.", icon: "🌱" },
  ];

  const experts = [
    { name: "Sarah Jenkins", role: "Botanist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
    { name: "Michael Chen", role: "Landscape Architect", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { name: "Emma Watson", role: "Plant Care Specialist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  ];

  return (
    <div>
      {/* Hero Slider Section */}
      <section className="h-[60vh] md:h-[80vh] w-full">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="mySwiper h-full w-full"
        >
          <SwiperSlide>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-center px-4"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80')" }}
            >
              <div className="bg-black/40 w-full h-full absolute top-0 left-0"></div>
              <div className="relative z-10 text-white max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Breathe Life Into Your Space</h1>
                <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Discover the perfect indoor plants for a healthier, happier home.</p>
                <Link to="/plants" className="btn btn-primary btn-lg border-none">Shop Now</Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-center px-4"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545241047-6083a36a1c08?w=1600&q=80')" }}
            >
              <div className="bg-black/40 w-full h-full absolute top-0 left-0"></div>
              <div className="relative z-10 text-white max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Expert Plant Care</h1>
                <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Book a consultation with our botanists to rescue or nurture your green friends.</p>
                <Link to="/plants" className="btn btn-primary btn-lg border-none">Book Consultation</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Top Rated Plants */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Rated Plants</h2>
          <p className="text-gray-500">Our customers' absolute favorites, guaranteed to thrive.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map((plant) => (
            <div key={plant.plantId} className="card bg-base-100 shadow-xl group hover:shadow-2xl transition-shadow">
              <figure className="h-64 overflow-hidden">
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl">{plant.plantName}</h2>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{plant.category}</span>
                  <span className="text-orange-500 font-medium">★ {plant.rating}</span>
                </div>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">${plant.price}</span>
                  <Link to={`/plant/${plant.plantId}`} className="btn btn-outline btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/plants" className="btn btn-primary">View All Plants</Link>
        </div>
      </section>

      {/* Plant Care Tips Section */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Plant Care Essentials</h2>
            <p className="text-gray-500">Master the basics and watch your indoor jungle flourish.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careTips.map((tip, index) => (
              <div key={index} className="bg-base-100 p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="text-5xl mb-4">{tip.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section: Eco Decor Ideas */}
      <section className="py-20 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" 
            alt="Eco Decor" 
            className="rounded-3xl shadow-2xl"
          />
        </div>
        <div className="lg:w-1/2">
          <div className="badge badge-primary mb-4">Eco Decor Ideas</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Style Your Space With Nature</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Plants aren't just for purifying air; they are living art. Transform your living room, bedroom, or home office into a serene sanctuary. Mix and match trailing plants on high shelves with statement floor plants for a dynamic, layered look.
          </p>
          <ul className="space-y-3 mb-8 text-gray-700">
            <li className="flex items-center gap-2">✓ Use natural materials like terracotta or woven baskets.</li>
            <li className="flex items-center gap-2">✓ Group plants with similar light and water needs together.</li>
            <li className="flex items-center gap-2">✓ Play with different heights using plant stands.</li>
          </ul>
          <Link to="/plants" className="btn btn-primary btn-lg">Get Inspired</Link>
        </div>
      </section>

      {/* Meet Our Experts Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Green Experts</h2>
            <p className="text-gray-500">Book a consultation with our professionals to solve your plant mysteries.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <div key={index} className="card bg-base-100 shadow-xl overflow-hidden">
                <figure className="h-72">
                  <img src={expert.image} alt={expert.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </figure>
                <div className="card-body text-center items-center">
                  <h3 className="card-title text-2xl font-bold">{expert.name}</h3>
                  <p className="text-primary font-medium">{expert.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
