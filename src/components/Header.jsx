import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import MiniCart from './MiniCart';
import { useStore } from '../context/StoreContext';
import cartIcon from '../../assets/mini-cart.svg';

const HEADER_HEIGHT = 66;

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Categorias', to: '/categorias' },
  { label: 'Meus Pedidos', to: '/meus-pedidos' },
];

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? 'var(--primary)' : 'var(--dark-gray-2)',
  fontWeight: isActive ? 'bold' : 'normal',
  borderBottom: `2px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
  paddingBottom: '4px',
  fontSize: '16px',
  lineHeight: '24px',
});

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

const textButtonStyle = {
  ...iconButtonStyle,
  fontSize: '16px',
  color: 'var(--dark-gray-2)',
  textDecoration: 'underline',
};

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

const CartButton = ({ size, open, onToggle, onClose }) => {
  const { cartCount } = useStore();

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Abrir carrinho"
        aria-expanded={open}
        onClick={onToggle}
        className="relative"
        style={iconButtonStyle}
      >
        <img src={cartIcon} alt="" style={{ width: size, height: size, display: 'block' }} />
        {cartCount > 0 && (
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
            {cartCount}
          </span>
        )}
      </button>
      {open && <MiniCart onClose={onClose} />}
    </div>
  );
};

const Header = ({ minimal = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const firstName = user ? user.name.split(' ')[0] : '';
  const closeMenu = () => setMenuOpen(false);
  const closeCart = () => setCartOpen(false);
  const toggleCart = () => {
    setMenuOpen(false);
    setCartOpen((open) => !open);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filter = searchTerm.trim();
    if (!filter) return;
    navigate(`/produtos?filter=${encodeURIComponent(filter)}`);
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  useEffect(() => {
    if (!menuOpen && !cartOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, cartOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (minimal) {
    return (
      <header
        className="bg-white flex align-items-center justify-content-center"
        style={{ minHeight: `${HEADER_HEIGHT}px`, padding: '11px 0' }}
      >
        <Link to="/" aria-label="Digital Store - página inicial">
          <div className="lg:hidden">
            <Logo width={137} height={24} />
          </div>
          <div className="hidden lg:block">
            <Logo />
          </div>
        </Link>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-1">
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
            onClick={() => {
              setCartOpen(false);
              setMenuOpen((open) => !open);
            }}
            style={{ ...iconButtonStyle, justifySelf: 'start' }}
          >
            <i className="pi pi-bars" style={{ fontSize: '22px', color: 'var(--dark-gray)' }} />
          </button>

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
                style={{ fontSize: '16px', color: searchOpen ? 'var(--primary)' : 'var(--light-gray-2)' }}
              />
            </button>
            <CartButton size={20} open={cartOpen} onToggle={toggleCart} onClose={closeCart} />
          </div>

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
                style={{ width: '308px', maxWidth: '85vw', height: '100%', padding: '32px 30px', overflowY: 'auto' }}
              >
                {user && (
                  <div style={{ paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid var(--light-gray-2)' }}>
                    <p className="font-bold" style={{ margin: 0, fontSize: '16px', color: 'var(--dark-gray-2)' }}>
                      Olá {firstName}
                    </p>
                    <nav aria-label="Minha conta" className="flex flex-column" style={{ gap: '16px', marginTop: '20px' }}>
                      <Link to="/minhas-informacoes" onClick={closeMenu} className="no-underline" style={{ fontSize: '16px', color: 'var(--dark-gray-2)' }}>
                        Minhas Informações
                      </Link>
                      <Link to="/minhas-informacoes" onClick={closeMenu} className="no-underline" style={{ fontSize: '16px', color: 'var(--dark-gray-2)' }}>
                        Métodos de Pagamento
                      </Link>
                    </nav>
                  </div>
                )}

                <p className="font-bold" style={{ margin: 0, fontSize: '16px', color: 'var(--dark-gray-2)' }}>
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
                  {user ? (
                    <div className="text-center">
                      <button type="button" onClick={handleLogout} style={textButtonStyle}>
                        Sair
                      </button>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
            {user ? (
              <>
                <Link to="/minhas-informacoes" className="no-underline" style={{ fontSize: '16px', color: 'var(--dark-gray-2)' }}>
                  Olá, <strong>{firstName}</strong>
                </Link>
                <button type="button" onClick={handleLogout} style={textButtonStyle}>
                  Sair
                </button>
              </>
            ) : (
              <>
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
              </>
            )}

            <CartButton size={24} open={cartOpen} onToggle={toggleCart} onClose={closeCart} />
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
