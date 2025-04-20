import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ads = [
  {
    id: 1,
    title: "Rower górski",
    price: "1200 zł",
    city: "Warszawa",
    image: "/photo/rower.png",
    description: "Świetny rower do jazdy po górach.",
    phone: "123456789",
  },
  {
    id: 2,
    title: "Telefon Samsung",
    price: "800 zł",
    city: "Kraków",
    image: "https://via.placeholder.com/800x400",
    description: "Prawie nowy telefon, bez rys.",
    phone: "987654321",
  },
  {
    id: 3,
    title: "Konsola PS5",
    price: "2200 zł",
    city: "Warszawa",
    image: "https://via.placeholder.com/800x400",
    description: "Używana 2 miesiące, z dwoma padami.",
    phone: "555333111",
  },
];

export default function AdDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = ads.find((a) => a.id === parseInt(id));
  const [showPhone, setShowPhone] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!ad) return <div className="text-center p-8">Ogłoszenie nie znalezione.</div>;

  const handleSend = () => {
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
    }
  };

  const handleBuyNow = () => {
    navigate(`/purchase/${ad.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Wróć */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline flex items-center gap-1"
        >
          ← Wróć
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={ad.image} alt={ad.title} className="w-full h-80 object-cover" />

          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{ad.title}</h1>
            <p className="text-orange-600 text-xl font-semibold">{ad.price}</p>
            <p className="text-gray-500">📍 {ad.city}</p>
            <p className="text-gray-700">{ad.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 flex-wrap">
              <button
                onClick={() => setShowPhone(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
              >
                📞 {showPhone ? ad.phone : "Pokaż numer"}
              </button>

              <button
                onClick={() => setShowMessageForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
              >
                ✉️ Napisz
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition"
              >
                🛒 Kup teraz
              </button>
            </div>

            {showMessageForm && (
              <div className="mt-6">
                <textarea
                  placeholder="Napisz wiadomość do sprzedającego..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={handleSend}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
                >
                  Wyślij
                </button>

                {submitted && (
                  <p className="text-green-600 mt-2 font-medium">
                    Wiadomość została wysłana!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
