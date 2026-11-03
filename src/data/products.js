
const THUMB_COUNT = 5;

const base = [
  { name: 'Tênis K-Swiss V8 - Masculino', brand: 'K-Swiss', category: 'Esporte e lazer', gender: 'Masculino', state: 'Novo', price: 200, priceDiscount: 149.9 },
  { name: 'Tênis Nike Revolution 6 Next Nature Masculino', brand: 'Nike', category: 'Corrida', gender: 'Masculino', state: 'Novo', price: 219, priceDiscount: 189.9 },
  { name: 'Camiseta Adidas Essentials', brand: 'Adidas', category: 'Casual', gender: 'Unissex', state: 'Novo', price: 89.9 },
  { name: 'Calça Puma Training', brand: 'Puma', category: 'Esporte e lazer', gender: 'Feminino', state: 'Novo', price: 159.9, priceDiscount: 129.9 },
  { name: 'Boné Nike Heritage', brand: 'Nike', category: 'Casual', gender: 'Unissex', state: 'Usado', price: 79.9 },
  { name: 'Tênis Calenciaga Runner', brand: 'Calenciaga', category: 'Casual', gender: 'Feminino', state: 'Novo', price: 899, priceDiscount: 799 },
  { name: 'Headphone Puma Sound', brand: 'Puma', category: 'Utilitário', gender: 'Unissex', state: 'Novo', price: 249.9 },
  { name: 'Tênis Adidas Court', brand: 'Adidas', category: 'Corrida', gender: 'Feminino', state: 'Usado', price: 299.9, priceDiscount: 229.9 },
];

export const products = base.map((product, index) => ({
  id: index + 1,
  reference: `REF:3841${6711 + index}`,
  image: `/product-thumb-${(index % THUMB_COUNT) + 1}.jpeg`,
  ...product,
}));
