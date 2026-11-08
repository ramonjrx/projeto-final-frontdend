import { formatPrice } from '../utils/formatPrice';

const StickyBar = ({ total, children }) => (
  <div
    className="lg:hidden"
    style={{
      position: 'sticky',
      bottom: 0,
      zIndex: 10,
      padding: '24px 30px 30px',
      backgroundColor: 'var(--white)',
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
    }}
  >
    <div className="flex align-items-center justify-content-between">
      <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dark-gray)' }}>Total</span>
      <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--error)' }}>{formatPrice(total)}</span>
    </div>
    <p style={{ margin: '4px 0 16px', textAlign: 'right', fontSize: '12px', color: 'var(--light-gray)' }}>
      ou 10x de {formatPrice(total / 10)} sem juros
    </p>
    {children}
  </div>
);

export default StickyBar;
