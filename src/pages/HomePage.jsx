import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [filters, setFilters] = useState({
    city: "",
    keyword: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    condition: "",
    negotiable: false,
    sort: "",
    brand: "",
    color: "",
    delivery: "",
  });

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteAds")) || []
  );

  const staticAds = [
    { id: 1, title: "Rower górski", price: 1200, city: "Warszawa", image: "/photo/rower.png", category: "Sport", condition: "używane", negotiable: true },
    { id: 2, title: "Telefon Samsung", price: 800, city: "Kraków", image: "/photo/phone.jpeg", category: "Elektronika", condition: "nowe", negotiable: false },
    { id: 3, title: "Konsola PS5", price: 2200, city: "Warszawa", image: "/photo/konsola.jpg", category: "Elektronika", condition: "nowe", negotiable: false },
    { id: 4, title: "Laptop Dell", price: 1500, city: "Wrocław", image: "/photo/laptop.png", category: "Elektronika", condition: "używane", negotiable: true },
    { id: 5, title: "Stolik kawowy", price: 300, city: "Łódź", image: "/photo/laptop.png", category: "Dom", condition: "używane", negotiable: false },
    { id: 6, title: "Słuchawki JBL", price: 200, city: "Gdańsk", image: "/photo/laptop.png", category: "Elektronika", condition: "nowe", negotiable: true },
    { id: 7, title: "Monitor LG", price: 900, city: "Kraków", image: "/photo/laptop.png", category: "Elektronika", condition: "nowe", negotiable: false },
  ];

  const userAds = (JSON.parse(localStorage.getItem("myAds")) || []).map((ad, index) => ({
    ...ad,
    id: ad.id || `user-${index}`,
  }));

  const ads = [...staticAds, ...userAds];

  const filteredAds = ads
    .filter((ad) => {
      const {
        city,
        keyword,
        minPrice,
        maxPrice,
        category,
        condition,
        negotiable,
        brand,
        color,
        delivery,
      } = filters;

      return (
        (city === "" || ad.city?.toLowerCase().includes(city.toLowerCase())) &&
        (keyword === "" || ad.title?.toLowerCase().includes(keyword.toLowerCase())) &&
        (minPrice === "" || ad.price >= parseFloat(minPrice)) &&
        (maxPrice === "" || ad.price <= parseFloat(maxPrice)) &&
        (category === "" || ad.category === category) &&
        (condition === "" || ad.condition === condition) &&
        (!negotiable || ad.negotiable === true) &&
        (brand === "" || ad.brand?.toLowerCase().includes(brand.toLowerCase())) &&
        (color === "" || ad.color?.toLowerCase().includes(color.toLowerCase())) &&
        (delivery === "" || ad.delivery?.toLowerCase().includes(delivery.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (filters.sort === "price-asc") return a.price - b.price;
      if (filters.sort === "price-desc") return b.price - a.price;
      return 0;
    });

  const toggleFavorite = (adId, e) => {
    e.preventDefault();
    const updated = favorites.includes(adId)
      ? favorites.filter((id) => id !== adId)
      : [...favorites, adId];
    setFavorites(updated);
    localStorage.setItem("favoriteAds", JSON.stringify(updated));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-black mb-10 tracking-tight">
          <span className="text-orange-500">Ogłoszenia</span>
        </h1>

        {/* FILTRY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <input
              name="keyword"
              value={filters.keyword}
              onChange={handleChange}
              placeholder="Szukaj frazy"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              name="city"
              value={filters.city}
              onChange={handleChange}
              placeholder="Miasto"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Cena od"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Cena do"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Kategoria</option>
              <option value="Elektronika">Elektronika</option>
              <option value="Sport">Sport</option>
              <option value="Dom">Dom</option>
            </select>
          </div>
          <div>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Stan</option>
              <option value="nowe">Nowe</option>
              <option value="używane">Używane</option>
              <option value="uszkodzone">Uszkodzone</option>
            </select>
          </div>
          <div>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Sortuj</option>
              <option value="price-asc">Cena rosnąco</option>
              <option value="price-desc">Cena malejąco</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="negotiable"
              checked={filters.negotiable}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Cena do negocjacji</span>
          </div>

          {/* Additional filters */}
          <div>
            <input
              name="brand"
              value={filters.brand}
              onChange={handleChange}
              placeholder="Marka"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              name="color"
              value={filters.color}
              onChange={handleChange}
              placeholder="Kolor"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <select
              name="delivery"
              value={filters.delivery}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Dostawa</option>
              <option value="kurier">Kurier</option>
              <option value="odbiór osobisty">Odbiór osobisty</option>
            </select>
          </div>
        </div>

        {/* OGŁOSZENIA */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAds.map((ad) => (
            <Link
              key={ad.id}
              to={`/ad/${ad.id}`}
              className="bg-white relative rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl border border-gray-200"
            >
              <img src={ad.image} alt={ad.title} className="w-full h-52 object-cover" />

              <button onClick={(e) => toggleFavorite(ad.id, e)} className="absolute top-2 right-2 text-2xl">
                {favorites.includes(ad.id) ? "❤️" : "🤍"}
              </button>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-black">{ad.title}</h2>
                <p className="text-gray-500 text-sm mt-1">📍 {ad.city}</p>
                <p className="text-orange-600 text-lg font-bold mt-2">{ad.price} zł</p>
                <div className="mt-4 bg-black text-white text-center py-2 rounded-full font-medium">
                  Zobacz ogłoszenie
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
