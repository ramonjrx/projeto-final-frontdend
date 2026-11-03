
const FilterGroup = ({ title, inputType = 'checkbox', options = [], selected = [], onChange }) => (
  <fieldset style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
    <legend style={{ padding: 0, marginBottom: '12px', fontSize: '14px', fontWeight: 700, color: 'var(--dark-gray-2)' }}>
      {title}
    </legend>

    <div className="flex flex-column" style={{ gap: '12px' }}>
      {options.map(({ text, value }) => {
        const optionValue = value ?? text;
        return (
          <label
            key={optionValue}
            className="flex align-items-center cursor-pointer"
            style={{ gap: '10px', fontSize: '14px', color: 'var(--dark-gray-2)' }}
          >
            <input
              type={inputType}
              name={title}
              value={optionValue}
              checked={selected.includes(optionValue)}
              onChange={(event) => onChange?.(optionValue, event.target.checked)}
              style={{ width: '22px', height: '22px', margin: 0, accentColor: 'var(--primary)' }}
            />
            {text}
          </label>
        );
      })}
    </div>
  </fieldset>
);

export default FilterGroup;
