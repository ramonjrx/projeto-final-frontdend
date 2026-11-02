import { useState } from 'react';

const toNumber = (value) => (value === undefined || value === null ? undefined : parseInt(value, 10));

// README 4.4. Setas com PrimeIcons (pi-angle-left/right) em vez de importar SVGs de assets.
const Gallery = ({ className = '', width, height, radius = '0', showThumbs = false, images = [] }) => {
  const [index, setIndex] = useState(0);
  const last = images.length - 1;
  const w = toNumber(width);
  const h = toNumber(height);

  const arrow = (side, disabled, onClick) => (
    <button
      type="button"
      aria-label={side === 'left' ? 'Imagem anterior' : 'Próxima imagem'}
      disabled={disabled}
      onClick={onClick}
      className="absolute flex align-items-center justify-content-center"
      style={{
        top: '50%',
        [side]: '12px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        width: '40px',
        height: '40px',
        border: 'none',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        color: 'var(--dark-gray-2)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1,
      }}
    >
      <i className={`pi pi-angle-${side}`} style={{ fontSize: '24px' }} />
    </button>
  );

  return (
    <div className={className} style={{ width: '100%', maxWidth: w ? `${w}px` : undefined }}>
      <div
        className="relative"
        style={{
          overflow: 'hidden',
          borderRadius: radius,
          aspectRatio: w && h ? `${w} / ${h}` : '16 / 9',
          backgroundColor: 'var(--light-gray-3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(-${index * 100}%)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {images.map(({ src }, position) => (
            <img
              key={src}
              src={src}
              alt={`Imagem ${position + 1} de ${images.length}`}
              style={{ flex: '0 0 100%', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ))}
        </div>

        {arrow('left', index === 0, () => setIndex((current) => current - 1))}
        {arrow('right', index === last, () => setIndex((current) => current + 1))}
      </div>

      {showThumbs && (
        <div className="flex" style={{ gap: '12px', marginTop: '16px' }}>
          {images.map(({ src }, position) => (
            <button
              key={src}
              type="button"
              aria-label={`Ver imagem ${position + 1}`}
              onClick={() => setIndex(position)}
              style={{
                flex: '1 1 0',
                maxWidth: '117px',
                aspectRatio: '117 / 95',
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: radius,
                border: `2px solid ${position === index ? 'var(--primary)' : 'transparent'}`,
                backgroundColor: 'var(--light-gray-3)',
              }}
            >
              <img src={src} alt="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
