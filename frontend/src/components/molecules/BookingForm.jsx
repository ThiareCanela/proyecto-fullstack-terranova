import { useState } from "react";
import { Counter } from "../atoms/Counter";
import { InputField } from "../atoms/InputField";

export const BookingForm = () => {
  const [counter, setCounter] = useState(1);

  return (
    <div className="flex flex-col w-full p-6 gap-6 bg-white rounded-lg shadow-md">
      <h3 className="font-medium text-default text-3xl text-center w-full">
        ¿Cuál es tu proxima aventura?
      </h3>
      <form className="w-full flex flex-col gap-6">
        <div className="flex w-full justify-between gap-6">
          <InputField
            label="Donde"
            type="text"
            placeholder="Encuentra tu aventura"
            className="w-[50%]"
          />
          <InputField
            label="Cuando"
            type="date"
            placeholder="dd/mm/yyy"
            className="w-[50%]"
          />
        </div>
        <Counter
          label="Personas"
          counter={counter}
          disabledDecrement={counter === 1}
          increment={() => setCounter((prev) => prev + 1)}
          decrement={() => setCounter((prev) => Math.max(1, prev - 1))}
        />
        <button className="w-full rounded-2xl bg-default text-primary font-normal text-center h-[40px]">
          Buscar
        </button>
      </form>
    </div>
  );
};
