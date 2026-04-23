import React from 'react'
import { MyNumberInput, MyNumberInputProps } from 'src/components'
import { WithControllerProps, withController } from 'src/hocs'

export type FormNumberInputProps = MyNumberInputProps & WithControllerProps

export const FormNumberInput: React.FC<FormNumberInputProps> = withController<FormNumberInputProps>(
  ({ field, props }) => <MyNumberInput {...field} {...props} />,
)
