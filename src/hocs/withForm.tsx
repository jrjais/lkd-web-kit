'use client';
import { Controller, ControllerProps } from 'react-hook-form';
import { ZodTypeAny } from 'zod';
import { zodValidator } from '../form';

export interface WithFormProps {
  name?: string;
  label?: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;
  validate?: ZodTypeAny;
  disabled?: boolean;
}

export type FormFieldProps<T = unknown> = Parameters<ControllerProps['render']>[0] & {
  props: T;
  field: {
    label?: React.ReactNode;
    placeholder?: string;
    description?: React.ReactNode;
    error?: string;
  };
};

export const withForm = <P extends unknown>(
  WrappedComponent: React.ComponentType<FormFieldProps<P>>,
  getControllerProps?: (props: P) => Omit<Partial<ControllerProps>, 'render'>,
) => {
  const FormField: React.FC<P & WithFormProps> = (props) => {
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
            fieldState: { isTouched, error },
          } = renderProps;

          const fieldProps = {
            ...renderProps,
            props: {
              ...props,
              validate: undefined,
            },
            field: {
              ...renderProps.field,
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
