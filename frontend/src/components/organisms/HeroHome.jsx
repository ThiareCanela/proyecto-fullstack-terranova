import { BookingForm } from "../molecules/BookingForm";

export const HeroHome = () => {
  return (
    <div className=" relative pt-[72px]">
      <div
        className="w-full h-96 bg-cover  bg-center"
        style={{ backgroundImage: 'url("src/assets/bannerHome.png")' }}
      />
      <section className="absolute z-10 bottom-[-24px] w-full left-0 sm:left-2 md:left-4 lg:left-6  sm:max-w-[523px]">
        <BookingForm />
      </section>
    </div>
  );
};
