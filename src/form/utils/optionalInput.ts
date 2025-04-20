import * as z from 'zod';

const emptyStringToUndefined = z.literal('').transform(() => undefined);

export function optionalInput<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}
