import { z, ZodType } from 'zod';

export const nullableButRequired = <T extends ZodType>(schema: T, message = 'Campo requerido') =>
  schema.nullable().transform((val, ctx) => {
    if (val === null) {
      ctx.addIssue({
        code: "custom",
        fatal: true,
        message,
      });

      return z.NEVER;
    }

    return val;
});
