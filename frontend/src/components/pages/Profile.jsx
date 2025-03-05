import { useNavigate } from "react-router-dom";
import { ProfileContainer } from "../organisms/ProfileContainer";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
          <ArrowLeft /> Volver atrás{" "}
        </button>
      </header>
      <div className="w-full flex justify-center items-center ">
        <ProfileContainer user={user} />
      </div>
    </div>
  );
}
