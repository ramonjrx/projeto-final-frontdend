const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  required = false,
  format,
  inputMode,
  autoComplete,
}) => (
  <div>
    <label
      htmlFor={name}
      style={{
        display: 'block',
        marginBottom: '10px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: 'var(--dark-gray-2)',
      }}
    >
      {label}
      {required ? ' *' : ''}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${name}-error` : undefined}
      onChange={(event) => onChange(name, format ? format(event.target.value) : event.target.value)}
      className="w-full border-none outline-none"
      style={{
        height: '50px',
        padding: '0 16px',
        borderRadius: '8px',
        backgroundColor: 'var(--light-gray-3)',
        color: 'var(--dark-gray-2)',
        fontSize: '16px',
        boxShadow: error ? 'inset 0 0 0 1px var(--error)' : 'none',
      }}
    />
    {error && (
      <p id={`${name}-error`} style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--error)' }}>
        {error}
      </p>
    )}
  </div>
);

export default FormField;
