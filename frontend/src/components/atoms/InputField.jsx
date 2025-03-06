import clsx from "clsx";
/* eslint-disable react/prop-types */
export const InputField = ({
  label,
  className,
  type,
  autoComplete,
  ...props
}) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label className="text-default text-xs font-normal">{label}</label>
      <input
        {...props}
        type={type}
        autoComplete={autoComplete}
        className={clsx(
          "w-full h-8 rounded-lg outline-none border-2 border-solid border-primary",
          props.className
        )}
      />
    </div>
  );
};
