import { useEffect } from 'react';
import z from 'zod/v4';

export const useZodConfig = () => {
  useEffect(() => {
    z.config({
      customError: (iss) => {
        if (iss.code === 'too_small')
          return iss.minimum === 1 ? `Campo requerido` : `Minimo ${iss.minimum} caracteres`;

        if (iss.code === 'too_big') return `Maximo ${iss.maximum} caracteres`;

        if (iss.code === 'invalid_format' && iss.format === 'email') return `Email invalido`;
      },
    });
  }, []);
};
