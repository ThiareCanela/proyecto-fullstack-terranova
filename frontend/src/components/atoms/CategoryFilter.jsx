/* eslint-disable react/prop-types */
export const CategoryFilter = ({ image, categoryName, onClick, isActive, isSmaller }) => {
  const activeClass = isActive
    ? "border-2 border-[var(--color-secondary)] bg-gray-100"
    : "hover:bg-gray-200";

  const containerSize = isSmaller
    ? "w-[100px] md:w-[110px]"
    : "w-[140px] md:w-[160px]";

  const iconSize = isSmaller
    ? "w-4 h-4"
    : "w-8 h-8";

  const textSize = isSmaller
    ? "text-xs"
    : "text-sm";

  return (
    <div
      className={`flex flex-col justify-center items-center rounded-md p-4 cursor-pointer transition-all ${activeClass} ${containerSize}`}
      onClick={onClick}
    >
      <div
        className={`rounded-full overflow-hidden flex justify-center items-center ${iconSize}`}
      >
        <img
          src={image}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <p
        className={`text-center mt-2 ${textSize} ${isActive ? "font-bold" : ""}`}
      >
        {categoryName}
      </p>
    </div>
  );
};
