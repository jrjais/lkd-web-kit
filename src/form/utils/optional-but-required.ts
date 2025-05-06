import { ZodTypeAny, z } from 'zod';

export const optionalButRequired = <T extends ZodTypeAny>(schema: T, message = 'Campo requerido') =>
  schema.optional().superRefine((val, ctx) => {
    if (val === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      });
    }
  });
