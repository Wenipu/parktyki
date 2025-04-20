// import { useState } from 'react';
// import { register } from '../api';
// import { useNavigate } from 'react-router-dom';

// export default function RegisterPage() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = form;

//     if (!name || !email || !password) {
//       setError('Wszystkie pola są wymagane.');
//       return;
//     }

//     try {
//       await register(form);
//       alert('Rejestracja udana!');
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//       setError('Błąd podczas rejestracji. Spróbuj ponownie.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
//         <h2 className="text-3xl font-bold text-center text-black">📝 Rejestracja</h2>
        
//         {error && <p className="text-red-500 text-center text-sm">{error}</p>}

//         <input
//           name="name"
//           placeholder="Imię"
//           onChange={handleChange}
//           className="border border-gray-300 px-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//         />
//         <input
//           name="email"
//           placeholder="Email"
//           type="email"
//           onChange={handleChange}
//           className="border border-gray-300 px-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//         />
//         <input
//           name="password"
//           placeholder="Hasło"
//           type="password"
//           onChange={handleChange}
//           className="border border-gray-300 px-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
//         />
//         <button
//           type="submit"
//           className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-full w-full transition duration-200"
//         >
//           Zarejestruj się
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    try {
      // Symulacja opóźnienia
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Symulacja sukcesu
      const fakeToken = 'fake-jwt-token-abc';
      localStorage.setItem('token', fakeToken);
      alert('Zarejestrowano! (symulacja)');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Rejestracja nie powiodła się.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-black">📝 Rejestracja</h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <input
          name="name"
          placeholder="Imię"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
        <input
          name="password"
          placeholder="Hasło"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-full w-full transition duration-200"
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
