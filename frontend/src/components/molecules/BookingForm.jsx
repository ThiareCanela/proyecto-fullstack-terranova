import { useState } from "react";
import { InputField } from "../atoms/InputField";

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(""); // Limpiar errores cuando el usuario empieza a escribir
  };

  const validateForm = () => {
    const { location, startDate, endDate } = formData;
    if (!location || !startDate || !endDate) {
      return "Todos los campos deben estar llenos.";
    }
    if (new Date(startDate) > new Date(endDate)) {
      return "La fecha de inicio no puede ser mayor que la fecha de fin.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setErrors(errorMessage);
      return;
    }

    setLoading(true);
    
    try {
      // Simulación de una llamada a API con retraso
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Datos enviados:", formData);
      // Aquí puedes hacer la llamada real a la API y manejar la respuesta
      
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full p-6 gap-6 bg-white rounded-lg shadow-md">
      <h3 className="font-medium text-[var(--color-default)] text-3xl text-center w-full">
        ¿Cuál es tu próxima aventura?
      </h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <InputField
          label="Dónde"
          type="text"
          name="location"
          placeholder="Encuentra tu aventura"
          value={formData.location}
          onChange={handleChange}
          className="w-full"
        />
        <div className="flex w-full justify-between gap-6">
          <InputField
            label="Inicio"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-[50%]"
          />
          <InputField
            label="Fin"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-[50%]"
          />
        </div>
        {errors && <p className="text-red-600 font-medium">{errors}</p>}
        
        <button
          type="submit"
          className="w-full rounded-2xl bg-[var(--color-secondary)] text-white font-normal text-center h-[40px] disabled:opacity-50 transition-all duration-300 ease-in-out hover:bg-[var(--color-emphasis)] disabled:hover:bg-[var(--color-secondary)]"
          disabled={!!errors || loading}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Buscando...
            </div>
          ) : (
            "Buscar"
          )}
        </button>
      </form>
    </div>
  );
};
