// getKey debe retorner un string o un array de strings o NULL <- ahora retorna undefined, no coicinde con groupBy
export function indexBy<T, K, C extends string>(
  arr: T[],
  getKey: (item: T) => C | undefined
): Record<C, T | undefined>;
export function indexBy<T, K, C extends string>(
  arr: T[],
  getKey: (item: T) => C | undefined,
  getValue: (item: T) => K
): Record<C, K | undefined>;
export function indexBy<T, K>(
  arr: T[],
  getKey: (item: T) => string | undefined,
  getValue?: (item: T) => K
) {
  if (getValue)
    return arr.reduce(
      (acc, item) => {
        const key = getKey(item);
        if (key === undefined) return acc;
        acc[key] = getValue(item);
        return acc;
      },
      {} as Record<string, K>
    );

  return arr.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (key === undefined) return acc;
      acc[key] = item;
      return acc;
    },
    {} as Record<string, T>
  );
}

// falta agregar getValue como tercer parametro opcional
export const groupBy = <T extends any>(
  arr: T[],
  getKey: (item: T) => string | string[] | null
) => {
  const groups: Record<string, T[] | undefined> = {};

  arr?.forEach((item) => {
    const key = getKey(item);

    if (key === null) return;

    if (Array.isArray(key)) {
      key.forEach((k) => {
        if (!groups[k]) groups[k] = [];

        groups[k]?.push(item);
      });

      return;
    }

    if (!groups[key]) groups[key] = [];

    groups[key]?.push(item);
  });

  return groups;
};

export type IndexByResult<T> = Record<string, T | undefined>;

export type GroupByResult<T> = Record<string, T[] | undefined>;
