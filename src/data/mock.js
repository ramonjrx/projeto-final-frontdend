import { products } from './products';

export const DEMO_USER = {
  name: 'Francisco Antonio Pereira',
  cpf: '123.485.913-35',
  email: 'francisco@gmail.com',
  phone: '(85) 5555-5555',
  address: 'Rua João Pessoa, 333',
  neighborhood: 'Centro',
  city: 'Fortaleza, Ceará',
  cep: '60150-161',
  complement: '',
};

const seed = (id, status, product) => ({
  id,
  status,
  items: [{ productId: product.id, name: product.name, image: product.image }],
});

export const SEED_ORDERS = [
  seed('2234981932', 'Produto em trânsito', products[1]),
  seed('2234981931', 'Finalizado', products[1]),
  seed('2234981930', 'Cancelado', products[0]),
  seed('2234981929', 'Finalizado', products[7]),
  seed('2234981928', 'Finalizado', products[5]),
];
