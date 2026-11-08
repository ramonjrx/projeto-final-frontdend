import { Link } from 'react-router-dom';

const COLORS = { warning: 'var(--warning)', primary: 'var(--primary)' };

const Button = ({ children, variant = 'warning', height = 40, to, type = 'button', onClick, disabled = false }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: `${height}px`,
    border: 'none',
    borderRadius: '8px',
    backgroundColor: COLORS[variant],
    color: 'var(--white)',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  if (to) {
    return (
      <Link to={to} className="no-underline" style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};

export default Button;
