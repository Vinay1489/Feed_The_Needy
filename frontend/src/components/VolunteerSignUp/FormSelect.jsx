const FormSelect = ({ label, placeholder, options = [], className = "" }) => {
  return (
    <div className={`flex flex-col flex-1 ${className}`}>
      <label className="self-start font-medium leading-none text-slate-950 mb-1">
        {label}
      </label>
      <select
        className="px-3.5 py-3 bg-white rounded-md border border-slate-200 text-slate-800"
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
