import { CheckboxProps, Checkbox } from '@mantine/core';
import { WithFormProps, withController } from 'src/hocs';

export type FormCheckboxProps = CheckboxProps & WithFormProps;

export const FormCheckbox = withController<FormCheckboxProps>(({ field, props }) => (
  <Checkbox
    {...field}
    checked={field.value}
    {...props}
  />
));
