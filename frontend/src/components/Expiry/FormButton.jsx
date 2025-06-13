import React from "react";

const FormButton = ({
  children,
  variant = "default",
  icon,
  className = "",
  ...props
}) => {
  const baseStyles = "flex items-center justify-center text-sm font-medium";

  const variants = {
    default: "bg-white border border-solid border-slate-200 text-slate-950",
    primary: "bg-blue-600 text-slate-50",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} rounded-md py-3 ${className}`}
      {...props}
    >
      {icon && (
        <img
          src={icon}
          className="object-contain shrink-0 w-4 h-4 mr-2"
          alt=""
        />
      )}
      {children}
    </button>
  );
};

export default FormButton;
