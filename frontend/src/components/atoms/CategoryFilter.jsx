/* eslint-disable react/prop-types */
export const CategoryFilter = ({ image, categoryName, onClick, isActive }) => {
  const activeClass = isActive
    ? "border-2 border-[var(--color-secondary)] bg-gray-100"
    : "hover:bg-gray-200";

  return (
    <div
      className={`flex flex-col justify-center items-center rounded-md 
        px-2 py-1 md:px-4 md:py-4 cursor-pointer transition-all 
        ${activeClass} w-[70px] md:w-[140px]`}
      onClick={onClick}
    >
      <div className="rounded-full flex justify-center items-center bg-white w-4 h-4 md:w-8 md:h-8">
        <img
          src={image}
          alt="Ícono categoría"
          className="w-full h-full object-contain"
        />
      </div>
      <p
        className={`text-center mt-1 md:mt-2 text-[8px] md:text-sm ${
          isActive ? "" : ""
        }`}
      >
        {categoryName}
      </p>
    </div>
  );
};
