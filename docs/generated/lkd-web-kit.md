# lkd-web-kit

**Version lkd-web-kit:** `0.9.2` | **Mantine core:** `^9.4.1`

## Descripcion del Paquete

`lkd-web-kit` es una libreria interna de componentes y utilidades para React. Centraliza wrappers visuales sobre Mantine, componentes controlados por React Hook Form, validaciones con Zod, helpers para React Query/Ky, contextos de navegacion para Next.js y convenciones de tema para acelerar el desarrollo corporativo con una API consistente.

> **Referencia Mantine:** los componentes que extienden props de Mantine heredan su superficie nativa de props, variantes y comportamiento. Para consultar esas props heredadas y detalles de renderizado, usar la fuente LLM oficial: https://mantine.dev/llms.txt

## Inputs Genericos (`My*`)

Usar estos componentes cuando se necesiten inputs standalone, fuera de una composicion controlada por React Hook Form. En formularios, preferir siempre la familia `Form*`.

Todos los componentes de esta seccion heredan props de Mantine o `@mantine/dates`; las notas siguientes cubren solo las props o decisiones custom de `lkd-web-kit`. Para props heredadas, revisar https://mantine.dev/llms.txt.

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
  - Base: `Checkbox.Group` y `Checkbox` de `@mantine/core`.
  - Custom props: `options: CheckboxProps[]`, `orientation?: 'horizontal' | 'vertical'`, `gap?: MantineSpacing`, `disabled?: boolean`.
  - Comportamiento propio: renderiza automaticamente cada `Checkbox` desde `options`; usa `Group` para orientacion horizontal y `Stack` para vertical.

- **`MyRadioGroup`**
  - Base: `Radio.Group` y `Radio` de `@mantine/core`.
  - Custom props: `options: RadioProps[]`, `orientation?: 'horizontal' | 'vertical'`, `gap?: MantineSpacing`, `disabled?: boolean`.
  - Comportamiento propio: renderiza automaticamente cada `Radio` desde `options`; usa `Group` para orientacion horizontal y `Stack` para vertical.

- **`MyDateInput`**
  - Base: `DateInput` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: inyecta `CalendarIcon` como `leftSection`, desactiva sus pointer events y usa `variant="filled"` en modo `readOnly`.

- **`MyDatePickerInput`**
  - Base: `DatePickerInput` de `@mantine/dates`, tipado como `DatePickerInputProps<any>`.
  - Custom props: agrega `ref?: React.Ref<HTMLButtonElement>`.
  - Comportamiento propio: inyecta `CalendarIcon` como `leftSection`, desactiva sus pointer events y adapta la variante segun `readOnly`.

