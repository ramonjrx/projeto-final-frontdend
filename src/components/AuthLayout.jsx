const AuthLayout = ({ title, subtitle, children }) => (
  <div style={{ minHeight: '60vh', padding: '50px 30px 60px', background: 'linear-gradient(180deg, #B9BAF3 0%, #CDCEF7 100%)' }}>
    <div style={{ maxWidth: '420px', margin: '0 auto', padding: '30px', borderRadius: '8px', backgroundColor: 'var(--white)' }}>
      <h1 style={{ margin: 0, textAlign: 'center', fontSize: '22px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--dark-gray)' }}>
        {title}
      </h1>
      <p style={{ margin: '6px 0 26px', textAlign: 'center', fontSize: '14px', color: 'var(--dark-gray-2)' }}>{subtitle}</p>
      {children}
    </div>
  </div>
);

export default AuthLayout;
