import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatPrice';
import Thumb from './Thumb';

const MiniCart = ({ onClose }) => {
  const { cart, totals, clearCart } = useStore();

  return (
    <>
      <div aria-hidden="true" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 999 }} />
      <section
        aria-label="Meu carrinho"
        style={{
          position: 'absolute',
          top: 'calc(100% + 14px)',
          right: 0,
          zIndex: 1000,
          width: 'min(340px, calc(100vw - 40px))',
          padding: '24px',
          borderRadius: '8px',
          backgroundColor: 'var(--white)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
        }}
      >
        <h2 style={{ margin: 0, paddingBottom: '14px', fontSize: '14px', fontWeight: 700, color: 'var(--dark-gray-2)', borderBottom: '1px solid var(--light-gray-2)' }}>
          Meu Carrinho
        </h2>

        {cart.length === 0 ? (
          <p style={{ margin: '20px 0', fontSize: '14px', color: 'var(--dark-gray-2)' }}>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="flex flex-column" style={{ gap: '16px', maxHeight: '260px', overflowY: 'auto', margin: '20px 0', padding: 0, listStyle: 'none' }}>
              {cart.map((item) => (
                <li key={item.key} className="flex" style={{ gap: '14px' }}>
                  <Thumb src={item.image} alt={item.name} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 700, lineHeight: 1.3, color: 'var(--dark-gray)' }}>
                      {item.name}
                    </p>
                    <span className="flex align-items-baseline" style={{ gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--dark-gray)' }}>
                        {formatPrice((item.priceDiscount ?? item.price) * item.quantity)}
                      </span>
                      {item.priceDiscount != null && (
                        <span style={{ fontSize: '11px', color: 'var(--light-gray)', textDecoration: 'line-through' }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      )}
                      {item.quantity > 1 && (
                        <span style={{ fontSize: '11px', color: 'var(--light-gray)' }}>x{item.quantity}</span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--light-gray-2)' }}>
              <div className="flex align-items-center justify-content-between">
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark-gray)' }}>Valor total:</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--error)' }}>{formatPrice(totals.total)}</span>
              </div>
              <div className="flex align-items-center justify-content-between" style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{ padding: 0, border: 0, background: 'transparent', fontSize: '13px', color: 'var(--dark-gray-2)', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Esvaziar
                </button>
                <Link
                  to="/carrinho"
                  onClick={onClose}
                  className="no-underline flex align-items-center justify-content-center"
                  style={{ height: '34px', padding: '0 20px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: 'var(--white)', fontSize: '13px', fontWeight: 700 }}
                >
                  Ver Carrinho
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default MiniCart;
