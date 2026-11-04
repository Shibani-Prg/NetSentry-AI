export default function AuthInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        autoComplete={name === "email" ? "username" : "off"}
        className="w-full rounded-lg border border-slate-700 bg-[#111827] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
      />
    </div>
  );
}