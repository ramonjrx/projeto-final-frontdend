import { Navigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import InfoSection from '../components/InfoSection';
import OrderSummary from '../components/OrderSummary';
import Page from '../components/Page';
import Thumb from '../components/Thumb';
import { useStore } from '../context/StoreContext';

const divider = { paddingTop: '24px', borderTop: '1px solid var(--light-gray-2)' };

const SuccessPage = () => {
  const { orders, lastOrderId } = useStore();
  const order = orders.find((entry) => entry.id === lastOrderId);

  if (!order) return <Navigate to="/" replace />;

  const { customer, delivery, payment, items, totals } = order;
  const paymentRows =
    payment.method === 'Cartão de Crédito'
      ? [
          ['Titular do Cartão:', payment.holder],
          ['Final:', `*********${payment.last4}`],
        ]
      : [['Forma de pagamento:', payment.method]];

  return (
    <Page>
      <Card style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div className="text-center" style={{ paddingBottom: '24px' }}>
          <div aria-hidden="true" style={{ fontSize: '44px', lineHeight: 1 }}>
            🎉
          </div>
          <h1 style={{ margin: '12px 0 0', fontSize: '24px', lineHeight: 1.3, fontWeight: 700, color: 'var(--dark-gray)' }}>
            Compra Realizada com sucesso!
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--light-gray)' }}>Pedido nº {order.id}</p>
        </div>

        <div className="flex flex-column" style={{ gap: '24px' }}>
          <div style={divider}>
            <InfoSection
              title="Informações Pessoais"
              rows={[
                ['Nome:', customer.name],
                ['CPF:', customer.cpf],
                ['Email', customer.email],
                ['Celular', customer.phone],
              ]}
            />
          </div>

          <div style={divider}>
            <InfoSection
              title="Informações de Entrega"
              rows={[
                ['Endereço:', delivery.address],
                ['Bairro:', delivery.neighborhood],
                ['Cidade:', delivery.city],
                ['CEP:', delivery.cep],
              ]}
            />
          </div>

          <div style={divider}>
            <InfoSection title="Informações de Pagamento" rows={paymentRows} />
          </div>

          <div style={divider}>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: 'var(--dark-gray-2)' }}>
              Resumo da compra
            </h3>
            <div className="flex flex-column" style={{ gap: '16px', marginBottom: '24px' }}>
              {items.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex" style={{ gap: '16px' }}>
                  <Thumb src={item.image} alt={item.name} />
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, lineHeight: 1.3, color: 'var(--dark-gray)' }}>
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
            <OrderSummary totals={totals} boxed />
          </div>
        </div>

        <div className="text-center" style={{ margin: '24px 0' }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{ padding: 0, border: 0, background: 'transparent', fontSize: '16px', color: 'var(--dark-gray-2)', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Imprimir Recibo
          </button>
        </div>

        <Button to="/" height={44}>
          Voltar para Home
        </Button>
      </Card>
    </Page>
  );
};

export default SuccessPage;
