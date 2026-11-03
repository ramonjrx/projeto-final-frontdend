import logoHeader from '../../assets/logo-header.svg';


const Logo = ({ src = logoHeader, width = 253, height = 44, alt = 'Digital Store' }) => (
  <img
    src={src}
    alt={alt}
    style={{ display: 'block', width, height, maxWidth: '100%', objectFit: 'contain' }}
  />
);

export default Logo;