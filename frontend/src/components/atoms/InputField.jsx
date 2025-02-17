import clsx from "clsx";

/* eslint-disable react/prop-types */
export const InputField = ({ label, placeholder, type, className }) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label className="text-default text-xs font-normal">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        className="w-full h-8 rounded-lg outline-none border-2 border-solid border-primary"
      />
    </div>
  );
};
