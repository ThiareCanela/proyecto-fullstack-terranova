/* eslint-disable react/prop-types */
export const DescriptionDetail = ({ description, subtitle = "" }) => {
  if (description) {
    try {
      const parsedDescription = JSON.parse(description);
      console.log(parsedDescription.detalles, "detalles");
    } catch (error) {
      console.error("Error al parsear description:", error);
    }
  } else {
    console.log("description es undefined o vacío.");
  }

  return (
    <div className=" flex flex-col justify-start items-center w-full gap-2">
      <h3 className="text-gray-700 text-lg w-full text-start font-semibold">
        Descripción
      </h3>
      <h4 className="text-gray-400 text-sm w-full text-justify">{subtitle}</h4>
      <>
        {description &&
          typeof description === "string" &&
          JSON.parse(description).detalles.map((des, index) => (
            <p
              key={`${index}-detail`}
              className="text-default text-sm w-full text-justify"
            >
              {des}
            </p>
          ))}
      </>
    </div>
  );
};
