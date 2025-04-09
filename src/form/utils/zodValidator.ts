import { ZodTypeAny } from 'zod';

const zodValidator = (schema: ZodTypeAny) => {
  return (values: any) => {
    const result = schema.safeParse(values);
    if (result.success) return;

    const { error } = result;
    const firstError = error.issues[0];

    return firstError?.message;
  };
};

export default zodValidator;
