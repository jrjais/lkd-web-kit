import { MyMonthPickerInput, MyMonthPickerInputProps } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormMonthPickerInputProps = WithFormProps & MyMonthPickerInputProps;

export const FormMonthPickerInput = withForm<MyMonthPickerInputProps>(({ field, props }) => (
  <MyMonthPickerInput
    {...field}
    {...props}
  />
));
