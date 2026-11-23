'use client'

import {
  Box,
  type BoxProps,
  type ElementProps,
  type Factory,
  factory,
  type StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core'

export interface DashboardPageProps
  extends BoxProps,
    StylesApiProps<DashboardPageFactory>,
    ElementProps<'section'> {}
export type DashboardPageStylesNames = 'root'
export type DashboardPageFactory = Factory<{
  props: DashboardPageProps
  ref: HTMLElement
  stylesNames: DashboardPageStylesNames
}>

const classes = { root: '' }
const defaultProps = { p: 16, w: '100%' } satisfies Partial<DashboardPageProps>

export const DashboardPage = factory<DashboardPageFactory>((_props) => {
  const props = useProps('DashboardPage', defaultProps, _props)
  const { className, style, classNames, styles, unstyled, vars, attributes, ...others } = props
  const getStyles = useStyles<DashboardPageFactory>({
    name: 'DashboardPage',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    attributes,
  })
  return <Box component="section" {...getStyles('root')} {...others} />
})

DashboardPage.displayName = 'lkd-web-kit/DashboardPage'
DashboardPage.classes = classes
