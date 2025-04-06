import { CategoryFilter } from "../atoms/CategoryFilter";

/* eslint-disable react/prop-types */
export const Categories = ({ categories, onCategoryClick, activeCategory }) => {
  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
      <div className="flex gap-6 md:gap-9 justify-center min-w-max px-4">
        {/* Categoría "Todos" */}
        <CategoryFilter
          key="all-categories"
          image="https://cdn-icons-png.flaticon.com/512/61/61449.png"
          categoryName={<>Todas las<br />categorías</>}
          isActive={activeCategory === "all"}
          onClick={() => onCategoryClick("all")}
        />

        {/* Resto de categorías */}
        {categories.map((category, index) => {
          const isActive = activeCategory === category.nombre;

          return (
            <CategoryFilter
              key={`${index}-cat`}
              image={category.urlIcono}
              categoryName={category.nombre}
              isActive={isActive}
              onClick={() => onCategoryClick(category.nombre)}
            />
          );
        })}
      </div>
    </div>
  );
};
