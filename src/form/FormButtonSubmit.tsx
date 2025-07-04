'use client';
import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export interface FormButtonSubmitProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {}

export const FormButtonSubmit = (props: FormButtonSubmitProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button
      // disabled={isSubmitSuccessful}
      loading={isSubmitting}
      type="submit"
      {...props}
    />
  );
};
