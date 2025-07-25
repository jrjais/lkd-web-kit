export const queryStringify = (query: Record<string, any> = {}): string => {
  const entries = Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => [key, String(value)]);

  return entries.length ? `?${new URLSearchParams(entries).toString()}` : '';
};
