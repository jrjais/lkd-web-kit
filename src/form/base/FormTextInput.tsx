import { MyTextInputProps, MyTextInput } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormTextInputProps = WithFormProps & MyTextInputProps;

export const FormTextInput = withForm<FormTextInputProps>(({ field, props }) => (
  <MyTextInput
    {...field}
    {...props}
  />
));
