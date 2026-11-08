import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import InfoSection from '../components/InfoSection';
import Page from '../components/Page';
import { AddressFields, PersonalFields } from '../components/PersonFields';
import { useStore } from '../context/StoreContext';
import useForm from '../hooks/useForm';
import { validateAddress, validatePerson } from '../utils/validators';

const linkButton = {
  padding: 0,
  border: 0,
  background: 'transparent',
  fontSize: '14px',
  color: 'var(--primary)',
  textDecoration: 'underline',
  cursor: 'pointer',
};

const ProfilePage = () => {
  const { user, updateUser } = useStore();
  const [editing, setEditing] = useState(false);
  const { values, setValues, errors, setErrors, handleChange } = useForm(user);

  const startEdit = () => {
    setValues(user);
    setErrors({});
    setEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = { ...validatePerson(values), ...validateAddress(values) };
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    updateUser(values);
    setEditing(false);
  };

  const action = editing ? null : (
    <button type="button" onClick={startEdit} style={linkButton}>
      Editar
    </button>
  );

  return (
    <Page>
      <Card title="Minhas Informações" action={action} style={{ maxWidth: '520px', margin: '0 auto' }}>
        {editing ? (
          <form onSubmit={handleSubmit} noValidate className="flex flex-column" style={{ gap: '28px' }}>
            <PersonalFields values={values} errors={errors} onChange={handleChange} />
            <AddressFields values={values} errors={errors} onChange={handleChange} />
            <div className="flex flex-column" style={{ gap: '16px', alignItems: 'center' }}>
              <Button type="submit" variant="primary" height={48}>
                Salvar
              </Button>
              <button type="button" onClick={() => setEditing(false)} style={{ ...linkButton, color: 'var(--dark-gray-2)' }}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-column" style={{ gap: '24px' }}>
            <InfoSection
              title="Informações Pessoais"
              rows={[
                ['Nome:', user.name],
                ['CPF:', user.cpf],
                ['Email', user.email],
                ['Celular', user.phone],
              ]}
            />
            <div style={{ paddingTop: '24px', borderTop: '1px solid var(--light-gray-2)' }}>
              <InfoSection
                title="Informações de Entrega"
                rows={[
                  ['Endereço:', user.address],
                  ['Bairro:', user.neighborhood],
                  ['Cidade:', user.city],
                  ['CEP:', user.cep],
                  ...(user.complement ? [['Complemento:', user.complement]] : []),
                ]}
              />
            </div>
          </div>
        )}
      </Card>
    </Page>
  );
};

export default ProfilePage;
