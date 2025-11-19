'use client';
import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface FormSubmitButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  disabledWhenSuccess?: boolean;
}

export const FormSubmitButton = ({
  disabled,
  disabledWhenSuccess,
  ...props
}: FormSubmitButtonProps) => {
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
