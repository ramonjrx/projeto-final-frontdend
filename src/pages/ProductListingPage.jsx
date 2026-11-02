import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterGroup from '../components/FilterGroup';
import ProductListing from '../components/ProductListing';
import Section from '../components/Section';
import { products } from '../data/products';

const HEADER_HEIGHT = 66; // altura da barra mobile do Header (o drawer começa logo abaixo)

const FILTERS = [
  { key: 'brand', title: 'Marca', inputType: 'checkbox', options: ['Adidas', 'Calenciaga', 'K-Swiss', 'Nike', 'Puma'] },
  { key: 'category', title: 'Categoria', inputType: 'checkbox', options: ['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'] },
  { key: 'gender', title: 'Gênero', inputType: 'checkbox', options: ['Masculino', 'Feminino', 'Unissex'] },
  { key: 'state', title: 'Estado', inputType: 'radio', options: ['Novo', 'Usado'] },
];

const EMPTY_FILTERS = { brand: [], category: [], gender: [], state: [] };

const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const effectivePrice = (product) => product.priceDiscount ?? product.price;

// "Ordenar por" (README 6.1): 308x60 no desktop
const SortSelect = ({ value, onChange }) => (
  <label
    className="flex align-items-center w-full"
    style={{
      boxSizing: 'border-box',
      height: '60px',
      padding: '0 16px',
      gap: '6px',
      border: '1px solid var(--dark-gray-2)',
      borderRadius: '8px',
      backgroundColor: 'var(--white)',
      fontSize: '16px',
      color: 'var(--dark-gray-2)',
    }}
  >
    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Ordenar por:</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ flex: 1, minWidth: 0, border: 0, backgroundColor: 'transparent', fontSize: '16px', color: 'inherit' }}
    >
      <option value="">mais relevantes</option>
      <option value="asc">menor preço</option>
      <option value="desc">maior preço</option>
    </select>
  </label>
);

const FilterPanel = ({ selected, onChange, onClear, onClose }) => (
  <div style={{ padding: '24px', borderRadius: '8px', backgroundColor: 'var(--white)' }}>
    <div
      className="flex align-items-center justify-content-between"
      style={{ paddingBottom: '12px', marginBottom: '20px', borderBottom: '1px solid var(--light-gray-2)' }}
    >
      <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dark-gray-2)' }}>Filtrar por</span>
      {onClose && (
        <button
          type="button"
          aria-label="Fechar filtros"
          onClick={onClose}
          style={{ padding: 0, border: 0, background: 'transparent', color: 'var(--dark-gray-2)', cursor: 'pointer' }}
        >
          <i className="pi pi-times" style={{ fontSize: '18px' }} />
        </button>
      )}
    </div>

    <div className="flex flex-column" style={{ gap: '24px' }}>
      {FILTERS.map(({ key, title, inputType, options }) => (
        <FilterGroup
          key={key}
          title={title}
          inputType={inputType}
          options={options.map((text) => ({ text }))}
          selected={selected[key]}
          onChange={(value, checked) => onChange(key, inputType, value, checked)}
        />
      ))}

      <button
        type="button"
        onClick={onClear}
        style={{
          alignSelf: 'flex-start',
          padding: 0,
          border: 0,
          background: 'transparent',
          color: 'var(--primary)',
          fontSize: '14px',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        Limpar filtros
      </button>
    </div>
  </div>
);

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState(EMPTY_FILTERS);
  const [order, setOrder] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const query = (searchParams.get('filter') ?? '').trim();
  const term = normalize(query);

  const handleChange = (key, inputType, value, checked) =>
    setSelected((prev) => ({
      ...prev,
      [key]:
        inputType === 'radio'
          ? [value]
          : checked
            ? [...prev[key], value]
            : prev[key].filter((item) => item !== value),
    }));

  const clearFilters = () => setSelected(EMPTY_FILTERS);

  const visible = useMemo(() => {
    const list = products.filter(
      (product) =>
        (!term || [product.name, product.brand, product.category].some((field) => normalize(field).includes(term))) &&
        FILTERS.every(({ key }) => selected[key].length === 0 || selected[key].includes(product[key])),
    );
    if (!order) return list;
    return [...list].sort((a, b) =>
      order === 'asc' ? effectivePrice(a) - effectivePrice(b) : effectivePrice(b) - effectivePrice(a),
    );
  }, [term, selected, order]);

  const count = visible.length;
  const total = `${count} ${count === 1 ? 'produto' : 'produtos'}`;
  const title = query ? `Resultados para "${query}" - ${total}` : `${total} encontrados`;

  return (
    <div style={{ backgroundColor: 'var(--light-gray-3)', minHeight: '60vh' }}>
      <div className="flex flex-column lg:flex-row lg:px-5" style={{ padding: '24px 20px', gap: '24px' }}>
        {/* Desktop: coluna lateral com ordenação e filtros */}
        <aside className="hidden lg:flex flex-column" style={{ width: '308px', flexShrink: 0, gap: '16px' }}>
          <SortSelect value={order} onChange={setOrder} />
          <FilterPanel selected={selected} onChange={handleChange} onClear={clearFilters} />
        </aside>

        {/* Mobile: ordenação + botão que abre o drawer de filtros */}
        <div className="flex lg:hidden" style={{ gap: '12px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <SortSelect value={order} onChange={setOrder} />
          </div>
          <button
            type="button"
            aria-label="Filtrar"
            onClick={() => setFiltersOpen(true)}
            style={{
              width: '60px',
              height: '60px',
              flexShrink: 0,
              border: 0,
              borderRadius: '8px',
              backgroundColor: 'var(--primary)',
              color: 'var(--white)',
              cursor: 'pointer',
            }}
          >
            <i className="pi pi-filter" style={{ fontSize: '20px' }} />
          </button>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <Section flush title={title} titleAlign="left">
            {count > 0 ? (
              <ProductListing products={visible} />
            ) : (
              <p style={{ margin: 0, color: 'var(--dark-gray-2)' }}>Nenhum produto encontrado.</p>
            )}
          </Section>
        </div>
      </div>

      {filtersOpen && (
        <div
          className="lg:hidden"
          style={{ position: 'fixed', top: `${HEADER_HEIGHT}px`, right: 0, bottom: 0, left: 0, zIndex: 1000 }}
        >
          <div
            aria-hidden="true"
            onClick={() => setFiltersOpen(false)}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(31, 31, 31, 0.4)' }}
          />
          <aside
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '308px',
              maxWidth: '85vw',
              overflowY: 'auto',
              backgroundColor: 'var(--white)',
            }}
          >
            <FilterPanel
              selected={selected}
              onChange={handleChange}
              onClear={clearFilters}
              onClose={() => setFiltersOpen(false)}
            />
          </aside>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
