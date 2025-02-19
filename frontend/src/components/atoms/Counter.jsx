import clsx from "clsx";
import MinusCircle from "./icons/MinusCircle";
import PlusCircle from "./icons/PlusCircle";

/* eslint-disable react/prop-types */
export const Counter = ({
  label,
  counter,
  decrement,
  increment,
  disabledDecrement,
}) => {
  return (
    <div className="flex gap-6 w-full">
      {label && <label>{label}</label>}
      <div className="flex gap-6 w-full items-center">
        <button
          onClick={decrement}
          disabled={disabledDecrement}
          className={clsx(disabledDecrement && "opacity-50")}
        >
          <MinusCircle />
        </button>
        <span className="text-default text-xs font-normal">{counter}</span>
        <button onClick={increment}>
          <PlusCircle />
        </button>
      </div>
    </div>
  );
};
