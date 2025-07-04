'use client';
import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface FormButtonSubmitProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  disabledWhenSuccess?: boolean;
}

export const FormButtonSubmit = ({ disabled, ...props }: FormButtonSubmitProps) => {
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = useFormContext();

  return (
    <Button
      disabled={disabled ?? (isSubmitSuccessful && props.disabledWhenSuccess)}
      loading={isSubmitting}
      type="submit"
      {...props}
    />
  );
};
