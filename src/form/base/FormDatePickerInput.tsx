import { MyDatePickerInput, MyDatePickerInputProps } from 'src/components';
import { WithControllerProps, withController } from 'src/hocs';

export type FormDatePickerInputProps = WithControllerProps & MyDatePickerInputProps;

export const FormDatePickerInput = withController<FormDatePickerInputProps>(({ field, props }) => (
  <MyDatePickerInput
    {...field}
    {...props}
  />
));
