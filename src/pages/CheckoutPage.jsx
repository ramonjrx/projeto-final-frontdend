import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import FormField from '../components/FormField';
import OrderSummary from '../components/OrderSummary';
import Page from '../components/Page';
import { AddressFields, PersonalFields } from '../components/PersonFields';
import StickyBar from '../components/StickyBar';
import Thumb from '../components/Thumb';
import { useStore } from '../context/StoreContext';
import useForm from '../hooks/useForm';
import { maskCard, maskCvv, maskExpiry, onlyDigits } from '../utils/masks';
import { validateAddress, validateCard, validatePerson } from '../utils/validators';

const METHODS = [
  { value: 'card', label: 'Cartão de Crédito' },
  { value: 'boleto', label: 'Boleto Bancário' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, totals, user, placeOrder } = useStore();
  const [done, setDone] = useState(false);
  const { values, errors, setErrors, handleChange } = useForm({
    name: user?.name ?? '',
    cpf: user?.cpf ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    neighborhood: user?.neighborhood ?? '',
    city: user?.city ?? '',
    cep: user?.cep ?? '',
    complement: user?.complement ?? '',
    method: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cvv: '',
  });

  if (cart.length === 0 && !done) return <Navigate to="/carrinho" replace />;

  const isCard = values.method === 'card';
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = {
      ...validatePerson(values),
      ...validateAddress(values),
      ...(isCard ? validateCard(values) : {}),
    };
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    placeOrder({
      customer: { name: values.name, cpf: values.cpf, email: values.email, phone: values.phone },
      delivery: { address: values.address, neighborhood: values.neighborhood, city: values.city, cep: values.cep },
      payment: isCard
        ? {
            method: 'Cartão de Crédito',
            holder: values.cardName.trim().toUpperCase(),
            last4: onlyDigits(values.cardNumber).slice(-4),
          }
        : { method: 'Boleto Bancário' },
    });
    setDone(true);
    navigate('/sucesso');
  };

  const payButton = <Button type="submit">Realizar Pagamento</Button>;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Page title="Finalizar Compra" bar={<StickyBar total={totals.total}>{payButton}</StickyBar>}>
        <div className="flex flex-column lg:flex-row" style={{ gap: '24px', alignItems: 'flex-start' }}>
          <div className="flex flex-column w-full" style={{ gap: '16px', flex: 1, minWidth: 0 }}>
            <Card title="Informações Pessoais">
              <PersonalFields values={values} errors={errors} onChange={handleChange} />
            </Card>

            <Card title="Informações de Entrega">
              <AddressFields values={values} errors={errors} onChange={handleChange} />
            </Card>

            <Card title="Informações de Pagamento">
              <div className="flex flex-column" style={{ gap: '20px' }}>
                <div>
                  <p style={{ margin: '0 0 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--dark-gray-2)' }}>
                    Forma de Pagamento
                  </p>
                  <div className="flex flex-column" style={{ gap: '12px' }}>
                    {METHODS.map(({ value, label }) => (
                      <label key={value} className="flex align-items-center cursor-pointer" style={{ gap: '10px', fontSize: '14px', color: 'var(--dark-gray-2)' }}>
                        <input
                          type="radio"
                          name="method"
                          value={value}
                          checked={values.method === value}
                          onChange={() => handleChange('method', value)}
                          style={{ width: '22px', height: '22px', margin: 0, accentColor: 'var(--primary)' }}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {isCard && (
                  <>
                    <FormField name="cardName" label="Nome do Cartão" required placeholder="Insira o nome do Cartão"
                      autoComplete="cc-name" value={values.cardName} error={errors.cardName} onChange={handleChange} />
                    <FormField name="cardNumber" label="Número do Cartão" required placeholder="Insira número do Cartão"
                      inputMode="numeric" autoComplete="cc-number" format={maskCard}
                      value={values.cardNumber} error={errors.cardNumber} onChange={handleChange} />
                    <FormField name="cardExpiry" label="Data de validade do Cartão" required placeholder="MM/AA"
                      inputMode="numeric" autoComplete="cc-exp" format={maskExpiry}
                      value={values.cardExpiry} error={errors.cardExpiry} onChange={handleChange} />
                    <FormField name="cvv" label="CVV" required placeholder="CVV" inputMode="numeric"
                      autoComplete="cc-csc" format={maskCvv} value={values.cvv} error={errors.cvv} onChange={handleChange} />
                  </>
                )}
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-4">
            <Card title="RESUMO">
              <div className="flex flex-column" style={{ gap: '16px', marginBottom: '24px' }}>
                {cart.map((item) => (
                  <div key={item.key} className="flex" style={{ gap: '16px' }}>
                    <Thumb src={item.image} alt={item.name} />
                    <div>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, lineHeight: 1.3, color: 'var(--dark-gray)' }}>
                        {item.name}
                      </p>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--light-gray)' }}>
                        Qtd.: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <OrderSummary totals={totals} boxed>
                {hasErrors && (
                  <p role="alert" style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--error)' }}>
                    Corrija os campos destacados para continuar.
                  </p>
                )}
                {payButton}
              </OrderSummary>
            </Card>
          </div>
        </div>
      </Page>
    </form>
  );
};

export default CheckoutPage;
