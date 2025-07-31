import { MyDateInput, MyDateInputProps } from 'src/components';
import { WithControllerProps, withController } from 'src/hocs';

export type FormDateInputProps = WithControllerProps & MyDateInputProps;

export const FormDateInput = withController<FormDateInputProps>(({ field, props }) => (
  <MyDateInput
    {...field}
    {...props}
  />
));
