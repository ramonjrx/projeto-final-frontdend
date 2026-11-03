import { useState } from 'react';


const ProductOptions = ({ options = [], radius = '4px', shape = 'square', type = 'text', onChange }) => {
  const [selected, setSelected] = useState(null);
  const circle = shape === 'circle';

  const handleSelect = (option) => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <div className="flex flex-wrap" style={{ gap: '12px' }}>
      {options.map((option) => {
        const active = selected === option;
        return (
          <button
            key={option}
            type="button"
            aria-label={option}
            aria-pressed={active}
            onClick={() => handleSelect(option)}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: active ? '2px solid var(--primary)' : '1px solid var(--light-gray-2)',
              ...(circle
                ? { width: '31px', height: '31px', borderRadius: '50%', padding: 0 }
                : { minWidth: '46px', height: '46px', padding: '0 12px', borderRadius: radius }),
              backgroundColor: type === 'color' ? option : 'transparent',
              color: 'var(--dark-gray-2)',
              fontSize: type === 'text' ? (circle ? '14px' : '24px') : 0,
            }}
          >
            {type === 'text' ? option : null}
          </button>
        );
      })}
    </div>
  );
};

export default ProductOptions;
