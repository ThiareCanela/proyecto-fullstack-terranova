import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/organisms/NavBar";
import Footer from "./components/organisms/Footer";
import Home from "./components/pages/Home";
import DetailCard from "./components/pages/DetailCard";
import Profile from "./components/pages/Profile";
import AdminPanel from "./components/pages/AdminPanel";
import { useAuth } from "./context/AuthContext";
// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("AdminRoute - Usuario:", user);
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
};
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("PrivateRoute - Usuario:", user);
  return user ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Usuario en localStorage:", localStorage.getItem("loggedUser"));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle" element={<DetailCard />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute user={user}>
              <Profile user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/panel-administrador"
          element={
            <AdminRoute user={user}>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
