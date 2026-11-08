import FormField from './FormField';
import { maskCep, maskCpf, maskPhone } from '../utils/masks';

const stack = { display: 'flex', flexDirection: 'column', gap: '20px' };

export const PersonalFields = ({ values, errors, onChange, showEmail = true }) => (
  <div style={stack}>
    <FormField name="name" label="Nome Completo" required placeholder="Insira seu nome" autoComplete="name"
      value={values.name} error={errors.name} onChange={onChange} />
    <FormField name="cpf" label="CPF" required placeholder="Insira seu CPF" inputMode="numeric" format={maskCpf}
      value={values.cpf} error={errors.cpf} onChange={onChange} />
    {showEmail && (
      <FormField name="email" label="E-mail" required type="email" placeholder="Insira seu email"
        autoComplete="email" value={values.email} error={errors.email} onChange={onChange} />
    )}
    <FormField name="phone" label="Celular" required placeholder="Insira seu celular" inputMode="tel"
      format={maskPhone} autoComplete="tel" value={values.phone} error={errors.phone} onChange={onChange} />
  </div>
);

export const AddressFields = ({ values, errors, onChange }) => (
  <div style={stack}>
    <FormField name="address" label="Endereço" required placeholder="Insira seu endereço"
      autoComplete="street-address" value={values.address} error={errors.address} onChange={onChange} />
    <FormField name="neighborhood" label="Bairro" required placeholder="Insira seu bairro"
      value={values.neighborhood} error={errors.neighborhood} onChange={onChange} />
    <FormField name="city" label="Cidade" required placeholder="Insira sua cidade"
      value={values.city} error={errors.city} onChange={onChange} />
    <FormField name="cep" label="CEP" required placeholder="Insira seu CEP" inputMode="numeric" format={maskCep}
      autoComplete="postal-code" value={values.cep} error={errors.cep} onChange={onChange} />
    <FormField name="complement" label="Complemento" placeholder="Insira complemento"
      value={values.complement} error={errors.complement} onChange={onChange} />
  </div>
);
