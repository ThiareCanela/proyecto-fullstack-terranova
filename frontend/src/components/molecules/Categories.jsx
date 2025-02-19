import { CategoryFilter } from "../atoms/CategoryFilter";

/* eslint-disable react/prop-types */
export const Categories = ({ categories }) => {
  return (
    <div className="flex gap-6 md:gap-9 overflow-x-auto whitespace-nowrap touch-pan-x [&::-webkit-scrollbar]:hidden scrollbar-none">
      {categories.map((category, index) => (
        <CategoryFilter
          key={index}
          image={category.image}
          categoryName={category.name}
        />
      ))}
    </div>
  );
};
