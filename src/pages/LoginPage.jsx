import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    try {
      // Symulacja udanego logowania
      const fakeToken = 'fake-jwt-token-123';
      localStorage.setItem('token', fakeToken);
      alert('Zalogowano! (symulacja)');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Błędny email lub hasło.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-black">🔐 Logowanie</h2>
        
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

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
          Zaloguj się
        </button>

        {/* Informacja o braku konta i odnośnik do rejestracji */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Nie masz konta?{' '}
          <Link to="/register" className="text-orange-500 hover:text-orange-600">
            Zarejestruj się
          </Link>
        </p>
      </form>
    </div>
  );
}
