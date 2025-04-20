import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPanel from './pages/UserPanel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PurchasePage from './pages/PurchasePage';
import AdDetailsPage from './pages/AdDetailsPage';



function App() {
  return (
    <div>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/panel" element={<UserPanel />} />
          <Route path="/purchase/:id" element={<PurchasePage />} />
          <Route path="/ad/:id" element={<AdDetailsPage />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
