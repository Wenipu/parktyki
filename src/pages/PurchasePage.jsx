import { useState } from "react";

export default function PurchasePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    blikCode: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // przechodzimy do kodu BLIK
    } else if (step === 2 && formData.blikCode.length === 6) {
      setStep(3); // zakup zakończony
    } else {
      alert("Wprowadź poprawny 6-cyfrowy kod BLIK");
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Dane do wysyłki</h2>
          <input type="text" name="firstName" placeholder="Imię" value={formData.firstName} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="lastName" placeholder="Nazwisko" value={formData.lastName} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="address" placeholder="Ulica i numer" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="postalCode" placeholder="Kod pocztowy" value={formData.postalCode} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="city" placeholder="Miasto" value={formData.city} onChange={handleChange} required className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Dalej</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Płatność BLIK</h2>
          <input type="text" name="blikCode" placeholder="Wpisz 6-cyfrowy kod BLIK" value={formData.blikCode} onChange={handleChange} maxLength="6" required className="w-full p-2 border rounded" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Zakończ zakup</button>
        </form>
      )}

      {step === 3 && (
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold text-green-600">Zakup zakończony sukcesem!</h2>
          <p className="mt-4">Dziękujemy za zakupy. Twoje zamówienie jest w realizacji.</p>
        </div>
      )}
    </div>
  );
}
