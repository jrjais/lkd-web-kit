import { ReactNode } from 'react';
import { InfinitySelectProps, InfinitySelect } from 'src/components';
import { withController, WithFormProps } from 'src/hocs';

export type FormInfinitySelectProps<T = unknown> = InfinitySelectProps<T> & WithFormProps;

export const FormInfinitySelect = withController<FormInfinitySelectProps>(({ field, props }) => {
  return (
    <InfinitySelect
      {...field}
      {...props}
      onChange={(e) => {
        field.onChange(e);
        props.onChange?.(e);
      }}
    />
  );
}) as <T>(props: FormInfinitySelectProps<T>) => ReactNode;
