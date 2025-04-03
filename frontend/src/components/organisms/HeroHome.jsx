import { BookingForm } from "../molecules/BookingForm";

export const HeroHome = () => {
  return (
    <div className="relative">
      <div
        className="w-full h-96 bg-cover"
        style={{
          backgroundImage: `url("https://terranova-tours-images.s3.us-east-1.amazonaws.com/bannerHome.png")`,
          backgroundPosition: "center 70%",
          height: "calc(var(--spacing) * 120)"
        }}
      />
      <section className="absolute z-10 bottom-[0px] w-full left-0 sm:left-2 md:left-4 lg:left-6 sm:max-w-[523px]">
        <BookingForm />
      </section>
    </div>
  );
};

