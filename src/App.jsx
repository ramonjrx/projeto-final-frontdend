// Importações de estilo
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage';
import Layout from './pages/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos" element={<ProductListingPage />} />
        <Route path="/produto/:id" element={<ProductViewPage />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;