const Card = ({ title, action, children, style }) => (
  <section style={{ padding: '30px', borderRadius: '8px', backgroundColor: 'var(--white)', ...style }}>
    {title && (
      <div
        className="flex align-items-center justify-content-between"
        style={{ paddingBottom: '14px', marginBottom: '20px', borderBottom: '1px solid var(--light-gray-2)' }}
      >
        <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--dark-gray-2)' }}>{title}</h2>
        {action}
      </div>
    )}
    {children}
  </section>
);

export default Card;
