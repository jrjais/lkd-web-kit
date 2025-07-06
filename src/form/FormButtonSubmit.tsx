'use client';
import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface FormButtonSubmitProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  disabledWhenSuccess?: boolean;
}

export const FormButtonSubmit = ({
  disabled,
  disabledWhenSuccess,
  ...props
}: FormButtonSubmitProps) => {
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = useFormContext();

  return (
    <Button
      disabled={disabled ?? (isSubmitSuccessful && disabledWhenSuccess)}
      loading={isSubmitting}
      type="submit"
      {...props}
    />
  );
};
