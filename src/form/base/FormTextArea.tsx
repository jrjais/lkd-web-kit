import { TextareaProps } from '@mantine/core';
import { MyTextareaProps, MyTextarea } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormTextareaProps = MyTextareaProps & WithFormProps;

export const FormTextarea = withForm<TextareaProps>(({ field, props }) => (
  <MyTextarea
    {...field}
    {...props}
  />
));
