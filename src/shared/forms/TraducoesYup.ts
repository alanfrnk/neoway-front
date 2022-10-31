import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Campo não é válido',
    required: 'O campo é obrigatório',
  },
  string: {
    max: ({ max }) => `O campo pode ter no máximo ${max} caracteres`,
    min: ({ min }) => `O campo precisa ter pelo menos ${min} caracteres`,
    length: ({ length }) => `O campo precisa ter exatamente ${length} caracteres`,
  },
  number: {
    integer: () => 'O campo precisa ter um valor inteiro',
  },
  boolean: {},
  object: {},
  array: {},
});
