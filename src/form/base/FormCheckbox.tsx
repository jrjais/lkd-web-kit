import { CheckboxProps, Checkbox } from '@mantine/core';
import { WithControllerProps, withController } from 'src/hocs';

export type FormCheckboxProps = CheckboxProps & WithControllerProps;

export const FormCheckbox = withController<FormCheckboxProps>(({ field, props }) => (
  <Checkbox
    {...field}
    checked={field.value}
    {...props}
  />
));
