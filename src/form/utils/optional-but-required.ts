import { ZodType, z } from 'zod';

export const optionalButRequired = <T extends ZodType>(schema: T, message = 'Campo requerido') =>
  schema.optional().transform((val, ctx) => {
    if (val === undefined) {
      ctx.addIssue({
        code: "custom",
        fatal: true,
        message,
      });

      return z.NEVER;
    }

    return val;
});