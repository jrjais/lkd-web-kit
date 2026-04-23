# lkd-web-kit

**Versión lkd-web-kit:** `0.8.0` | **Mantine core:** `^9.1.0`

## Descripción del Paquete

`lkd-web-kit` es una librería interna de componentes y utilidades para React. Centraliza wrappers visuales sobre Mantine, componentes controlados por React Hook Form, validaciones con Zod, helpers para React Query/Ky y convenciones de tema para acelerar el desarrollo corporativo con una API consistente.

> **Referencia Mantine:** los componentes que extienden props de Mantine heredan su superficie nativa de props, variantes y comportamiento. Para consultar esas props heredadas y detalles de renderizado, usar la fuente LLM oficial: https://mantine.dev/llms.txt

## Inputs Genéricos (`My*`)

Usar estos componentes cuando se necesiten inputs standalone, fuera de una composición controlada por React Hook Form. En formularios, preferir siempre la familia `Form*`.

Todos los componentes de esta sección heredan props de Mantine o `@mantine/dates`; las notas siguientes cubren solo las props o decisiones custom de `lkd-web-kit`. Para props heredadas, revisar https://mantine.dev/llms.txt.

- **`MyTextInput`**
  - Base: `TextInput` de `@mantine/core`.
  - Custom props: agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: usa `variant="filled"` cuando `readOnly` es verdadero; caso contrario usa `variant="default"`.

- **`MyTextarea`**
  - Base: `Textarea` de `@mantine/core`.
  - Custom props: agrega `ref?: React.Ref<HTMLTextAreaElement>`.
  - Comportamiento propio: cambia a `variant="filled"` en modo `readOnly`.

- **`MyNumberInput`**
  - Base: `NumberInput` de `@mantine/core`.
  - Custom props: omite `onValueChange` de Mantine y agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: cambia a `variant="filled"` en modo `readOnly`.

- **`MySelect`**
  - Base: `Select` de `@mantine/core`.
  - Custom props: agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: cambia a `variant="filled"` en modo `readOnly`.

- **`MyMultiSelect`**
  - Base: `MultiSelect` de `@mantine/core`.
  - Custom props: agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: cambia a `variant="filled"` en modo `readOnly`.

- **`MyCheckboxGroup`**
  - Base: `CheckboxGroup` y `Checkbox` de `@mantine/core`.
  - Custom props: `options: CheckboxProps[]`, `orientation?: 'horizontal' | 'vertical'`, `gap?: MantineSpacing`, `disabled?: boolean`.
  - Comportamiento propio: renderiza automáticamente cada `Checkbox` desde `options`; usa `Group` para orientación horizontal y `Stack` para vertical.

- **`MyRadioGroup`**
  - Base: `Radio.Group` y `Radio` de `@mantine/core`.
  - Custom props: `options: RadioProps[]`, `orientation?: 'horizontal' | 'vertical'`, `gap?: MantineSpacing`, `disabled?: boolean`.
  - Comportamiento propio: renderiza automáticamente cada `Radio` desde `options`; usa `Group` para orientación horizontal y `Stack` para vertical.

- **`MyDateInput`**
  - Base: `DateInput` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: inyecta `CalendarIcon` como `leftSection`, desactiva sus pointer events y usa `variant="filled"` en modo `readOnly`.

- **`MyDatePickerInput`**
  - Base: `DatePickerInput` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLButtonElement>`.
  - Comportamiento propio: inyecta `CalendarIcon` como `leftSection` y usa variante filled en modo solo lectura.

- **`MyDateTimePicker`**
  - Base: `DateTimePicker` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLButtonElement>`.
  - Comportamiento propio: inyecta `CalendarIcon` y adapta la variante según `readOnly`.

