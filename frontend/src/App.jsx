import { Route, Routes } from "react-router-dom";
import Navbar from "./components/organisms/NavBar";
import Footer from "./components/organisms/Footer";
import Home from "./components/pages/Home";
import DetailCard from "./components/pages/DetailCard";
import Profile from "./components/pages/Profile";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle" element={<DetailCard />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
