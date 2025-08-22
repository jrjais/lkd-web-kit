'use client';
import { Controller, ControllerProps } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodValidator } from '../form';
import { ReactNode } from 'react';

export interface WithControllerProps {
  name?: string;
  label?: ReactNode;
  placeholder?: string;
  description?: ReactNode;
  validate?: ZodType;
  disabled?: boolean;
}

export type FormFieldProps<T = unknown> = Parameters<ControllerProps['render']>[0] & {
  props: T;
  field: {
    label?: ReactNode;
    placeholder?: string;
    description?: React.ReactNode;
    error?: string;
  };
};

export const withController = <P extends { onChange?: any }>(
  WrappedComponent: React.ComponentType<FormFieldProps<P>>,
  getControllerProps?: (fieldProps: P) => Omit<Partial<ControllerProps>, 'render'>,
) => {
  const FormField: React.FC<P & WithControllerProps & { onValueChange?: P['onChange'] }> = (
    props,
  ) => {
    const { validate, name = '', placeholder, label, description, ...withFormRestProps } = props;

    return (
      <Controller
        name={name}
        defaultValue={''}
        rules={{
          validate: validate && !props.disabled ? zodValidator(validate) : undefined,
        }}
        disabled={props.disabled}
        {...getControllerProps?.(props)}
        render={(renderProps) => {
          const {
            fieldState: { error },
          } = renderProps;

          const fieldProps = {
            ...renderProps,
            props: {
              ...props,
              validate: undefined,
              onValueChange: undefined,
            },
            field: {
              ...renderProps.field,
              onChange: (...value: any[]) => {
                renderProps.field.onChange(...value);
                props.onValueChange?.(...value);
              },
              label,
              placeholder,
              description,
              error: error?.message,
            },
            ...withFormRestProps,
          } as FormFieldProps<P>;

          return <WrappedComponent {...fieldProps} />;
        }}
      />
    );
  };

  FormField.displayName = `WithForm(${WrappedComponent.displayName})`;

  return FormField;
};
