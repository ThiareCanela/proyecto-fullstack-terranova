/* eslint-disable react/prop-types */
export const ImageGallery = ({ images = [] }) => {
  return (
    <div className="w-full max-w-full">
      {images.length > 1 ? (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap touch-pan-x [&::-webkit-scrollbar]:hidden scrollbar-none md:hidden snap-x snap-mandatory">
          {images.map((img, index) => (
            <img
              key={index + "mobile"}
              className="h-56 w-auto object-cover rounded-lg flex-shrink-0 snap-start"
              src={img.urlImagen}
              alt={`Imagen ${index + 1}`}
            />
          ))}
        </div>
      ) : (
        <img
          className="w-full object-cover h-76 rounded-lg md:hidden"
          src={images[0]?.urlImagen}
          alt="Imagen 1"
        />
      )}

      <div className="hidden md:block">
        {images.length === 1 && (
          <img
            className="w-full object-cover h-76 rounded-lg"
            src={images[0].urlImagen}
            alt="Imagen 1"
          />
        )}

        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, index) => (
              <img
                key={index + "imgCard"}
                className="w-full object-cover h-76 rounded-lg"
                src={img.urlImagen}
                alt={`Imagen ${index + 1}`}
              />
            ))}
          </div>
        )}

        {images.length >= 3 && (
          <div className="grid grid-cols-[66%_33%] gap-4">
            <img
              className="w-full object-cover h-full md:h-76 rounded-lg"
              src={images[0].urlImagen}
              alt="Imagen 1"
            />
            <div className="grid grid-rows-2 gap-4">
              {images.slice(1, 3).map((img, index) => (
                <img
                  key={index + "imagCards"}
                  className="w-full object-cover h-56 md:h-36 rounded-lg"
                  src={img.urlImagen}
                  alt={`Imagen ${index + 2}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
