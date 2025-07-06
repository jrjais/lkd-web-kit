import { z, ZodType } from 'zod/v4';

export const nullableButRequired = <T extends ZodType>(schema: T, message = 'Campo requerido') =>
  schema.nullable().check((ctx) => {
    if (ctx.value === null) {
      ctx.issues.push({
        code: 'custom',
        message,
        input: ctx.value,
      });
    }
  });
