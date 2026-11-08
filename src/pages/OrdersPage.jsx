import Card from '../components/Card';
import Page from '../components/Page';
import Thumb from '../components/Thumb';
import { useStore } from '../context/StoreContext';

const STATUS_COLORS = {
  'Produto em trânsito': 'var(--warning)',
  Finalizado: 'var(--light-gray)',
  Cancelado: 'var(--error)',
};

const OrdersPage = () => {
  const { orders } = useStore();
  const rows = orders.flatMap((order) =>
    order.items.map((item, index) => ({ key: `${order.id}-${index}`, id: order.id, status: order.status, item })),
  );

  return (
    <Page>
      <Card title="Meus Pedidos" style={{ maxWidth: '520px', margin: '0 auto' }}>
        {rows.length === 0 && (
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--dark-gray-2)' }}>Você ainda não fez nenhum pedido.</p>
        )}

        {rows.map(({ key, id, status, item }, index) => (
          <article
            key={key}
            style={{ padding: '20px 0', borderTop: index > 0 ? '1px solid var(--light-gray-2)' : 'none' }}
          >
            <div className="flex" style={{ gap: '16px' }}>
              <Thumb src={item.image} alt={item.name} />
              <div>
                <p style={{ margin: '0 0 6px', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--light-gray)' }}>
                  Pedido nº {id}
                </p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, lineHeight: 1.3, color: 'var(--dark-gray)' }}>
                  {item.name}
                </p>
              </div>
            </div>
            <div className="flex align-items-center justify-content-between" style={{ marginTop: '16px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.04em', color: 'var(--dark-gray-2)' }}>STATUS</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: STATUS_COLORS[status] ?? 'var(--dark-gray-2)' }}>
                {status}
              </span>
            </div>
          </article>
        ))}
      </Card>
    </Page>
  );
};

export default OrdersPage;
