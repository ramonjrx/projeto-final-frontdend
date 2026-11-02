import { Link, useParams } from 'react-router-dom';
import BuyBox from '../components/BuyBox';
import Gallery from '../components/Gallery';
import ProductListing from '../components/ProductListing';
import ProductOptions from '../components/ProductOptions';
import Section from '../components/Section';
import { products } from '../data/products';

// Ajuste para a quantidade real de product-image-N.png em /public
const PRODUCT_IMAGE_COUNT = 5;
const images = Array.from({ length: PRODUCT_IMAGE_COUNT }, (_, i) => ({ src: `/product-image-${i + 1}.jpeg` }));

const SIZES = ['39', '40', '41', '42', '43'];
const COLORS = ['#6FEEFF', '#FF6969', '#5E5E5E', '#6D70B7'];

const optionLabel = { margin: '0 0 8px', fontSize: '14px', fontWeight: 700, color: 'var(--light-gray)' };

const ProductViewPage = () => {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--dark-gray-2)' }}>
        <p style={{ margin: '0 0 16px', fontSize: '18px' }}>Produto não encontrado.</p>
        <Link to="/produtos" style={{ color: 'var(--primary)' }}>
          Ver todos os produtos
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-column lg:flex-row lg:px-5" style={{ padding: '24px 20px', gap: '32px' }}>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <Gallery width="700px" height="570px" radius="4px" showThumbs images={images} />
        </div>

        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <BuyBox
            name={product.name}
            reference={`${product.category} | ${product.brand} | ${product.reference}`}
            stars={4.7}
            rating={90}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
          >
            <div>
              <p style={optionLabel}>Tamanho</p>
              <ProductOptions options={SIZES} shape="square" radius="4px" type="text" />
            </div>
            <div>
              <p style={optionLabel}>Cor</p>
              <ProductOptions options={COLORS} shape="circle" type="color" />
            </div>
          </BuyBox>
        </div>
      </div>

      <Section title="Produtos recomendados" titleAlign="left" link={{ text: 'Ver todos', href: '/produtos' }}>
        <ProductListing products={products.filter((item) => item.id !== product.id).slice(0, 4)} />
      </Section>
    </>
  );
};

export default ProductViewPage;
