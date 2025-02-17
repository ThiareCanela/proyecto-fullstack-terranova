import { ArrowLeft } from "lucide-react";
import { ScoreCalification } from "../molecules/ScoreCalification";
import { DescriptionDetail } from "../molecules/DescriptionDetail";
import { DESCRIPTIONS } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function DetailCard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-primary  ">
      <header className="flex p-6 gap-4 justify-between mt-[80px] flex-col-reverse items-start md:flex-row ">
        <h1 className="font-bold uppercase text-3xl">SUNSET BEACH - HAWAI </h1>
        <button
          className="flex items-center bg-transparent border-none justify-center gap-2 text-emphasis text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Volver atrás{" "}
        </button>
      </header>
      <main className="flex flex-col w-full p-6 md:py-8 md:px-16 gap-7">
        <div className="flex w-full overflow-hidden">
          <img
            className="w-full object-cover object-center h-80"
            src={
              "https://i.natgeofe.com/k/f576c284-661a-4046-ba51-fa95699e1a8b/hawaii-beach.png"
            }
          />
        </div>
        <ScoreCalification />
        <div className="w-full flex md:w-[50%] md:justify-start">
          <DescriptionDetail
            description={DESCRIPTIONS}
            subtitle={"Una isla que te transportara"}
          />
        </div>
      </main>
    </div>
  );
}
