// import { Routes, Route } from 'react-router';
// import Home from './Home';
// import About from './About';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//     </Routes>
//   );
// }

// export default App;
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/organisms/NavBar";
import Footer from "./components/organisms/Footer";
import Home from "./components/pages/Home";
import DetailCard from "./components/pages/DetailCard";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle" element={<DetailCard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
