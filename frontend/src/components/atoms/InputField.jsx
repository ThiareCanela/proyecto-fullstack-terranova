import clsx from "clsx";

export const InputField = ({ label, className, ...props }) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label className="text-default text-xs font-normal">{label}</label>
      <input
        {...props}
        className={clsx(
          "w-full h-8 rounded-lg outline-none border-2 border-solid border-primary",
          props.className // Permite personalizar el input sin afectar el div
        )}
      />
    </div>
  );
};
