'use client';
import { Box, BoxProps, ElementProps } from '@mantine/core';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

// TODO: Completar el tipado con el schema usando z.output<schema> en el data del onSubmit
interface FormProps<T extends FieldValues> extends BoxProps, ElementProps<'form', 'onSubmit'> {
  methods: UseFormReturn<T, any, any>;
  onSubmit?: SubmitHandler<T>;
  onSubmitError?: SubmitErrorHandler<any>;
}

export const Form = <T extends FieldValues>({
  methods,
  onSubmit = () => {},
  onSubmitError,
  ...rest
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.stopPropagation();
          methods.handleSubmit(onSubmit, onSubmitError)(e);
        }}
        {...rest}
      />
    </FormProvider>
  );
};
