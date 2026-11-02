import logoHeader from '../../assets/logo-header.svg';

// README 3.1.1: 253x44 por padrão.
// Aceita src/width/height para outros usos: logo branca no Footer e versão menor no mobile.
const Logo = ({ src = logoHeader, width = 253, height = 44, alt = 'Digital Store' }) => (
  <img
    src={src}
    alt={alt}
    style={{ display: 'block', width, height, maxWidth: '100%', objectFit: 'contain' }}
  />
);

export default Logo;