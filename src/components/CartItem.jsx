import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatPrice';
import Thumb from './Thumb';

const stepStyle = {
  width: '66px',
  height: '32px',
  border: '1px solid var(--light-gray-2)',
  borderRadius: '4px',
  backgroundColor: 'var(--white)',
  color: 'var(--dark-gray-2)',
  fontSize: '18px',
  cursor: 'pointer',
};

const PriceRow = ({ label, price, priceDiscount }) => (
  <div className="flex align-items-center justify-content-between">
    <span style={{ fontSize: '14px', letterSpacing: '0.04em', color: 'var(--dark-gray-2)' }}>{label}</span>
    <span className="flex align-items-baseline" style={{ gap: '8px' }}>
      {priceDiscount != null && (
        <span style={{ fontSize: '12px', color: 'var(--light-gray)', textDecoration: 'line-through' }}>
          {formatPrice(price)}
        </span>
      )}
      <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--dark-gray)' }}>
        {formatPrice(priceDiscount ?? price)}
      </span>
    </span>
  </div>
);

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useStore();
  const { key, productId, name, image, size, colorName, quantity, price, priceDiscount } = item;

  return (
    <article className="flex flex-column" style={{ gap: '16px' }}>
      <div className="flex" style={{ gap: '16px' }}>
        <Thumb src={image} alt={name} />
        <div className="flex flex-column" style={{ gap: '6px', minWidth: 0 }}>
          <Link
            to={`/produto/${productId}`}
            className="no-underline"
            style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.3, color: 'var(--dark-gray)' }}
          >
            {name}
          </Link>
          <span style={{ fontSize: '12px', color: 'var(--light-gray)' }}>
            Cor: <span style={{ color: 'var(--dark-gray)' }}>{colorName}</span>
          </span>
          <span style={{ fontSize: '12px', color: 'var(--light-gray)' }}>
            Tamanho: <span style={{ color: 'var(--dark-gray)' }}>{size}</span>
          </span>
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 10px', fontSize: '12px', letterSpacing: '0.04em', color: 'var(--dark-gray-2)' }}>
          QUANTIDADE
        </p>
        <div className="flex align-items-center justify-content-between">
          <button type="button" aria-label="Diminuir quantidade" style={stepStyle}
            onClick={() => updateQuantity(key, quantity - 1)}>
            −
          </button>
          <span style={{ fontSize: '14px', color: 'var(--dark-gray-2)' }} aria-live="polite">
            {quantity}
          </span>
          <button type="button" aria-label="Aumentar quantidade" style={stepStyle}
            onClick={() => updateQuantity(key, quantity + 1)}>
            +
          </button>
        </div>
        <div className="text-center" style={{ marginTop: '10px' }}>
          <button
            type="button"
            onClick={() => removeItem(key)}
            style={{
              padding: 0,
              border: 0,
              background: 'transparent',
              fontSize: '12px',
              color: 'var(--dark-gray-2)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Remover item
          </button>
        </div>
      </div>

      <PriceRow label="UNITÁRIO" price={price} priceDiscount={priceDiscount} />
      <PriceRow
        label="TOTAL"
        price={price * quantity}
        priceDiscount={priceDiscount != null ? priceDiscount * quantity : undefined}
      />
    </article>
  );
};

export default CartItem;