- **`MyDateTimePicker`**
  - Base: `DateTimePicker` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLButtonElement>`.
  - Comportamiento propio: inyecta `CalendarIcon`, desactiva sus pointer events y adapta la variante segun `readOnly`.

- **`MyMonthPickerInput`**
  - Base: `MonthPickerInput` de `@mantine/dates`, tipado como `MonthPickerInputProps<any>`.
  - Custom props: agrega `ref?: React.Ref<HTMLButtonElement>`.
  - Comportamiento propio: inyecta `CalendarIcon`, desactiva sus pointer events y adapta la variante segun `readOnly`.

- **`MyTimeInput`**
  - Base: usa `TextInput` de `@mantine/core` tipado con `TimeInputProps` de `@mantine/dates`.
  - Custom props: agrega `ref?: React.Ref<HTMLInputElement>`.
  - Comportamiento propio: adapta la variante segun `readOnly`.

## Capa de UI

Estos componentes son visuales o de interaccion general. Cuando envuelven Mantine, consultar tambien https://mantine.dev/llms.txt para props heredadas.

- **`EmptyState`** _(deprecated: usar `EmptyState` de `@mantine/core`)_
  - Uso: estado vacio estandar para listas, tablas o pantallas sin datos.
  - Custom props: `label: ReactNode`, `action?: ReactNode`, `icon?: IconFC`, `size?: 'sm' | 'md' | 'lg'`.
  - Tambien acepta props nativas de `div` por extender `ComponentProps<'div'>`.

- **`Icon`**
  - Uso: wrapper para renderizar componentes SVG con tamanos consistentes.
  - Custom props: `i: IconFC`, `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number`.
  - Comportamiento propio: fija `viewBox="0 0 24 24"`, aplica `flexShrink: 0` y rota con la prop SVG `rotate` si se recibe.

- **`NavItems`**
  - Uso: lista vertical de `NavLink` compatible con Next.js.
  - Custom props: `items` con `label`, `href?`, `isActive?`, `leftSection?`, `rightSection?`, `onClick?`, `disabled?`, `className?`, `children?`; `activeStrategy?: 'equals' | 'includes'`.
  - Comportamiento propio: si un item tiene `href`, renderiza `NavLink` como `Link` con `prefetch={false}`; si no, lo renderiza como `button`. Calcula `active` con `usePathname`.

- **`InfinityLoadMoreButton`**
  - Base: `Button` de Mantine.
  - Custom props: `infinity`, `parentRef?`, `loader?`, `labels?: { loadMore?: string; end?: string }`.
  - Uso: boton/sentinel para cargar la siguiente pagina de un `InfiniteQueryHookResult`. Usa `useIntersection` para disparar `fetchNextPage` al entrar en viewport y muestra `loading` cuando la query esta cargando o trayendo la siguiente pagina.

- **`InfinitySelect`**
  - Base: `Combobox`, `InputBase`, `useUncontrolled`, `useVirtualizedCombobox` y virtualizacion con `@tanstack/react-virtual`.
  - Custom props principales: `infinity`, `getOptionLabel`, `getOptionValue`, `renderOption?`, `onOptionSubmit?`, `selectedOption?`, `defaultSelectedOption?`, `onSelectedOptionChange?`, `value?`, `defaultValue?`, `searchValue?`, `defaultSearchValue?`, `onSearchChange?`, `nothingFoundMessage?`, `comboboxProps?`, `searchable?`, `loadMoreButtonProps?`, `resetPageParam?`, `ref?`.
  - Uso: select asincrono con paginacion infinita, busqueda controlable/no controlable, renderizado virtualizado de opciones y navegacion por teclado compatible con listas virtuales.

- **`MyNotifications`**
  - Base: `Notifications` de `@mantine/notifications`.
  - Custom props: no agrega props propias; tipa como `NotificationsProps` mediante `MyNotificationPrpos`.
  - Comportamiento propio: fija `position="top-center"` y `pauseResetOnHover="notification"`.

## Formularios (React Hook Form)

La capa `Form*` es la via estandar para inputs que mutan estado de formulario. Estos componentes se conectan a React Hook Form mediante `withController`; ademas heredan props del input visual subyacente y, cuando aplique, props de Mantine. Para las props heredadas de Mantine, consultar https://mantine.dev/llms.txt.

### Composicion Base

- **`Form`**
  - Props principales: `methods: UseFormReturn`, `onSubmit?: SubmitHandler`, `onSubmitError?: SubmitErrorHandler`.
  - Hereda `BoxProps` y props nativas de `form` excepto `onSubmit`.
  - Comportamiento propio: envuelve con `FormProvider`, renderiza `Box component="form"` y ejecuta `methods.handleSubmit` deteniendo propagacion del submit.

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

`withController` aplica `zodValidator(validate)` como regla de React Hook Form cuando el campo no esta deshabilitado, usa `defaultValue=""`, propaga `disabled`, expone `error?.message` al input y ejecuta `onValueChange` despues de `field.onChange`.

### Campos Controlados

- **`FormTextInput`**: base `MyTextInput`; props `WithControllerProps & MyTextInputProps`.
- **`FormTextarea`**: base `MyTextarea`; props publicas esperadas `MyTextareaProps & WithControllerProps`.
- **`FormNumberInput`**: base `MyNumberInput`; props `MyNumberInputProps & WithControllerProps`.
- **`FormSelect`**: base `MySelect`; props `MySelectProps & WithControllerProps`.
- **`FormMultiSelect`**: base `MyMultiSelect`; props `MyMultiSelectProps & WithControllerProps`.
- **`FormInfinitySelect`**: base `InfinitySelect`; props `InfinitySelectProps<T> & WithControllerProps`. Sincroniza `field.onChange` y luego delega en `props.onChange` si fue provisto.
- **`FormCheckbox`**: base `Checkbox` de Mantine; props `CheckboxProps & WithControllerProps`. Si `props.value` existe, guarda ese valor cuando esta checked y `""` cuando no; si no existe, guarda booleano.
- **`FormCheckboxGroup`**: base `MyCheckboxGroup`; props `MyCheckboxGroupProps & WithControllerProps`.
- **`FormRadioGroup`**: base `MyRadioGroup`; props `MyRadioGroupProps & WithControllerProps`.
- **`FormDateInput`**: base `MyDateInput`; props `WithControllerProps & MyDateInputProps`.
- **`FormDatePickerInput`**: base `MyDatePickerInput`; props `WithControllerProps & MyDatePickerInputProps`.
- **`FormDateTimePicker`**: base `MyDateTimePicker`; props declaradas `WithControllerProps & MyDateTimePickerProps`.
- **`FormMonthPickerInput`**: base `MyMonthPickerInput`; props declaradas `WithControllerProps & MyMonthPickerInputProps`.
- **`FormTimeInput`**: base `MyTimeInput`; el tipo exportado se llama `FormTimeInput` y equivale a `MyTimeInputProps & WithControllerProps`. Helpers exportados: `timeInputToNumber(timeInput: string)` convierte `HH:mm` a numero decimal; `numberToTimeInput(number: number)` convierte numero decimal a `HH:mm`.

### Utilidades de Validacion

- **`zodValidator(schema)`**
  - Convierte un `ZodType` en validador compatible con React Hook Form.
  - Devuelve el mensaje del primer issue cuando `safeParse` falla.

- **`nullableButRequired(schema, message = 'Campo requerido')`**
  - Permite construir esquemas Zod nullable pero fuerza error custom si el valor final es `null`.

- **`optionalButRequired(schema, message = 'Campo requerido')`**
  - Permite construir esquemas Zod optional pero fuerza error custom si el valor final es `undefined`.

## HOCs

- **`withController`**
  - HOC interno/exportado para adaptar inputs a React Hook Form mediante `Controller`.
  - Props compartidas: ver seccion `Props Compartidas por withController`.

- **`withModalManager`**
  - HOC para envolver componentes manejados por un modal manager.
  - Tipos: `ModalManagerWrappedComponentProps<T>` agrega `onClose`; `ModalManagerWrapperProps<T>` agrega `removeModal`.
  - Comportamiento propio: administra `isOpen`, llama `removeModal` al cerrar y renderiza el componente envuelto con `onClose`.

## Hooks

- **`useBreakpoint(breakpoint)`**
  - Recibe una clave de `breakpointsWithPx` y devuelve `boolean` usando `useMediaQuery`.

- **`useOnScrollProgress(options)`**
  - Props: `triggerPercentage: number`, `callback: () => void`, `scrollRef?: RefObject<HTMLElement | null>`, `disabled?: boolean`.
  - Ejecuta `callback` una vez cuando el scroll alcanza el porcentaje indicado. Valida que el porcentaje este entre `0` y `1`.

- **`useFetchNextPageOnScroll(options)`**
  - Props: `infinity`, `scrollRef?`, `disabled?`.
  - Usa `useOnScrollProgress` con `triggerPercentage: 0.9` para ejecutar `infinity.fetchNextPage()` si `hasNextPage` es verdadero.

- **`useUpdateSearchParams()`**
  - Devuelve `{ updateSearchParams, searchParams }`.
  - `updateSearchParams` agrega, actualiza o elimina query params con `window.history.pushState`; elimina claves cuyo valor sea `null`.

- **`useZodConfig()`**
  - Configura mensajes globales de Zod para errores `too_small`, `too_big` e email invalido.

## Contextos

- **`NavigationHistoryProvider`**
  - Mantiene un historial interno de rutas de Next.js, incluyendo query string cuando existe.
  - Evita duplicados consecutivos y usa `Suspense` para el tracker de ruta.

- **`useNavigationHistory()`**
  - Devuelve `history`, `goBack(fallback?)`, `currentRoute`, `hasPreviousRoute` y `getPreviousRoute`.
  - Respeta el query param `backUrl` (`QP_BACK_URL_NAME`) antes de usar el historial interno; ante loops o ausencia de historial usa `fallback ?? '/'`.

- **`PageDataProvider`**
  - Props: `value: any`, `children: React.ReactNode`.
  - Provee datos de pagina a traves de contexto.

- **`usePageData<T>()`**
  - Lee el valor de `PageDataProvider`; lanza error si se usa fuera del contexto.

## Utilidades

- **Arrays**
  - `groupBy(arr, getKey)`: agrupa por string o por array de strings; ignora `null`.
  - `indexBy(arr, getKey, getValue?)`: indexa por clave string; ignora `undefined`; puede guardar el item completo o el valor derivado.
  - `shuffleArray(array)`: devuelve una copia mezclada con algoritmo Fisher-Yates.
  - Tipos exportados: `IndexByResult<T>`, `GroupByResult<T>`.

- **URLs y rutas**
  - `queryStringify(query)`: serializa query params omitiendo `undefined` y `null`; devuelve string vacio si no hay entradas.
  - `createNewRoute(config?)`: factory tipada para construir rutas con path params `:param`, query params y builders custom.
  - `newRoute`: instancia por defecto de `createNewRoute()`.

- **Ky / HTTP**
  - `addBodyJsonHook`: `BeforeErrorHook` que adjunta `response.bodyJson` en errores HTTP de Ky.
  - `parseJSON(response)`: parsea JSON desde `response.text()` y devuelve `{}` si el cuerpo esta vacio.
  - Tipo exportado: `KyError<T>`.

- **Virtualizacion**
  - `getVirtualItemProps(item, virtualizer)`: genera props de posicionamiento absoluto para items virtualizados.
  - `getVirtualContainerProps(virtualizer)`: genera props del contenedor con altura total y posicion relativa.

- **General**
  - `formatBytes(bytes, decimals = 2)`: formatea bytes en `Bytes`, `KB` o `MB`.
  - `isInfinityEmpty(data)`: verifica si la primera pagina de una `InfiniteData` no tiene registros.
  - `getPathValue(obj, path)`: helper presente en `src/utils/get-path-value.ts`, pero no exportado desde `src/utils/index.ts` al momento de esta generacion.

## Constantes y Tipos

- **`HttpStatus`**
  - Enum de codigos HTTP comunes, desde respuestas informativas hasta errores de servidor.

- **`Revalidate`**
  - Enum de duraciones en segundos: `OneHour`, `OneDay`, `OneWeek`, `OneMonth`, `OneYear`.

- **Tipos API**
  - `ApiList<T = unknown>`: `{ data: T[] }`.
  - `ApiPagination<T>`: `{ data: T[] }`.
  - `PageProps`: props asincronas estilo Next.js para `params` y `searchParams`.
  - `LayoutProps`: `children` y `params` asincronos.
  - `Setter<T>`: alias de `Dispatch<SetStateAction<T>>`.
  - `DeepPartial<T>`: partial recursivo.

## Mantine y Tema

- **`myDefaultTheme`**
  - Override base de Mantine.
  - Define `breakpoints`, `cursorType: 'pointer'`, `defaultRadius: 'sm'`.
  - Defaults por componente: `Notification.withBorder = true`, `AppShell.padding = 0`, `Select.allowDeselect = false`, `Select.withCheckIcon = false`, `Select.clearable = true`, `Menu.position = 'bottom-end'`, `Tooltip.multiline = true`, `Tooltip.maw = 300`.

- **`breakpointsWithPx`**
  - Valores: `xs: 576px`, `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.

- **`toTailwindColors(colors)`**
  - Convierte `MantineThemeColors` en un mapa compatible con escalas numericas estilo Tailwind.

## Reglas de Integracion

1. Importar desde la raiz del paquete: `import { FormTextInput, MySelect } from 'lkd-web-kit';`.
2. Usar componentes `Form*` para cualquier input que modifique estado de React Hook Form.
3. Usar `My*` para inputs visuales standalone.
4. No duplicar wrappers ni funciones superpuestas si ya existen en la libreria.
5. Para props nativas de Mantine o detalles de renderizado, consultar https://mantine.dev/llms.txt.
