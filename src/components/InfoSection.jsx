const InfoSection = ({ title, rows }) => (
  <div>
    <h3 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 700, color: 'var(--dark-gray-2)' }}>{title}</h3>
    <div className="flex flex-column" style={{ gap: '12px' }}>
      {rows.map(([label, value]) => (
        <p key={label} style={{ margin: 0, fontSize: '13px', overflowWrap: 'anywhere' }}>
          <span style={{ marginRight: '8px', color: 'var(--light-gray)' }}>{label}</span>
          <span style={{ fontWeight: 600, color: 'var(--dark-gray)' }}>{value || '-'}</span>
        </p>
      ))}
    </div>
  </div>
);

export default InfoSection;
