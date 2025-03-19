/* eslint-disable react/prop-types */
export const CharacteristicsSection = ({ characteristics }) => (
  <div className="w-full flex flex-col gap-1">
    <h4 className="font-semibold w-full">¿Qué encontrarás?</h4>
    <p className="text-gray-400 text-sm w-full text-justify">Características</p>

    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 mt-4">
      {characteristics.map((item, index) => (
        <div
          key={`${index}-charac`}
          className="flex flex-col items-center justify-center text-center"
        >
          <img src={item.icon} className="w-10 h-10" alt={item.urlIcono} />
          <p className="text-sm">{item.descripcion}</p>
        </div>
      ))}
    </div>
  </div>
);
