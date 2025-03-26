import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/organisms/NavBar";
import Footer from "./components/organisms/Footer";
import Home from "./components/pages/Home";
import DetailCard from "./components/pages/DetailCard";
import ReservationDetail from "./components/pages/ReservationDetail"; // ✅ Importación añadida
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-primary)]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle" element={<DetailCard />} />
        <Route path="/reservation-detail" element={<ReservationDetail />} /> {/* ✅ Nueva ruta */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
