import { RadioGroupProps, Radio } from '@mantine/core';
import { WithFormProps, withForm } from 'src/hocs';

export type FormRadioGroupProps = RadioGroupProps & WithFormProps;

export const FormRadioGroup = withForm<FormRadioGroupProps>(({ field, props }) => (
  <Radio.Group
    {...field}
    {...props}
  />
));
