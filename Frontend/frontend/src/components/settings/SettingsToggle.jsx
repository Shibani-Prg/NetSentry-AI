function SettingsToggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-3">
      <span className="min-w-0">
        <span className="theme-text block text-sm">{label}</span>
        <span className="theme-text-secondary mt-1 block text-xs leading-5">
          {description}
        </span>
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 shrink-0 cursor-pointer accent-teal-500"
      />
    </label>
  );
}

export default SettingsToggle;