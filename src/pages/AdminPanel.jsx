import { useEffect, useState } from 'react';
import { getAds, getUsers, deleteAd, deleteUser } from '../api';

export default function AdminPanel() {
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAds = async () => {
    const res = await getAds();
    setAds(res.data);
  };

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchAds();
    fetchUsers();
  }, []);

  const handleDeleteAd = async (id) => {
    if (confirm('Na pewno usunąć to ogłoszenie?')) {
      await deleteAd(id, token);
      fetchAds();
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm('Na pewno usunąć tego użytkownika?')) {
      await deleteUser(id, token);
      fetchUsers();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-black mb-10">🎛️ Panel Administratora</h2>

      <div>
        <h3 className="text-xl font-semibold text-orange-600 mb-4">📦 Ogłoszenia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <p className="text-lg font-semibold text-black">{ad.title}</p>
              <p className="text-gray-700 mt-1">{ad.description}</p>
              <p className="text-orange-500 font-bold mt-2">{ad.price} zł</p>
              <p className="text-sm text-gray-400 mt-1">📍 {ad.location}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleDeleteAd(ad.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-full transition"
                >
                  Usuń ogłoszenie
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-semibold text-orange-600 mb-4">👥 Użytkownicy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <p className="text-lg font-semibold text-black">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-full transition"
                >
                  Usuń użytkownika
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