- **`MyMonthPickerInput`**
  - Base: `MonthPickerInput` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLButtonElement>`.
  - Comportamiento propio: inyecta `CalendarIcon` y adapta la variante según `readOnly`.

- **`MyTimeInput`**
  - Base: usa `TextInput` de `@mantine/core` tipado con `TimeInputProps` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: adapta la variante según `readOnly`.

## Capa de UI

Estos componentes son visuales o de interacción general. Cuando envuelven Mantine, consultar también https://mantine.dev/llms.txt para props heredadas.

- **`EmptyState`**
  - Uso: estado vacío estándar para listas, tablas o pantallas sin datos.
  - Custom props: `label: ReactNode`, `action?: ReactNode`, `icon?: IconFC`, `size?: 'sm' | 'md' | 'lg'`.
  - También acepta props nativas de `div` por extender `ComponentProps<'div'>`.

- **`Icon`**
  - Uso: wrapper para renderizar componentes SVG con tamaños consistentes.
  - Custom props: `i: IconFC`, `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number`.
  - Comportamiento propio: fija `viewBox="0 0 24 24"`, aplica `flexShrink: 0` y rota con la prop SVG `rotate` si se recibe.

- **`NavItems`**
  - Uso: lista vertical de `NavLink` compatible con Next.js.
  - Custom props: `items` con `label`, `href?`, `isActive?`, `leftSection?`, `rightSection?`, `onClick?`, `disabled?`, `className?`, `children?`; `activeStrategy?: 'equals' | 'includes'`.
  - Comportamiento propio: si un item tiene `href`, renderiza `NavLink` como `Link`; si no, lo renderiza como `button`. Calcula `active` con `usePathname`.

- **`InfinityLoadMoreButton`**
  - Base: `Button` de Mantine.
  - Custom props: `infinity`, `parentRef?`, `loader?`, `labels?: { loadMore?: string; end?: string }`.
  - Uso: botón/sentinel para cargar la siguiente página de un `InfiniteQueryHookResult`. Usa `useIntersection` para disparar `fetchNextPage` al entrar en viewport.

- **`InfinitySelect`**
  - Base: `Combobox`, `InputBase` y virtualización con `@tanstack/react-virtual`.
  - Custom props principales: `infinity`, `getOptionLabel`, `getOptionValue`, `renderOption?`, `onOptionSubmit?`, `selectedOption?`, `defaultSelectedOption?`, `onSelectedOptionChange?`, `searchValue?`, `defaultSearchValue?`, `onSearchChange?`, `nothingFoundMessage?`, `comboboxProps?`, `searchable?`, `loadMoreButtonProps?`.
  - Uso: select asíncrono con paginación infinita, búsqueda controlable/no controlable y renderizado virtualizado de opciones.

- **`MyNotifications`**
  - Base: `Notifications` de `@mantine/notifications`.
  - Custom props: no agrega props propias; tipa como `NotificationsProps`.
  - Comportamiento propio: fija `position="top-center"` y `pauseResetOnHover="notification"`.

## Formularios (React Hook Form)

La capa `Form*` es la vía estándar para inputs que mutan estado de formulario. Estos componentes se conectan a React Hook Form mediante `withController`; además heredan props del input visual subyacente y, cuando aplique, props de Mantine. Para las props heredadas de Mantine, consultar https://mantine.dev/llms.txt.

### Composición Base

- **`Form`**
  - Props principales: `methods: UseFormReturn`, `onSubmit?: SubmitHandler`, `onSubmitError?: SubmitErrorHandler`.
  - Hereda `BoxProps` y props nativas de `form` excepto `onSubmit`.
  - Comportamiento propio: envuelve con `FormProvider`, renderiza `Box component="form"` y ejecuta `methods.handleSubmit` deteniendo propagación del submit.

- **`FormSubmitButton`**
  - Base: `Button` de Mantine.
  - Custom props: `disabledWhenSuccess?: boolean`.
  - Comportamiento propio: lee `isSubmitting` e `isSubmitSuccessful` desde `useFormContext`; fuerza `type="submit"`, muestra loading al enviar y puede deshabilitarse luego de submit exitoso.

### Props Compartidas por `withController`

Todos los campos controlados pueden recibir:

- `name?: string`
- `label?: ReactNode`
- `placeholder?: string`
- `description?: ReactNode`
- `validate?: ZodType`
- `disabled?: boolean`
- `onValueChange?: P['onChange']`

`withController` aplica `zodValidator(validate)` como regla de React Hook Form cuando el campo no está deshabilitado, expone `error?.message` al input y ejecuta `onValueChange` después del `field.onChange`.

### Campos Controlados

- **`FormTextInput`**
  - Base: `MyTextInput`.
  - Props: `MyTextInputProps & WithControllerProps`.

- **`FormTextarea`**
  - Base: `MyTextarea`.
  - Props declaradas: `MyTextareaProps & WithControllerProps`.

- **`FormNumberInput`**
  - Base: `MyNumberInput`.
  - Props: `MyNumberInputProps & WithControllerProps`.

- **`FormSelect`**
  - Base: `MySelect`.
  - Props: `MySelectProps & WithControllerProps`.

- **`FormMultiSelect`**
  - Base: `MyMultiSelect`.
  - Props: `MyMultiSelectProps & WithControllerProps`.

- **`FormInfinitySelect`**
  - Base: `InfinitySelect`.
  - Props: `InfinitySelectProps<T> & WithControllerProps`.
  - Comportamiento propio: sincroniza `field.onChange` y luego delega en `props.onChange` si fue provisto.

- **`FormCheckbox`**
  - Base: `Checkbox` de Mantine.
  - Props: `CheckboxProps & WithControllerProps`.
  - Comportamiento propio: si `props.value` existe, guarda ese valor cuando está checked y `""` cuando no; si no existe, guarda booleano.

- **`FormCheckboxGroup`**
  - Base: `MyCheckboxGroup`.
  - Props: `MyCheckboxGroupProps & WithControllerProps`.

- **`FormRadioGroup`**
  - Base: `MyRadioGroup`.
  - Props: `MyRadioGroupProps & WithControllerProps`.

- **`FormDateInput`**
  - Base: `MyDateInput`.
  - Props: `MyDateInputProps & WithControllerProps`.

- **`FormDatePickerInput`**
  - Base: `MyDatePickerInput`.
  - Props: `MyDatePickerInputProps & WithControllerProps`.

- **`FormDateTimePicker`**
  - Base: `MyDateTimePicker`.
  - Props declaradas: `MyDateTimePickerProps & WithControllerProps`.

- **`FormMonthPickerInput`**
  - Base: `MyMonthPickerInput`.
  - Props declaradas: `MyMonthPickerInputProps & WithControllerProps`.

- **`FormTimeInput`**
  - Base: `MyTimeInput`.
  - Props declaradas: `MyTimeInputProps & WithControllerProps`.
  - Helpers exportados: `timeInputToNumber(timeInput: string)` convierte `HH:mm` a número decimal; `numberToTimeInput(number: number)` convierte número decimal a `HH:mm`.

### Utilidades de Validación

- **`zodValidator(schema)`**
  - Convierte un `ZodType` en validador compatible con React Hook Form.
  - Devuelve el mensaje del primer issue cuando `safeParse` falla.

- **`nullableButRequired(schema, message = 'Campo requerido')`**
  - Permite construir esquemas Zod nullable pero fuerza error custom si el valor final es `null`.

- **`optionalButRequired(schema, message = 'Campo requerido')`**
  - Permite construir esquemas Zod optional pero fuerza error custom si el valor final es `undefined`.

## Hooks

- **`useBreakpoint(breakpoint)`**
  - Recibe una clave de `breakpointsWithPx` y devuelve `boolean` usando `useMediaQuery`.

- **`useOnScrollProgress(options)`**
  - Props: `triggerPercentage: number`, `callback: () => void`, `scrollRef?: RefObject<HTMLElement | null>`, `disabled?: boolean`.
  - Ejecuta `callback` una vez cuando el scroll alcanza el porcentaje indicado. Valida que el porcentaje esté entre `0` y `1`.

- **`useFetchNextPageOnScroll(options)`**
  - Props: `infinity`, `scrollRef?`, `disabled?`.
  - Usa `useOnScrollProgress` con `triggerPercentage: 0.9` para ejecutar `infinity.fetchNextPage()` si `hasNextPage` es verdadero.

- **`useUpdateSearchParams()`**
  - Devuelve `{ updateSearchParams, searchParams }`.
  - `updateSearchParams` agrega, actualiza o elimina query params con `window.history.pushState`.

- **`useZodConfig()`**
  - Configura mensajes globales de Zod para errores `too_small`, `too_big` e email inválido.

## Contextos

- **`NavigationHistoryProvider`**
  - Mantiene un historial interno de rutas de Next.js, incluyendo query string cuando existe.

- **`useNavigationHistory()`**
  - Devuelve `history`, `goBack(fallback?)`, `currentRoute`, `hasPreviousRoute` y `getPreviousRoute`.
  - Respeta el query param `backUrl` antes de usar el historial interno.

- **`PageDataProvider`**
  - Props: `value: any`, `children: React.ReactNode`.
  - Provee datos de página a través de contexto.

- **`usePageData<T>()`**
  - Lee el valor de `PageDataProvider`; lanza error si se usa fuera del contexto.

## Utilidades

- **Arrays**
  - `groupBy(arr, getKey)`: agrupa por string o por array de strings; ignora `null`.
  - `indexBy(arr, getKey, getValue?)`: indexa por clave string; puede guardar el item completo o el valor derivado.
  - `shuffleArray(array)`: devuelve una copia mezclada con algoritmo Fisher-Yates.

- **URLs y rutas**
  - `queryStringify(query)`: serializa query params omitiendo `undefined` y `null`.
  - `createNewRoute(config?)`: factory tipada para construir rutas con path params y query params.
  - `newRoute`: instancia por defecto de `createNewRoute()`.

- **Ky / HTTP**
  - `addBodyJsonHook`: `BeforeErrorHook` que adjunta `response.bodyJson` en errores HTTP de Ky.
  - `parseJSON(response)`: parsea JSON desde `response.text()` y devuelve `{}` si el cuerpo está vacío.
  - Tipo exportado: `KyError<T>`.

- **Virtualización**
  - `getVirtualItemProps(item, virtualizer)`: genera props de posicionamiento absoluto para items virtualizados.
  - `getVirtualContainerProps(virtualizer)`: genera props del contenedor con altura total y posición relativa.

- **General**
  - `formatBytes(bytes, decimals = 2)`: formatea bytes en `Bytes`, `KB` o `MB`.
  - `isInfinityEmpty(data)`: verifica si la primera página de una `InfiniteData` no tiene registros.

## Mantine y Tema

- **`myDefaultTheme`**
  - Override base de Mantine.
  - Define `breakpoints`, `cursorType: 'pointer'`, `defaultRadius: 'sm'`.
  - Defaults por componente: `Notification.withBorder`, `AppShell.padding = 0`, `Select.allowDeselect = false`, `Select.withCheckIcon = false`, `Select.clearable = true`, `Menu.position = 'bottom-end'`, `Tooltip.multiline = true`, `Tooltip.maw = 300`.

- **`breakpointsWithPx`**
  - Valores: `xs: 576px`, `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.

- **`toTailwindColors(colors)`**
  - Convierte `MantineThemeColors` en un mapa compatible con escalas numéricas estilo Tailwind.

## Reglas de Integración

1. Importar desde la raíz del paquete: `import { FormTextInput, MySelect } from 'lkd-web-kit';`.
2. Usar componentes `Form*` para cualquier input que modifique estado de React Hook Form.
3. Usar `My*` para inputs visuales standalone.
4. No duplicar wrappers ni funciones superpuestas si ya existen en la librería.
5. Para props nativas de Mantine o detalles de renderizado, consultar https://mantine.dev/llms.txt.
