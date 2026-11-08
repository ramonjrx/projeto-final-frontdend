import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MINIMAL_HEADER_ROUTES = ['/login', '/cadastro'];

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
      <Header minimal={MINIMAL_HEADER_ROUTES.includes(pathname)} />
      <main className="flex-1">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default Layout;
