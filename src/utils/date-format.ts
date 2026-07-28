import dayjs, { type ConfigTypeMap } from 'dayjs'

type DateValue = ConfigTypeMap['default']

// inputs
export const toInputDateFormat = (val?: DateValue) => dayjs(val).format('YYYY-MM-DD')

export const toInputDateTimeFormat = (val?: DateValue) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')

export const toInputDateMonthFormat = (val?: DateValue) => dayjs(val).format('YYYY-MM')

// api
// Remover formatos duplicados?
export const toApiDateTimeFormat = (val?: DateValue) => dayjs(val).format('YYYY-MM-DDTHH:mm:ss')

export const toApiDateFormat = (val?: DateValue) => dayjs(val).format('YYYY-MM-DD')

export const toApiDateMonthFormat = (val?: DateValue) => dayjs(val).format('YYYY-MM')

// web
export const toDisplayDateFormat = (val?: DateValue) => dayjs(val).format('DD/MM/YYYY')

export const toDisplayMonthFormat = (val?: DateValue) => dayjs(val).format('MM/YYYY')

export const toDisplayDateTimeFormat = (val?: DateValue) => dayjs(val).format('DD/MM/YYYY HH:mm')
