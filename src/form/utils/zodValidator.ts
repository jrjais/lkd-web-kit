import { ZodType } from 'zod';

export const zodValidator = (schema: ZodType) => {
  return (values: any) => {
    const result = schema.safeParse(values);
    if (result.success) return;

    const { error } = result;
    const firstError = error.issues[0];

    return firstError?.message;
  };
};
