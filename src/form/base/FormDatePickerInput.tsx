import { MyDatePickerInput, MyDatePickerInputProps } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormDatePickerInputProps = WithFormProps & MyDatePickerInputProps;

export const FormDatePickerInput = withController<FormDatePickerInputProps>(({ field, props }) => (
  <MyDatePickerInput
    {...field}
    {...props}
  />
));
