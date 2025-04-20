import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("aktywne");
  const [ads, setAds] = useState(JSON.parse(localStorage.getItem("myAds")) || []);
  const [walletAmount, setWalletAmount] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [userSettings, setUserSettings] = useState({
    username: "",
    email: "",
    password: "",
    logo: "",
    banner: "",
    invoiceData: "",
  });

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    city: "",
    image: "",
    negotiable: false,
    condition: "używane",
  });

  const [editId, setEditId] = useState(null);

  const categoryFees = {
    Elektronika: 10,
    Moda: 5,
    Motoryzacja: 15,
    "Dom i Ogród": 7,
    Zwierzęta: 5,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    // Load wallet amount from localStorage if available
    const storedWalletAmount = localStorage.getItem("walletAmount");
    if (storedWalletAmount) {
      setWalletAmount(Number(storedWalletAmount));
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("myAds", JSON.stringify(ads));
  }, [ads]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleAdSubmit = (e) => {
    e.preventDefault();

    const fee = categoryFees[form.category] || 0;
    if (Number(form.price) < fee) {
      alert(`Nie masz wystarczająco pieniędzy w portfelu na wystawienie ogłoszenia w tej kategorii. Koszt to ${fee} zł.`);
      return;
    }

    if (walletAmount < fee) {
      alert(`Musisz doładować portfel o co najmniej ${fee - walletAmount} zł, aby wystawić ogłoszenie.`);
      return;
    }

    // Deduct fee from wallet after successfully posting ad
    setWalletAmount(walletAmount - fee);
    localStorage.setItem("walletAmount", walletAmount - fee);

    const newAd = { ...form, id: editId || Date.now(), status: "aktywne" };

    const updatedAds = editId
      ? ads.map((ad) => (ad.id === editId ? newAd : ad))
      : [...ads, newAd];

    setAds(updatedAds);
    setForm({
      title: "",
      category: "",
      price: "",
      city: "",
      image: "",
      negotiable: false,
      condition: "używane",
    });
    setEditId(null);
    setActiveTab("aktywne");
  };

  const handleEdit = (ad) => {
    setForm(ad);
    setEditId(ad.id);
    setActiveTab("dodaj");
  };

  const handleDelete = (id) => {
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const changeAdStatus = (id, newStatus) => {
    setAds(ads.map((ad) => (ad.id === id ? { ...ad, status: newStatus } : ad)));
  };

  const renderAds = (status) =>
    ads
      .filter((ad) => ad.status === status)
      .map((ad) => (
        <div key={ad.id} className="border p-4 mb-4 rounded-xl bg-white shadow-sm">
          <div className="flex gap-4 items-start">
            <img src={ad.image} alt={ad.title} className="h-28 w-28 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="text-xl font-semibold text-orange-600">{ad.title}</p>
              <p className="text-gray-600">{ad.category} • {ad.city}</p>
              <p className="text-gray-800 font-medium">{ad.price} zł {ad.negotiable && "(do negocjacji)"}</p>
              <p className="text-sm text-gray-400">{ad.condition}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {["aktywne", "wstrzymane", "zakonczone"].includes(ad.status) &&
                  <>
                    {ad.status !== "zakonczone" && <button onClick={() => handleEdit(ad)} className="btn blue">Edytuj</button>}
                    {ad.status === "aktywne" && <button onClick={() => changeAdStatus(ad.id, "wstrzymane")} className="btn yellow">Wstrzymaj</button>}
                    {ad.status !== "zakonczone" && <button onClick={() => changeAdStatus(ad.id, "zakonczone")} className="btn green">Zakończ</button>}
                    {ad.status !== "aktywne" && <button onClick={() => changeAdStatus(ad.id, "aktywne")} className="btn orange">Wznów</button>}
                    <button onClick={() => handleDelete(ad.id)} className="btn red">Usuń</button>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      ));

  const renderContent = () => {
    switch (activeTab) {
      case "dodaj":
        return (
          <form onSubmit={handleAdSubmit} className="space-y-4 max-w-xl">
            <input name="title" placeholder="Tytuł" value={form.title} onChange={handleFormChange} className="input" />
            <select name="category" value={form.category} onChange={handleFormChange} className="input">
              <option value="">Wybierz kategorię</option>
              <option value="Elektronika">Elektronika</option>
              <option value="Moda">Moda</option>
              <option value="Motoryzacja">Motoryzacja</option>
              <option value="Dom i Ogród">Dom i Ogród</option>
              <option value="Zwierzęta">Zwierzęta</option>
            </select>
            <input name="price" placeholder="Cena" value={form.price} onChange={handleFormChange} className="input" />
            <input name="city" placeholder="Miasto" value={form.city} onChange={handleFormChange} className="input" />
            <input name="image" placeholder="URL obrazka" value={form.image} onChange={handleFormChange} className="input" />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="negotiable" checked={form.negotiable} onChange={handleFormChange} />
              Cena do negocjacji
            </label>
            <select name="condition" value={form.condition} onChange={handleFormChange} className="input">
              <option value="używane">Używane</option>
              <option value="nowe">Nowe</option>
              <option value="uszkodzone">Uszkodzone</option>
            </select>
            <button type="submit" className="btn orange w-full text-center">
              {editId ? "Zapisz zmiany" : "Dodaj ogłoszenie"}
            </button>
          </form>
        );
      case "aktywne":
        return renderAds("aktywne");
      case "wstrzymane":
        return renderAds("wstrzymane");
      case "zakonczone":
        return renderAds("zakonczone");
      case "ulubione":
        return renderAds("ulubione");
      case "ustawienia":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ustawienia konta</h3>
            <input
              name="username"
              value={userSettings.username}
              onChange={(e) => setUserSettings({ ...userSettings, username: e.target.value })}
              className="input"
              placeholder="Nazwa użytkownika"
            />
            <input
              name="email"
              value={userSettings.email}
              onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
              className="input"
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              value={userSettings.password}
              onChange={(e) => setUserSettings({ ...userSettings, password: e.target.value })}
              className="input"
              placeholder="Nowe hasło"
            />
            <div>
              <h4 className="text-lg">Logo i baner</h4>
              <input
                name="logo"
                value={userSettings.logo}
                onChange={(e) => setUserSettings({ ...userSettings, logo: e.target.value })}
                className="input"
                placeholder="URL logo"
              />
              <input
                name="banner"
                value={userSettings.banner}
                onChange={(e) => setUserSettings({ ...userSettings, banner: e.target.value })}
                className="input"
                placeholder="URL banera"
              />
            </div>
          </div>
        );
      case "płatności":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Portfel</h3>
            <p>Stan portfela: {walletAmount} zł</p>
            <input
              type="number"
              placeholder="Kwota doładowania"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="input"
            />
            <button
              onClick={() => {
                const amount = parseFloat(topUpAmount);
                if (amount && amount > 0) {
                  setWalletAmount(walletAmount + amount);
                  localStorage.setItem("walletAmount", walletAmount + amount);
                }
              }}
              className="btn green"
            >
              Doładuj portfel
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-orange-500">Panel użytkownika</h2>
          <button onClick={handleLogout} className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
            Wyloguj się
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {["dodaj", "aktywne", "wstrzymane", "zakonczone", "ulubione", "ustawienia", "płatności"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border capitalize transition ${activeTab === tab ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-orange-100"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
