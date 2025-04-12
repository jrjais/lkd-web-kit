'use client';
import { useSearchParams } from 'next/navigation';

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();

  const updateSearchParams = (newSearchparams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newSearchparams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
        return;
      }
      params.set(key, String(value));
    });

    window?.history?.pushState(null, '', `?${params.toString()}`);
  };

  return { updateSearchParams, searchParams };
};
