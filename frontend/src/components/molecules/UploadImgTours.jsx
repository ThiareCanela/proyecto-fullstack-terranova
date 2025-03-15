import { useState } from "react";

export const UploadImgTours = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).slice(0, 3);
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImages(imageUrls);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Subir Imágenes</h2>

      <div className="border-2 border-dashed p-2 rounded-lg md:max-h-none max-h-[200px] overflow-auto">
        <div className="flex flex-wrap gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Imagen ${index + 1}`}
              className="w-1/3 h-24 object-cover rounded"
            />
          ))}
        </div>

        {images.length < 3 && (
          <label className="block border-2 border-dashed p-4 text-center cursor-pointer rounded mt-2">
            <span className="text-gray-500">+ Subir foto</span>
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
              multiple
            />
          </label>
        )}
      </div>
    </div>
  );
};
