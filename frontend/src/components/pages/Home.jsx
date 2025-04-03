import { useEffect, useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import { getToursApi } from "../../apis/tour";
import { Categories } from "../molecules/Categories";
import { HeroHome } from "../organisms/HeroHome";
import { TravelCardContainer } from "../organisms/TravelCardContainer";
import { useNavigate } from "react-router-dom";
import { BookingForm } from "../molecules/BookingForm";

export default function Home() {
  const { categoryData } = useCategory();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      const data = await getToursApi();
      setTours(data);
      setFilteredTours(getRandomTours(data, 9));
    };

    fetchTours();
  }, []);

  const getRandomTours = (toursArray, max) => {
    const shuffled = [...toursArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, max);
  };

  const handleCategoryClick = (categoryName) => {
    if (categoryName === activeCategory || categoryName === "all") {
      setActiveCategory("all");
      setFilteredTours(getRandomTours(tours, 9));
    } else {
      setActiveCategory(categoryName);
      const filtered = tours.filter(
        (tour) => tour.categoriaTours?.nombre === categoryName
      );
      setFilteredTours(getRandomTours(filtered, 9));
    }
  };

  // función que redirige a resultados incluyendo categoría
  const handleSearch = (formData) => {
    const queryParams = new URLSearchParams({
      pais: formData.pais,
      fechaInicio: formData.fechaInicio.toISOString().split("T")[0],
      fechaFin: formData.fechaFin.toISOString().split("T")[0],
      ...(activeCategory !== "all" && { categoria: activeCategory }),
    });

    navigate(`/resultados?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col w-full">
      <HeroHome activeCategory={activeCategory} />
      <div className="mt-16 mb-12 px-10">
        <Categories
          categories={categoryData}
          onCategoryClick={handleCategoryClick}
          activeCategory={activeCategory}
        />
      </div>
      <div className="flex-grow bg-[var(--color-primary)] flex justify-center items-center">
        <TravelCardContainer tours={filteredTours} />
      </div>
    </div>
  );
}
