import { useState } from "react";
import { CATEGORIES } from "../../constants";
// import { useAuth } from "../../hooks/useAuth";
import { Categories } from "../molecules/Categories";
import { HeroHome } from "../organisms/HeroHome";
import TravelCardContainer from "../organisms/TravelCardContainer";

export default function Home() {
  // const { createUser } = useAuth();

  const [mensaje, setMensaje] = useState("");
  console.log(mensaje);
  const createUser = async () => {
    const formData = {
      nombre: "Juan",
      apellido: "Perez",
      email: "juan.perez@example.com",
      password: "123456",
      password2: "123456",
    };

    try {
      const response = await fetch("http://localhost:8080/usuarios/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convertimos los datos a JSON
      });

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result);
      }

      setMensaje("✅ Usuario registrado con éxito!");
    } catch (error) {
      setMensaje("❌ Error al registrar: " + error.message);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <HeroHome />
      <div className=" mt-16 mb-12 px-10  ">
        <Categories categories={CATEGORIES} />
      </div>
      <button
        onClick={
          () => createUser()
          // () =>
          //   createUser({
          //     nombre: "Juanda",
          //     apellido: "Perales",
          //     email: "juanes@dh.com",
          //     password: "juan1+",
          //     password2: "juan1+",
          //   })
          // login("admin@dh.com", "admin")
        }
      >
        crear
      </button>
      <div className="flex-grow bg-[var(--color-primary)] flex justify-center items-center">
        <TravelCardContainer />
      </div>
    </div>
  );
}
