import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg py-4 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-gray-200">
      {/* Logo po lewej stronie */}
      <Link to="/" className="text-3xl font-bold text-orange-500">
        OLX
      </Link>

      <div className="flex items-center space-x-8">
        {/* "Twoje Konto" z rozwijanym menu */}
        {isLoggedIn ? (
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="text-sm font-medium text-black hover:text-orange-500 transition-colors"
            >
              Twoje Konto
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border border-gray-200">
                <Link to="/panel" className="block px-4 py-2 text-black hover:bg-gray-100 rounded-t-lg">Panel użytkownika</Link>
                <button 
                  onClick={handleLogout} 
                  className="block px-4 py-2 text-red-500 hover:bg-gray-100 rounded-b-lg"
                >
                  Wyloguj
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium text-black hover:text-orange-500 transition-colors"
          >
            Zaloguj się
          </Link>
        )}
      </div>
    </nav>
  );
}
