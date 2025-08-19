import { RadioGroupProps, Radio } from '@mantine/core';
import { WithControllerProps, withController } from 'src/hocs';
import { MyRadioGroup, MyRadioGroupProps } from 'src/components';

export type FormRadioGroupProps = MyRadioGroupProps & WithControllerProps;

export const FormRadioGroup = withController<FormRadioGroupProps>(({ field, props }) => (
  <MyRadioGroup
    {...field}
    {...props}
  />
));
