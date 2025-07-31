import { MyMonthPickerInput, MyMonthPickerInputProps } from 'src/components';
import { WithControllerProps, withController } from 'src/hocs';

export type FormMonthPickerInputProps = WithControllerProps & MyMonthPickerInputProps;

export const FormMonthPickerInput = withController<MyMonthPickerInputProps>(({ field, props }) => (
  <MyMonthPickerInput
    {...field}
    {...props}
  />
));
