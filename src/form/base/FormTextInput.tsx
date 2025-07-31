import { MyTextInputProps, MyTextInput } from 'src/components';
import { WithControllerProps, withController } from 'src/hocs';

export type FormTextInputProps = WithControllerProps & MyTextInputProps;

export const FormTextInput = withController<FormTextInputProps>(({ field, props }) => (
  <MyTextInput
    {...field}
    {...props}
  />
));
