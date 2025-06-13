const FormInput = ({ label, placeholder, type = "text", className = "" }) => {
  return (
    <div
      className={`flex flex-col flex-1 grow shrink-0 basis-0 w-fit ${className}`}
    >
      <label className="self-start font-medium leading-none text-slate-950">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
      />
    </div>
  );
};

export default FormInput;
