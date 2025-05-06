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
interface FormProps<T extends FieldValues, TContext = any, TT extends T = T>
  extends BoxProps,
    ElementProps<'form', 'onSubmit'> {
  methods: UseFormReturn<T, TContext, TT>;
  onSubmit?: SubmitHandler<TT>;
  onSubmitError?: SubmitErrorHandler<T>;
}

export const Form = <T extends FieldValues, TContext = any, TT extends T = T>({
  methods,
  onSubmit = () => {},
  onSubmitError,
  ...rest
}: FormProps<T, TContext, TT>) => {
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
