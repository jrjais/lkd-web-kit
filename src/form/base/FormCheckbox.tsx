import { CheckboxProps, Checkbox } from '@mantine/core';
import { WithControllerProps, withController } from 'src/hocs';

export type FormCheckboxProps = CheckboxProps & WithControllerProps;

export const FormCheckbox = withController<FormCheckboxProps>(({ field, props }) => (
  <Checkbox
    {...field}
    checked={Boolean(field.value)}
    onChange={(e) => {
      if(props.value) 
        field.onChange(e.currentTarget.checked ? props.value : "");
      else 
        field.onChange(e.currentTarget.checked);      
    }}
    {...props}
  />
));
