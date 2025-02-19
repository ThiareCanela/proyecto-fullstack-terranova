import { CATEGORIES } from "../../constants";
import { Categories } from "../molecules/Categories";
import { HeroHome } from "../organisms/HeroHome";
import TravelCardContainer from "../organisms/TravelCardContainer";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroHome />
      <div className=" mt-16 mb-12 px-10  ">
        <Categories categories={CATEGORIES} />
      </div>

      <div className="flex-grow bg-[var(--color-primary)] flex justify-center items-center">
        <TravelCardContainer />
      </div>
    </div>
  );
}
