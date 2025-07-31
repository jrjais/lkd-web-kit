import { MyDateInput, MyDateInputProps } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormDateInputProps = WithFormProps & MyDateInputProps;

export const FormDateInput = withController<FormDateInputProps>(({ field, props }) => (
  <MyDateInput
    {...field}
    {...props}
  />
));
