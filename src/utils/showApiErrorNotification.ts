import { showNotification } from '@mantine/notifications';
import { HTTPError } from 'ky';
import { HttpStatus } from 'src/consts';

export const showApiErrorNotification = (
  error?: unknown,
  messages?: Partial<Record<HttpStatus, string>>,
) => {
  if (error instanceof HTTPError) {
    const fallBackMessage = 'Ocurrió un error, por favor intenta de nuevo más tarde';

    const baseMessages: Partial<Record<HttpStatus, string>> = {
      [HttpStatus.Forbidden]:
        'No tienes permisos para realizar esta acción, contáctate con un administrador',
      [HttpStatus.InternalServerError]: fallBackMessage,
      ...messages,
    };

    const status = error.response.status as HttpStatus;
    const message = baseMessages[status] ?? fallBackMessage;

    showNotification({
      message: message,
      color: 'red',
    });
  }

  throw error;
};
