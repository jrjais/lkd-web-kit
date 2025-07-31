import { TextareaProps } from '@mantine/core';
import { MyTextareaProps, MyTextarea } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormTextareaProps = MyTextareaProps & WithFormProps;

export const FormTextarea = withController<TextareaProps>(({ field, props }) => (
  <MyTextarea
    {...field}
    {...props}
  />
));
