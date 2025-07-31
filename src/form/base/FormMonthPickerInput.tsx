import { MyMonthPickerInput, MyMonthPickerInputProps } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormMonthPickerInputProps = WithFormProps & MyMonthPickerInputProps;

export const FormMonthPickerInput = withController<MyMonthPickerInputProps>(({ field, props }) => (
  <MyMonthPickerInput
    {...field}
    {...props}
  />
));
