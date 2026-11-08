import { formatPrice } from '../utils/formatPrice';

const Row = ({ label, value }) => (
  <div className="flex align-items-center justify-content-between" style={{ fontSize: '14px' }}>
    <span style={{ color: 'var(--light-gray)' }}>{label}</span>
    <span style={{ color: 'var(--dark-gray-2)' }}>{formatPrice(value)}</span>
  </div>
);

const OrderSummary = ({ totals, boxed = false, children }) => (
  <div>
    <div className="flex flex-column" style={{ gap: '14px' }}>
      <Row label="Subtotal:" value={totals.subtotal} />
      <Row label="Frete:" value={totals.freight} />
      <Row label="Desconto:" value={totals.discount} />
    </div>

    <div
      style={{
        marginTop: '20px',
        padding: boxed ? '20px' : 0,
        borderRadius: '8px',
        backgroundColor: boxed ? 'rgba(246, 170, 28, 0.08)' : 'transparent',
        border: boxed ? '1px solid rgba(246, 170, 28, 0.25)' : 'none',
      }}
    >
      <div className="flex align-items-center justify-content-between">
        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dark-gray)' }}>Total</span>
        <span style={{ fontSize: '20px', fontWeight: 700, color: boxed ? 'var(--dark-gray)' : 'var(--error)' }}>
          {formatPrice(totals.total)}
        </span>
      </div>
      <p style={{ margin: '6px 0 0', textAlign: boxed ? 'center' : 'right', fontSize: '12px', color: 'var(--light-gray)' }}>
        ou 10x de {formatPrice(totals.total / 10)} sem juros
      </p>
    </div>

    {children && <div style={{ marginTop: '20px' }}>{children}</div>}
  </div>
);

export default OrderSummary;
