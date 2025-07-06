import { ZodType, z } from 'zod/v4';

export const optionalButRequired = <T extends ZodType>(schema: T, message = 'Campo requerido') =>
  schema.optional().check((ctx) => {
    if (ctx.value === undefined) {
      ctx.issues.push({
        code: 'custom',
        message,
        input: ctx.value,
      });
    }
  });
