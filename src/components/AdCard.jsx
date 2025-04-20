import { Link } from 'react-router-dom';

export default function AdCard({ ad }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      {ad.image && (
        <img
          src={`http://localhost:8000/storage/${ad.image}`}
          alt={ad.title}
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <h2 className="text-lg font-semibold">{ad.title}</h2>
      <p>{ad.description}</p>
      <p className="text-green-600 font-bold">{ad.price} zł</p>
      <p className="text-sm text-gray-500">{ad.location}</p>
      <Link
        to={`/purchase/${ad.id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Kup teraz
      </Link>
    </div>
  );
}
