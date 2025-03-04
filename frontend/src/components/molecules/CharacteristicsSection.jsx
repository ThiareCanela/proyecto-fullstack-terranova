/* eslint-disable react/prop-types */
export const CharacteristicsSection = ({ characteristics }) => (
  <div className="w-full flex flex-col gap-1">
    <h4 className="font-semibold w-full">¿Qué encontrarás?</h4>
    <p className="text-gray-400 text-sm w-full text-justify">Características</p>
    <div className="w-full grid grid-cols-3 gap-6 mt-4">
      {characteristics.map((item, index) => (
        <div key={index} className="flex gap-2">
          <img src={item.icon} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  </div>
);
