import { withForm, WithFormProps } from 'lkd-web-kit';
import { ReactNode } from 'react';
import { InfinitySelectProps, InfinitySelect } from 'src/components';

export type FormInfinitySelectProps<T = unknown> = InfinitySelectProps<T> & WithFormProps;

export const FormInfinitySelect = withForm<FormInfinitySelectProps>(({ field, props }) => {
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
