import { Link } from 'react-router-dom';

// README 4.1. `flush` (opcional) remove o respiro externo, para usar dentro de colunas.
// Obs.: classes de espaçamento do PrimeFlex são !important e vencem o inline; por isso
// `lg:px-5` (desktop) convive com o padding inline do mobile.
const Section = ({ title, titleAlign = 'left', link, flush = false, children }) => {
  const centered = titleAlign === 'center';
  const linkStyle = {
    fontSize: '18px',
    color: 'var(--primary)',
    ...(centered && { position: 'absolute', right: 0 }),
  };

  return (
    <section className={flush ? '' : 'lg:px-5'} style={{ padding: flush ? 0 : '32px 20px' }}>
      <div
        className="relative flex align-items-center"
        style={{ justifyContent: centered ? 'center' : 'space-between', marginBottom: '24px' }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(18px, 3vw, 24px)',
            lineHeight: 1.3,
            fontWeight: 700,
            textAlign: titleAlign,
            color: 'var(--dark-gray-2)',
          }}
        >
          {title}
        </h2>

        {link &&
          (/^https?:\/\//.test(link.href) ? (
            <a href={link.href} className="no-underline" style={linkStyle}>
              {link.text}
            </a>
          ) : (
            <Link to={link.href} className="no-underline" style={linkStyle}>
              {link.text}
            </Link>
          ))}
      </div>

      {children}
    </section>
  );
};

export default Section;
