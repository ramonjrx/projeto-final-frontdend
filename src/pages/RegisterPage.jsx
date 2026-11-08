import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Card from '../components/Card';
import FormField from '../components/FormField';
import Page from '../components/Page';
import { AddressFields, PersonalFields } from '../components/PersonFields';
import SocialLogin from '../components/SocialLogin';
import { useStore } from '../context/StoreContext';
import useForm from '../hooks/useForm';
import { isValidEmail, validateAddress, validatePerson } from '../utils/validators';

const UNAVAILABLE = 'Este recurso ainda não está disponível nesta versão.';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { emailTaken, register } = useStore();
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState('');
  const { values, errors, setErrors, handleChange } = useForm({
    email: '',
    name: '',
    cpf: '',
    phone: '',
    address: '',
    neighborhood: '',
    city: '',
    cep: '',
    complement: '',
    newsletter: true,
  });

  const submitEmail = (event) => {
    event.preventDefault();
    if (!isValidEmail(values.email)) {
      setErrors({ email: 'E-mail inválido' });
      return;
    }
    if (emailTaken(values.email)) {
      setErrors({ email: 'Este e-mail já está cadastrado. Faça login.' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const found = { ...validatePerson(values), ...validateAddress(values) };
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const result = register(values);
    if (result.error) {
      setErrors({ email: result.error });
      return;
    }
    navigate('/', { replace: true });
  };

  if (step === 1) {
    return (
      <AuthLayout
        title="Crie sua conta"
        subtitle={
          <>
            Já possui uma conta? Entre{' '}
            <Link to="/login" className="underline" style={{ color: 'var(--dark-gray-2)' }}>
              aqui
            </Link>
            .
          </>
        }
      >
        <form onSubmit={submitEmail} noValidate className="flex flex-column" style={{ gap: '20px' }}>
          <FormField name="email" label="Email" required type="email" placeholder="Insira seu email"
            autoComplete="email" value={values.email} error={errors.email} onChange={handleChange} />
          <Button type="submit" variant="primary" height={48}>
            Criar Conta
          </Button>
        </form>

        <SocialLogin onClick={() => setFeedback(UNAVAILABLE)} />

        {feedback && (
          <p role="status" style={{ margin: '16px 0 0', textAlign: 'center', fontSize: '12px', color: 'var(--dark-gray-2)' }}>
            {feedback}
          </p>
        )}
      </AuthLayout>
    );
  }

  return (
    <form onSubmit={submitForm} noValidate>
      <Page title="Criar Conta" align="center">
        <div className="flex flex-column" style={{ maxWidth: '520px', margin: '0 auto', gap: '16px' }}>
          <Card title="Informações Pessoais">
            <PersonalFields values={values} errors={errors} onChange={handleChange} />
          </Card>

          <Card title="Informações de Entrega">
            <AddressFields values={values} errors={errors} onChange={handleChange} />
          </Card>

          <label className="flex cursor-pointer" style={{ gap: '12px', fontSize: '14px', lineHeight: 1.5, color: 'var(--dark-gray-2)' }}>
            <input
              type="checkbox"
              checked={values.newsletter}
              onChange={(event) => handleChange('newsletter', event.target.checked)}
              style={{ flexShrink: 0, width: '22px', height: '22px', margin: 0, accentColor: 'var(--primary)' }}
            />
            Quero receber por email ofertas e novidades das lojas da Digital Store. A frequência de envios pode
            variar de acordo com a interação do cliente.
          </label>

          <Button type="submit" variant="primary" height={48}>
            Criar Conta
          </Button>
        </div>
      </Page>
    </form>
  );
};

export default RegisterPage;
