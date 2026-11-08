import { useEffect, useState } from 'react';
import { StoreContext } from './StoreContext';
import { DEMO_USER, SEED_ORDERS } from '../data/mock';
import { onlyDigits } from '../utils/masks';

const COUPONS = { DIGITAL10: 10 };
const FREE_SHIPPING_FROM = 200;
const SHIPPING_FEE = 19.9;
const MAX_QUANTITY = 10;

const round = (value) => Math.round(value * 100) / 100;

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const useStored = (key, fallback) => {
  const [value, setValue] = useState(() => read(key, fallback));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }, [key, value]);

  return [value, setValue];
};

const pickProfile = (data) => ({
  name: data.name,
  cpf: data.cpf,
  email: data.email.trim(),
  phone: data.phone,
  address: data.address,
  neighborhood: data.neighborhood,
  city: data.city,
  cep: data.cep,
  complement: data.complement ?? '',
});

const computeTotals = (cart, coupon, shippingCep) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const effective = cart.reduce((sum, item) => sum + (item.priceDiscount ?? item.price) * item.quantity, 0);
  const couponDiscount = coupon ? (effective * coupon.percent) / 100 : 0;
  const discount = subtotal - effective + couponDiscount;
  const freight = shippingCep ? (effective >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE) : 0;
  return {
    subtotal: round(subtotal),
    discount: round(discount),
    freight: round(freight),
    total: round(subtotal - discount + freight),
  };
};

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useStored('ds:cart', []);
  const [user, setUser] = useStored('ds:user', null);
  const [users, setUsers] = useStored('ds:users', [DEMO_USER]);
  const [orders, setOrders] = useStored('ds:orders', SEED_ORDERS);
  const [coupon, setCoupon] = useStored('ds:coupon', null);
  const [shippingCep, setShippingCep] = useStored('ds:cep', '');
  const [lastOrderId, setLastOrderId] = useState(null);

  const totals = computeTotals(cart, coupon, shippingCep);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item) =>
    setCart((prev) => {
      const key = `${item.productId}-${item.size}-${item.color}`;
      if (prev.some((entry) => entry.key === key)) {
        return prev.map((entry) =>
          entry.key === key ? { ...entry, quantity: Math.min(entry.quantity + 1, MAX_QUANTITY) } : entry,
        );
      }
      return [...prev, { ...item, key, quantity: 1 }];
    });

  const updateQuantity = (key, quantity) =>
    setCart((prev) =>
      prev.map((entry) =>
        entry.key === key ? { ...entry, quantity: Math.max(1, Math.min(quantity, MAX_QUANTITY)) } : entry,
      ),
    );

  const removeItem = (key) => setCart((prev) => prev.filter((entry) => entry.key !== key));

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    setShippingCep('');
  };

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { ok: false, message: 'Digite um código de cupom.' };
    if (!COUPONS[normalized]) return { ok: false, message: 'Cupom inválido.' };
    setCoupon({ code: normalized, percent: COUPONS[normalized] });
    return { ok: true, message: `Cupom ${normalized} aplicado: ${COUPONS[normalized]}% de desconto.` };
  };

  const calculateShipping = (cep) => {
    const digits = onlyDigits(cep);
    if (digits.length !== 8) return { ok: false, message: 'Informe um CEP válido com 8 dígitos.' };
    setShippingCep(digits);
    return { ok: true, message: `Frete grátis a partir de R$ ${FREE_SHIPPING_FROM},00. Valor atualizado no resumo.` };
  };

  const emailTaken = (email) => users.some((entry) => entry.email.toLowerCase() === email.trim().toLowerCase());

  const register = (data) => {
    if (emailTaken(data.email)) return { error: 'Este e-mail já está cadastrado.' };
    const profile = pickProfile(data);
    setUsers((prev) => [...prev, profile]);
    setUser(profile);
    return { error: null };
  };

  const login = (identifier, password) => {
    const email = identifier.trim().toLowerCase();
    const cpf = onlyDigits(identifier);
    const found = users.find(
      (entry) => entry.email.toLowerCase() === email || (cpf.length === 11 && onlyDigits(entry.cpf) === cpf),
    );
    if (!found) return { error: 'Usuário não encontrado.' };
    if (!password) return { error: 'Informe sua senha.' };
    setUser(found);
    return { error: null };
  };

  const logout = () => setUser(null);

  const updateUser = (data) => {
    const updated = { ...user, ...pickProfile(data) };
    setUsers((prev) => prev.map((entry) => (entry.email === user.email ? updated : entry)));
    setUser(updated);
  };

  const placeOrder = ({ customer, delivery, payment }) => {
    const id = String(Date.now()).slice(-10);
    const order = {
      id,
      status: 'Produto em trânsito',
      createdAt: new Date().toISOString(),
      items: cart.map(({ productId, name, image, price, priceDiscount, size, colorName, quantity }) => ({
        productId,
        name,
        image,
        price,
        priceDiscount,
        size,
        colorName,
        quantity,
      })),
      totals,
      customer,
      delivery,
      payment,
    };
    setOrders((prev) => [order, ...prev]);
    setLastOrderId(id);
    clearCart();
    return order;
  };

  const value = {
    cart,
    cartCount,
    totals,
    coupon,
    shippingCep,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    calculateShipping,
    user,
    emailTaken,
    register,
    login,
    logout,
    updateUser,
    orders,
    lastOrderId,
    placeOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
