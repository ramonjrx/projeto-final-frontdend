import ProductCard from './ProductCard';

// README 4.3. 2 colunas no mobile e até 292px por cartão no desktop (auto-fill).
const ProductListing = ({ products = [] }) => (
  <div
    style={{
      display: 'grid',
      gap: '24px 16px',
      gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 22vw, 292px), 1fr))',
    }}
  >
    {products.map((product) => (
      <ProductCard key={product.id ?? product.name} {...product} />
    ))}
  </div>
);

export default ProductListing;
