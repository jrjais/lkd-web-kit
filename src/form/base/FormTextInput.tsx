import { MyTextInputProps, MyTextInput } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormTextInputProps = WithFormProps & MyTextInputProps;

export const FormTextInput = withController<FormTextInputProps>(({ field, props }) => (
  <MyTextInput
    {...field}
    {...props}
  />
));
