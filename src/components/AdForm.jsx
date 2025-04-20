import { useState } from 'react';

export default function AdForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    price: initialData.price || '',
    location: initialData.location || '',
    image: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, price, location, image } = form;
    if (!title || !description || !price || !location || !image) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    onSubmit(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-black">
          ✍️ Dodaj ogłoszenie
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <input
          name="title"
          placeholder="Tytuł"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <textarea
          name="description"
          placeholder="Opis"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          name="price"
          type="number"
          placeholder="Cena"
          value={form.price}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          name="location"
          placeholder="Miejscowość"
          value={form.location}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Zdjęcie</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-md file:bg-white file:text-sm file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-md w-full transition duration-200"
        >
          💾 Zapisz ogłoszenie
        </button>
      </form>
    </div>
  );
}
