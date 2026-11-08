const Page = ({ title, align = 'left', bar, children }) => {
  const centered = align === 'center';
  return (
    <div style={{ backgroundColor: '#F9F8FE' }}>
      <div className="lg:px-5" style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 30px 40px' }}>
        {title && (
          <h1
            style={{
              margin: '0 0 20px',
              textAlign: align,
              fontSize: centered ? '22px' : '18px',
              fontWeight: 700,
              letterSpacing: centered ? '0.08em' : 'normal',
              color: 'var(--dark-gray)',
            }}
          >
            {title}
          </h1>
        )}
        {children}
      </div>
      {bar}
    </div>
  );
};

export default Page;
