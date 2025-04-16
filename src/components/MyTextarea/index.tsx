import { Textarea, TextareaProps } from '@mantine/core';

export interface MyTextareaProps extends TextareaProps {}

export const MyTextarea = (props: MyTextareaProps) => (
  <Textarea
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
