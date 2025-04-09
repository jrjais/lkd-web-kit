import { ZodTypeAny, z } from "zod";

export const nullableInput = <T extends ZodTypeAny>(
  schema: T,
  message = "Campo requerido"
) => {
  return schema.nullable().transform((val, ctx) => {
    if (val === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        message
      });

      return z.NEVER;
    }

    return val;
  });
};
