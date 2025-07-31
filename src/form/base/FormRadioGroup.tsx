import { RadioGroupProps, Radio } from '@mantine/core';
import { WithFormProps, withController } from 'src/hocs';

export type FormRadioGroupProps = RadioGroupProps & WithFormProps;

export const FormRadioGroup = withController<FormRadioGroupProps>(({ field, props }) => (
  <Radio.Group
    {...field}
    {...props}
  />
));
