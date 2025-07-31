import { ReactNode } from 'react';
import { InfinitySelectProps, InfinitySelect } from 'src/components';
import { withController, WithControllerProps } from 'src/hocs';

export type FormInfinitySelectProps<T = unknown> = InfinitySelectProps<T> & WithControllerProps;

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
