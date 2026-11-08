import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import FormField from '../components/FormField';
import SocialLogin from '../components/SocialLogin';
import { useStore } from '../context/StoreContext';
import useForm from '../hooks/useForm';

const UNAVAILABLE = 'Este recurso ainda não está disponível nesta versão.';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useStore();
  const { values, errors, setErrors, handleChange } = useForm({ login: '', password: '' });
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = {};
    if (!values.login.trim()) found.login = 'Informe seu login ou e-mail';
    if (!values.password) found.password = 'Informe sua senha';
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const result = login(values.login, values.password);
    if (result.error) {
      setErrors({ login: result.error });
      return;
    }
    navigate(location.state?.from ?? '/', { replace: true });
  };

  return (
    <AuthLayout
      title="Acesse sua conta"
      subtitle={
        <>
          Novo cliente? Então registre-se{' '}
          <Link to="/cadastro" className="underline" style={{ color: 'var(--dark-gray-2)' }}>
            aqui
          </Link>
          .
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-column" style={{ gap: '20px' }}>
        <FormField name="login" label="Login" required placeholder="Insira seu login ou email"
          autoComplete="username" value={values.login} error={errors.login} onChange={handleChange} />
        <FormField name="password" label="Senha" required type="password" placeholder="Insira sua senha"
          autoComplete="current-password" value={values.password} error={errors.password} onChange={handleChange} />

        <button
          type="button"
          onClick={() => setFeedback(UNAVAILABLE)}
          style={{ alignSelf: 'flex-start', padding: 0, border: 0, background: 'transparent', fontSize: '14px', color: 'var(--dark-gray-2)', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Esqueci minha senha
        </button>

        <Button type="submit" variant="primary" height={48}>
          Acessar Conta
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
};

export default LoginPage;
