import { formatPrice } from '../utils/formatPrice';


const BuyBox = ({ name, reference, stars, rating, price, priceDiscount, description, children }) => (
  <div className="flex flex-column" style={{ gap: '16px' }}>
    <h1
      style={{
        margin: 0,
        fontSize: 'clamp(24px, 3vw, 32px)',
        lineHeight: 1.2,
        fontWeight: 700,
        color: 'var(--dark-gray)',
      }}
    >
      {name}
    </h1>

    {reference && <span style={{ fontSize: '12px', color: 'var(--dark-gray-3)' }}>{reference}</span>}

    {(stars || rating) && (
      <div className="flex align-items-center" style={{ gap: '12px' }}>
        {stars && (
          <span
            className="flex align-items-center"
            style={{
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: 'var(--warning)',
              color: 'var(--white)',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            {stars}
            <i className="pi pi-star-fill" style={{ fontSize: '12px' }} />
          </span>
        )}
        {rating && <span style={{ fontSize: '14px', color: 'var(--light-gray)' }}>({rating} avaliações)</span>}
      </div>
    )}

    <div className="flex align-items-baseline" style={{ gap: '12px' }}>
      {priceDiscount ? (
        <>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--dark-gray-2)' }}>
            {formatPrice(priceDiscount)}
          </span>
          <span style={{ fontSize: '16px', color: 'var(--light-gray-2)', textDecoration: 'line-through' }}>
            {formatPrice(price)}
          </span>
        </>
      ) : (
        <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--dark-gray-2)' }}>{formatPrice(price)}</span>
      )}
    </div>

    {description && (
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 700, color: 'var(--light-gray)' }}>
          Descrição do produto
        </p>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--dark-gray-2)' }}>{description}</p>
      </div>
    )}

    {children}

    <button
      type="button"
      style={{
        height: '48px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: 'var(--warning)',
        color: 'var(--white)',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      COMPRAR
    </button>
  </div>
);

export default BuyBox;
