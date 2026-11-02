import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

// README 4.2. `id` e `category` são opcionais: com `id` o cartão vira link para /produto/:id.
const ProductCard = ({ id, image, name, category, price, priceDiscount }) => {
  const percent = priceDiscount ? Math.round((1 - priceDiscount / price) * 100) : 0;

  const card = (
    <article>
      <div
        className="relative"
        style={{
          width: '100%',
          maxWidth: '292px',
          aspectRatio: '292 / 321',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'var(--white)',
        }}
      >
        {percent > 0 && (
          <span
            className="absolute font-bold"
            style={{
              top: '12px',
              left: '12px',
              padding: '4px 12px',
              borderRadius: '100px',
              backgroundColor: '#E7FF86',
              color: 'var(--dark-gray)',
              fontSize: '12px',
            }}
          >
            {percent}% OFF
          </span>
        )}
        <img src={image} alt={name} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ paddingTop: '12px' }}>
        {category && (
          <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'var(--light-gray)' }}>{category}</p>
        )}
        <p style={{ margin: '0 0 8px', fontSize: 'clamp(14px, 1.4vw, 18px)', color: 'var(--dark-gray-2)' }}>
          {name}
        </p>
        <div className="flex align-items-baseline" style={{ gap: '8px' }}>
          {priceDiscount ? (
            <>
              <span
                style={{
                  fontSize: 'clamp(14px, 1.5vw, 20px)',
                  color: 'var(--light-gray)',
                  textDecoration: 'line-through',
                }}
              >
                {formatPrice(price)}
              </span>
              <span style={{ fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: 'var(--dark-gray)' }}>
                {formatPrice(priceDiscount)}
              </span>
            </>
          ) : (
            <span style={{ fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 700, color: 'var(--dark-gray)' }}>
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  return id ? (
    <Link to={`/produto/${id}`} className="no-underline" style={{ display: 'block', color: 'inherit' }}>
      {card}
    </Link>
  ) : (
    card
  );
};

export default ProductCard;
