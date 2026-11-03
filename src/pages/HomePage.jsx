import Gallery from '../components/Gallery';
import ProductListing from '../components/ProductListing';
import Section from '../components/Section';
import { products } from '../data/products';


const slides = [1, 2, 3, 4].map((n) => ({ src: `/home-slide-${n}.jpeg` }));
const collections = [1, 2, 3].map((n) => `/collection-${n}.png`);

const HomePage = () => (
  <>
    <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <Gallery width="1440px" height="681px" images={slides} />
    </div>

    <Section title="Coleções em destaque" titleAlign="center">
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {collections.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Coleção em destaque ${index + 1}`}
            style={{ display: 'block', width: '100%', borderRadius: '4px' }}
          />
        ))}
      </div>
    </Section>

    <Section title="Produtos em alta" titleAlign="left" link={{ text: 'Ver todos', href: '/produtos' }}>
      <ProductListing products={products.slice(0, 8)} />
    </Section>
  </>
);

export default HomePage;
