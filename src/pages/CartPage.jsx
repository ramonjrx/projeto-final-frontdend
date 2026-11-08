import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import CartItem from '../components/CartItem';
import FormField from '../components/FormField';
import OrderSummary from '../components/OrderSummary';
import Page from '../components/Page';
import StickyBar from '../components/StickyBar';
import { useStore } from '../context/StoreContext';
import { maskCep } from '../utils/masks';

const AddOnForm = ({ name, label, placeholder, value, onChange, onSubmit, feedback, format, inputMode }) => (
  <Card>
    <form onSubmit={onSubmit} className="flex flex-column" style={{ gap: '12px' }}>
      <FormField
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(_, next) => onChange(next)}
        format={format}
        inputMode={inputMode}
      />
      <button
        type="submit"
        style={{
          height: '50px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: 'var(--light-gray-3)',
          color: 'var(--primary)',
          fontSize: '14px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        OK
      </button>
      {feedback && (
        <p role="status" style={{ margin: 0, fontSize: '12px', color: feedback.ok ? 'var(--success)' : 'var(--error)' }}>
          {feedback.message}
        </p>
      )}
    </form>
  </Card>
);

const CartPage = () => {
  const { cart, totals, coupon, shippingCep, applyCoupon, calculateShipping } = useStore();
  const [code, setCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [cep, setCep] = useState('');
  const [cepFeedback, setCepFeedback] = useState(null);

  if (cart.length === 0) {
    return (
      <Page>
        <Card style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ margin: '0 0 20px', fontSize: '16px', color: 'var(--dark-gray-2)' }}>Seu carrinho está vazio.</p>
          <Button variant="primary" height={48} to="/produtos">
            Ver produtos
          </Button>
        </Card>
      </Page>
    );
  }

  const couponMessage =
    couponFeedback ?? (coupon ? { ok: true, message: `Cupom ${coupon.code} aplicado: ${coupon.percent}% de desconto.` } : null);
  const cepMessage = cepFeedback ?? (shippingCep ? { ok: true, message: `CEP ${maskCep(shippingCep)} aplicado.` } : null);

  const submitCoupon = (event) => {
    event.preventDefault();
    setCouponFeedback(applyCoupon(code));
  };

  const submitCep = (event) => {
    event.preventDefault();
    setCepFeedback(calculateShipping(cep));
  };

  return (
    <Page
      bar={
        <StickyBar total={totals.total}>
          <Button to="/checkout">Continuar</Button>
        </StickyBar>
      }
    >
      <div className="flex flex-column lg:flex-row" style={{ gap: '24px', alignItems: 'flex-start' }}>
        <div className="flex flex-column w-full" style={{ gap: '16px', flex: 1, minWidth: 0 }}>
          <Card title="MEU CARRINHO">
            {cart.map((item, index) => (
              <div
                key={item.key}
                style={index > 0 ? { marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--light-gray-2)' } : undefined}
              >
                <CartItem item={item} />
              </div>
            ))}
          </Card>

          <AddOnForm
            name="coupon"
            label="Cupom de desconto"
            placeholder="Insira seu código"
            value={code}
            onChange={setCode}
            onSubmit={submitCoupon}
            feedback={couponMessage}
          />

          <AddOnForm
            name="shipping"
            label="Calcular frete"
            placeholder="Insira seu CEP"
            value={cep}
            onChange={setCep}
            onSubmit={submitCep}
            feedback={cepMessage}
            format={maskCep}
            inputMode="numeric"
          />
        </div>

        <div className="w-full lg:w-4">
          <Card title="RESUMO">
            <OrderSummary totals={totals}>
              <div className="hidden lg:block">
                <Button to="/checkout">Continuar</Button>
              </div>
            </OrderSummary>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default CartPage;
