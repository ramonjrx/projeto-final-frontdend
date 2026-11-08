import Button from '../components/Button';
import Card from '../components/Card';
import Page from '../components/Page';

const NotFoundPage = () => (
  <Page>
    <Card style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: '22px', color: 'var(--dark-gray)' }}>Página não encontrada</h1>
      <p style={{ margin: '0 0 24px', fontSize: '14px', color: 'var(--dark-gray-2)' }}>
        O endereço que você acessou não existe ou foi movido.
      </p>
      <Button variant="primary" height={48} to="/">
        Voltar para Home
      </Button>
    </Card>
  </Page>
);

export default NotFoundPage;
