import { BeforeErrorHook, HTTPError } from 'ky';
import { parseJSON } from './parseJson';

export type KyError<T = unknown> = HTTPError<T> & {
  response: {
    bodyJson?: T;
  };
};

export const addBodyJsonHook: BeforeErrorHook = async (error: KyError<unknown>) => {
  error.response.bodyJson = await parseJSON(error.response);
  return error;
};
