export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center py-4 border-t border-gray-700">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold">OLX-Kopia</span> — Projekt demo
        </p>
      </footer>
    );
  }
  