import { z, ZodTypeAny } from 'zod';

export const nullableButRequired = <T extends ZodTypeAny>(schema: T, message = 'Campo requerido') =>
  schema.nullable().superRefine((val, ctx) => {
    if (val === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      });
    }
  });
