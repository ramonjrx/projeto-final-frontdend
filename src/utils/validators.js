import { onlyDigits } from './masks';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email = '') => EMAIL_PATTERN.test(email.trim());

export const validatePerson = (v) => {
  const errors = {};
  if (!v.name?.trim()) errors.name = 'Informe seu nome completo';
  if (onlyDigits(v.cpf ?? '').length !== 11) errors.cpf = 'CPF inválido';
  if (!isValidEmail(v.email)) errors.email = 'E-mail inválido';
  if (onlyDigits(v.phone ?? '').length < 10) errors.phone = 'Celular inválido';
  return errors;
};

export const validateAddress = (v) => {
  const errors = {};
  if (!v.address?.trim()) errors.address = 'Informe seu endereço';
  if (!v.neighborhood?.trim()) errors.neighborhood = 'Informe o bairro';
  if (!v.city?.trim()) errors.city = 'Informe a cidade';
  if (onlyDigits(v.cep ?? '').length !== 8) errors.cep = 'CEP inválido';
  return errors;
};

export const validateCard = (v) => {
  const errors = {};
  const month = Number(onlyDigits(v.cardExpiry ?? '').slice(0, 2));
  if (!v.cardName?.trim()) errors.cardName = 'Informe o nome impresso no cartão';
  if (onlyDigits(v.cardNumber ?? '').length !== 16) errors.cardNumber = 'Número do cartão inválido';
  if (onlyDigits(v.cardExpiry ?? '').length !== 4 || month < 1 || month > 12) {
    errors.cardExpiry = 'Validade inválida';
  }
  if (onlyDigits(v.cvv ?? '').length < 3) errors.cvv = 'CVV inválido';
  return errors;
};
