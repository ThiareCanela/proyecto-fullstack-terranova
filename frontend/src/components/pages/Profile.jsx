import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContainer } from "../organisms/ProfileContainer";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay token disponible. Inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/usuarios/perfil", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener el perfil del usuario.");
        }

        const data = await response.json();
        console.log("✅ Datos del usuario obtenidos:", data);

        // Formateamos los datos para que coincidan con ProfileContainer
        setUserData({
          name: data.nombre,
          lastName: data.apellido,
          email: data.email,
        });
      } catch (err) {
        console.error("❌ Error al obtener perfil:", err.message);
        setError("No se pudo cargar la información del perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="w-full py-10">
      <header className="flex w-full p-6 gap-4 justify-between mt-[80px] flex-col-reverse items-start md:flex-row ">
        <h1 className="font-bold uppercase text-3xl text-gray-500">
          MI PERFIL{" "}
        </h1>
        <button
          className="flex items-center bg-transparent border-none justify-center gap-2 text-emphasis text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás
        </button>
      </header>

      <div className="w-full flex justify-center items-center ">
        {loading ? (
          <p className="text-gray-500">Cargando perfil...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ProfileContainer user={userData} />
        )}
      </div>
    </div>
  );
}
