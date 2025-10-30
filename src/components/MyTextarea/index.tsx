import { Textarea, TextareaProps } from '@mantine/core';

export interface MyTextareaProps extends TextareaProps {
  ref?: React.Ref<HTMLTextAreaElement>;
}

export const MyTextarea = (props: MyTextareaProps) => (
  <Textarea
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
