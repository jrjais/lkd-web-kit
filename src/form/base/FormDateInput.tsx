import { MyDateInput, MyDateInputProps } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormDateInputProps = WithFormProps & MyDateInputProps;

export const FormDateInput = withForm<FormDateInputProps>(({ field, props }) => (
  <MyDateInput
    {...field}
    {...props}
  />
));
