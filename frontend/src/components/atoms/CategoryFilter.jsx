/* eslint-disable react/prop-types */
export const CategoryFilter = ({ image, categoryName }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center rounded-md hover:bg-blue-300 w-[180px] md:w-[250px] md:max-w-[250px] p-4">
      <div className="rounded-full w-6 h-6 overflow-hidden">
        <img src={image} className="w-full object-center object-cover" />
      </div>
      <p>{categoryName}</p>
    </div>
  );
};
