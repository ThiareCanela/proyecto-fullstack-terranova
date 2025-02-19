/* eslint-disable react/prop-types */
export const DescriptionDetail = ({ description, subtitle }) => {
  return (
    <div className=" flex flex-col justify-start items-center w-full gap-2">
      <h3 className="text-gray-700 text-lg w-full text-start font-semibold">
        Descripción
      </h3>
      <h4 className="text-gray-400 text-sm w-full text-justify">{subtitle}</h4>
      {description.map((des, index) => (
        <>
          <p key={index} className="text-default text-sm w-full text-justify">
            {des}
          </p>
        </>
      ))}
    </div>
  );
};
