import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { MyMultiSelect, MyMultiSelectProps } from 'src/components';
import { WithControllerProps, withController } from 'src/hocs';

export type FormMultiSelectProps = MyMultiSelectProps & WithControllerProps;

export const FormMultiSelect = withController<FormMultiSelectProps>(({ field, props }) => (
  <MyMultiSelect
    {...field}
    {...props}
  />
));
