const InputField = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  required,
  error,
}) => {
  return (
    <div className="w-full lg:w-6/12">
      <div className="relative w-full mb-3">
        {label && (
          <label
            className="block uppercase text-black text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            {label}
          </label>
        )}
        <input
          required={required}
          onChange={onChange}
          value={value}
          type={type}
          className={`${
            error?.length > 0 ? "border-[1px] border-red-500" : ""
          } border-0 px-3 py-3 placeholder-slate-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
          placeholder={placeholder}
        />
        {error?.length > 0 && <div className="text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
};
export default InputField;
