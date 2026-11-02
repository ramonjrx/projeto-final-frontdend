import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import cartIcon from '../../assets/mini-cart.svg';

const HEADER_HEIGHT = 66; // altura da barra superior no mobile (medida no Figma)
const CART_COUNT = 2; // estático, como no Figma. Use 0 para esconder o badge

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true }, // `end`: sem isso "/" fica ativo em todas as rotas
  { label: 'Produtos', to: '/produtos' },
  { label: 'Categorias', to: '/categorias' },
  { label: 'Meus Pedidos', to: '/meus-pedidos' },
];

// Cor diferente + linha horizontal abaixo (README 3.1.5).
// A borda é sempre 2px (transparente quando inativa) para o layout não "pular".
const navLinkStyle = ({ isActive }) => ({
  color: isActive ? 'var(--primary)' : 'var(--dark-gray-2)',
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: `2px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
  paddingBottom: '4px',
  fontSize: '16px',
  lineHeight: '24px',
});

// Cadastre-se: 16px, dark-gray-2, sublinhado na mesma cor (README 3.1.3).
// No PrimeFlex `.no-underline` é `text-decoration: none !important` e vence qualquer estilo
// inline, por isso o sublinhado não aparecia. Aqui usamos `.underline` (também !important).
const signupStyle = {
  fontSize: '16px',
  color: 'var(--dark-gray-2)',
  textDecorationColor: 'var(--dark-gray-2)',
};

const iconButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
};

// Campo de busca único, usado no desktop e no mobile.
// Por ser um <form>, o clique na lupa e o Enter disparam o mesmo onSubmit.
const SearchField = ({ value, onChange, onSubmit, maxWidth }) => (
  <form role="search" onSubmit={onSubmit} className="relative w-full" style={{ maxWidth }}>
    <input
      type="text"
      aria-label="Pesquisar produto"
      placeholder="Pesquisar produto..."
      value={value}
      onChange={onChange}
      className="w-full border-none outline-none"
      style={{
        height: '60px',
        padding: '0 56px 0 20px',
        borderRadius: '8px',
        backgroundColor: 'var(--light-gray-3)',
        color: 'var(--dark-gray-2)',
        fontSize: '16px',
      }}
    />
    <button
      type="submit"
      aria-label="Pesquisar"
      className="absolute flex align-items-center justify-content-center"
      style={{
        ...iconButtonStyle,
        top: 0,
        right: 0,
        width: '56px',
        height: '100%',
        justifyContent: 'center',
        color: 'var(--light-gray)',
      }}
    >
      <i className="pi pi-search" style={{ fontSize: '20px' }} />
    </button>
  </form>
);

// Carrinho: somente ícone, sem ação de clique (README 3.1.4). O badge segue o Figma.
const CartIcon = ({ size }) => (
  <div className="relative flex align-items-center">
    <img src={cartIcon} alt="Carrinho" style={{ width: size, height: size, display: 'block' }} />
    {CART_COUNT > 0 && (
      <span
        className="absolute flex align-items-center justify-content-center text-white font-bold"
        style={{
          top: '-5px',
          right: '-12px',
          minWidth: '17px',
          height: '17px',
          borderRadius: '50%',
          backgroundColor: 'var(--error)',
          fontSize: '10px',
        }}
      >
        {CART_COUNT}
      </span>
    )}
  </div>
);

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false); // busca mobile
  const [menuOpen, setMenuOpen] = useState(false); // drawer mobile
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();
    const filter = searchTerm.trim();
    if (!filter) return;
    navigate(`/produtos?filter=${encodeURIComponent(filter)}`);
    closeMenu();
  };

  // Drawer aberto: Esc fecha e a página de trás não rola
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="bg-white shadow-1">
      {/* ===== MOBILE (< 992px) ===== */}
      <div className="lg:hidden">
        <div
          className="relative"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: `${HEADER_HEIGHT}px`,
            padding: '0 20px',
          }}
        >
          <button
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            style={{ ...iconButtonStyle, justifySelf: 'start' }}
          >
            <i className="pi pi-bars" style={{ fontSize: '22px', color: 'var(--dark-gray)' }} />
          </button>

          {/* Logo centralizada, ~137x24 no Figma. Requer Logo com props width/height */}
          <Link to="/" aria-label="Digital Store - página inicial" onClick={closeMenu}>
            <Logo width={137} height={24} />
          </Link>

          <div className="flex align-items-center justify-content-end" style={{ gap: '20px' }}>
            <button
              type="button"
              aria-label="Pesquisar"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              style={iconButtonStyle}
            >
              <i
                className="pi pi-search"
                style={{
                  fontSize: '16px',
                  color: searchOpen ? 'var(--primary)' : 'var(--light-gray-2)',
                }}
              />
            </button>
            <CartIcon size={20} />
          </div>

          {/* Drawer: começa logo abaixo da barra; o resto da tela fica com o scrim */}
          {menuOpen && (
            <div
              style={{ position: 'fixed', top: `${HEADER_HEIGHT}px`, right: 0, bottom: 0, left: 0, zIndex: 1000 }}
            >
              <div
                aria-hidden="true"
                onClick={closeMenu}
                style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(31, 31, 31, 0.4)' }}
              />
              <aside
                id="mobile-menu"
                className="absolute top-0 left-0 flex flex-column bg-white"
                style={{ width: '308px', maxWidth: '85vw', height: '100%', padding: '32px 30px' }}
              >
                <p className="m-0 font-bold" style={{ fontSize: '16px', color: 'var(--dark-gray-2)' }}>
                  Páginas
                </p>

                <nav
                  aria-label="Páginas"
                  className="flex flex-column align-items-start"
                  style={{ gap: '8px', marginTop: '24px' }}
                >
                  {NAV_ITEMS.map(({ label, to, end }) => (
                    <NavLink key={to} to={to} end={end} onClick={closeMenu} className="no-underline" style={navLinkStyle}>
                      {label}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-auto" style={{ borderTop: '1px solid var(--light-gray-2)', paddingTop: '20px' }}>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="no-underline flex align-items-center justify-content-center w-full font-bold text-white"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--primary)',
                      fontSize: '14px',
                    }}
                  >
                    Entrar
                  </Link>
                  <div className="text-center" style={{ marginTop: '26px' }}>
                    <Link to="/cadastro" onClick={closeMenu} className="underline" style={signupStyle}>
                      Cadastre-se
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>

        {searchOpen && (
          <div style={{ padding: '0 20px 20px' }}>
            <SearchField
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onSubmit={handleSearch}
            />
          </div>
        )}
      </div>

      {/* ===== DESKTOP (>= 992px) ===== */}
      <div className="hidden lg:block px-5 py-4">
        <div className="flex align-items-center justify-content-between gap-2">
          <Link to="/" aria-label="Digital Store - página inicial" className="flex-shrink-0">
            <Logo />
          </Link>

          <SearchField
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onSubmit={handleSearch}
            maxWidth="559px"
          />

          <div className="flex align-items-center gap-5">
            <Link to="/cadastro" className="underline" style={signupStyle}>
              Cadastre-se
            </Link>

            <Link
              to="/login"
              className="no-underline flex align-items-center justify-content-center font-bold text-white"
              style={{
                width: '114px',
                height: '40px',
                borderRadius: '4px',
                backgroundColor: 'var(--primary)',
                fontSize: '14px',
              }}
            >
              Entrar
            </Link>

            <CartIcon size={24} />
          </div>
        </div>

        <nav aria-label="Navegação principal" className="flex gap-5 mt-4">
          {NAV_ITEMS.map(({ label, to, end }) => (
            <NavLink key={to} to={to} end={end} className="no-underline" style={navLinkStyle}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;