import { TextareaProps } from '@mantine/core';
import { MyTextareaProps, MyTextarea } from 'src/components';
import { WithControllerProps, withController } from 'src/hocs';

export type FormTextareaProps = MyTextareaProps & WithControllerProps;

export const FormTextarea = withController<TextareaProps>(({ field, props }) => (
  <MyTextarea
    {...field}
    {...props}
  />
));
