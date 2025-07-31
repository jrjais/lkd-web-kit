import { RadioGroupProps, Radio } from '@mantine/core';
import { WithControllerProps, withController } from 'src/hocs';

export type FormRadioGroupProps = RadioGroupProps & WithControllerProps;

export const FormRadioGroup = withController<FormRadioGroupProps>(({ field, props }) => (
  <Radio.Group
    {...field}
    {...props}
  />
));
