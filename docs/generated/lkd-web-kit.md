# lkd-web-kit

**Version lkd-web-kit:** `0.12.3` | **Mantine core:** `^9.8.2`

## Descripción

Librería de componentes React, formularios RHF/Zod, contexto de dashboard y utilidades de navegación, consultas y tema.

> **Referencia Mantine:** los componentes que extienden props de Mantine heredan su superficie nativa de props, variantes y comportamiento. Para consultar esas props heredadas y detalles de renderizado, usar https://mantine.dev/llms.txt.

## Inputs Genéricos

- **`MyCheckboxGroup`**: Wrapper visual de Mantine
  - Base: `CheckboxGroup`.
  - Props custom: `options`, `orientation?`, `gap?`, `disabled?`.
  - Props heredadas: Mantine `CheckboxGroupGroupProps`.
  - Notas: Renderiza opciones con Group o Stack.

- **`MyDateInput`**: Wrapper visual de Mantine
  - Base: `DateInput`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `DateInputProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor e icono calendario predeterminado.

- **`MyDatePickerInput`**: Wrapper visual de Mantine
  - Base: `DatePickerInput`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `DatePickerInputProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor e icono calendario predeterminado.

- **`MyDateTimePicker`**: Wrapper visual de Mantine
  - Base: `DateTimePicker`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `DateTimePickerProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor e icono calendario predeterminado.

- **`MyMonthPickerInput`**: Wrapper visual de Mantine
  - Base: `MonthPickerInput`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `MonthPickerInputProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor e icono calendario predeterminado.

- **`MyMultiSelect`**: Wrapper visual de Mantine
  - Base: `MultiSelect`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `MultiSelectProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor.

- **`MyNotifications`**: Wrapper visual de Mantine
  - Base: `Notifications`.
  - Props custom: ninguna.
  - Props heredadas: Mantine `NotificationsProps`.
  - Notas: position top-center y pauseResetOnHover notification; acepta autoCloseProgressPosition por herencia.

- **`MyNumberInput`**: Wrapper visual de Mantine
  - Base: `NumberInput`.
  - Props custom: `ref?`; MyNumberInput omite onValueChange.
  - Props heredadas: Mantine `NumberInputProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor.

- **`MyRadioGroup`**: Wrapper visual de Mantine
  - Base: `RadioGroup`.
  - Props custom: `options`, `orientation?`, `gap?`, `disabled?`.
  - Props heredadas: Mantine `RadioGroupGroupProps`.
  - Notas: Renderiza opciones con Group o Stack.

- **`MySelect`**: Wrapper visual de Mantine
  - Base: `Select`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `SelectProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor.

- **`MyTextInput`**: Wrapper visual de Mantine
  - Base: `TextInput`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `TextInputProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor.

- **`MyTextarea`**: Wrapper visual de Mantine
  - Base: `Textarea`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `TextareaProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor.

- **`MyTimeInput`**: Wrapper visual de Mantine
  - Base: `TextInput`.
  - Props custom: `ref?`.
  - Props heredadas: Mantine `TimeInputProps`.
  - Notas: Variante filled en readOnly; permite overrides del consumidor; tipado con TimeInputProps.

## Componentes UI

- **`DashboardLayout`**: Shell responsive Next.js
  - Base: `AppShell`.
  - Props custom: `children`, `navigation?`, `brand?`, `brandHref?`, `headerActions?`, `userMenu?`, `navbarFooter?`, `search?`, `labels?`.
  - Props heredadas: BoxProps, StylesApiProps, HTML div.
  - Notas: Header/Navbar/Main comparten contexto seguro. Con navigation arma el shell; sin navigation renderiza la composición explícita. Page y Title son estaticos tipados. Soporta extend y refs.

- **`DashboardLayoutHeader`**: Cabecera del shell; también DashboardLayout.Header
  - Base: `AppShell.Header`.
  - Props custom: `brand?`, `brandHref?`, `headerActions?`, `userMenu?`.
  - Props heredadas: BoxProps, CompoundStylesApiProps sin vars, HTML header.
  - Notas: Requiere DashboardLayout; comparte burgers mobile/desktop. children se agrega a acciones.

- **`DashboardLayoutMain`**: Área principal; también DashboardLayout.Main
  - Base: `AppShell.Main`.
  - Props custom: ninguna.
  - Props heredadas: BoxProps, CompoundStylesApiProps sin vars, HTML main.
  - Notas: Requiere DashboardLayout y usa sus estilos.

- **`DashboardLayoutNavbar`**: Navegación lateral; también DashboardLayout.Navbar
  - Base: `AppShell.Navbar`.
  - Props custom: `navigation`, `search?`, `navbarFooter?`.
  - Props heredadas: BoxProps, CompoundStylesApiProps sin vars, HTML div.
  - Notas: Requiere DashboardLayout; busqueda sin acentos, rutas por segmento y activePaths, cierra mobile al navegar.

- **`DashboardPage`**: Contenedor semántico de página; también DashboardLayout.Page
  - Base: `Box component section`.
  - Props custom: ninguna.
  - Props heredadas: BoxProps, StylesApiProps, HTML section.
  - Notas: p=16 y w=100% por defecto. p admite responsive; maw y mx permiten centrar. factory, extend y ref; independiente del contexto.

- **`DashboardTitle`**: Encabezado semántico de página; también DashboardLayout.Title
  - Base: `Box component header`.
  - Props custom: `title: ReactNode`, `description?`, `action?`.
  - Props heredadas: BoxProps, StylesApiProps, HTML header excepto title.
  - Notas: factory, extend y ref; selectores root, body, title, description, action. No requiere DashboardLayout.

- **`EmptyState`**: Estado vacío obsoleto; preferir Mantine EmptyState
  - Base: `N/A`.
  - Props custom: `label`, `action?`, `icon?`, `size?: sm | md | lg`.
  - Props heredadas: HTML div.
  - Notas: Ninguna.

- **`Icon`**: SVG con dimensiones y rotación
  - Base: `SVG`.
  - Props custom: `i: IconFC`, `size?`.
  - Props heredadas: HTML svg.
  - Notas: viewBox 0 0 24 24; size admite tokens y numeros.

- **`InfinityLoadMoreButton`**: Boton y sentinel para siguiente página
  - Base: `Button`.
  - Props custom: `infinity`, `parentRef?`, `loader?`, `labels?`.
  - Props heredadas: Mantine ButtonProps.
  - Notas: useIntersection dispara fetchNextPage; muestra loading.

- **`InfinitySelect`**: Select asíncrono virtualizado
  - Base: `Combobox e InputBase`.
  - Props custom: `infinity`, `getOptionLabel`, `getOptionValue`, `renderOption?`, `onOptionSubmit?`, `selectedOption?`, `defaultSelectedOption?`, `onSelectedOptionChange?`, `value?`, `defaultValue?`, `searchValue?`, `defaultSearchValue?`, `onSearchChange?`, `nothingFoundMessage?`, `comboboxProps?`, `searchable?`, `loadMoreButtonProps?`, `resetPageParam?`, `ref?`.
  - Props heredadas: Consultar InfinitySelectProps.
  - Notas: Paginación infinita y teclado con useVirtualizedCombobox.

- **`ModalManagerProvider`**: Proveedor de modales tipados
  - Base: `React Context`.
  - Props custom: `modals`, `children`, `loadModals?`.
  - Props heredadas: N/A.
  - Notas: Registry sobreescribible por module augmentation; precarga por prefijos.

- **`MyTable`**: Tabla horizontal o vertical TanStack v9
  - Base: `Mantine Table`.
  - Props custom: Consultar MyTableProps: `variant?`, `pinnedColumns?`, columnas, estados y callbacks.
  - Props heredadas: Mantine TableProps segun MyTableProps.
  - Notas: Columnas con createColumnHelper<MyTableFeatures, RowData>().

- **`NavItems`**: Navegación vertical con Next Link
  - Base: `NavLink`.
  - Props custom: `items`, `activeStrategy?: equals | includes`; items admiten key, label, href, isActive, iconos, onClick, disabled, className, style y children.
  - Props heredadas: N/A.
  - Notas: prefetch false; sin href usa button.

- **`NavigationHistoryProvider`**: Historial de rutas
  - Base: `React Context`.
  - Props custom: `children`.
  - Props heredadas: N/A.
  - Notas: Tracker con Suspense; incluye query string.

- **`PageDataProvider`**: Datos compartidos de página
  - Base: `React Context`.
  - Props custom: `value`, `children`.
  - Props heredadas: N/A.
  - Notas: usePageData requiere su proveedor.

- **`TableWrapper`**: Contenedor de tabla
  - Base: `Paper`.
  - Props custom: `children?`.
  - Props heredadas: Mantine PaperProps.
  - Notas: Renderiza section.

- **`TableWrapperFooter`**: Pie de tabla
  - Base: `N/A`.
  - Props custom: ninguna.
  - Props heredadas: HTML footer.
  - Notas: Centrado.

- **`TableWrapperHeader`**: Cabecera de tabla
  - Base: `N/A`.
  - Props custom: ninguna.
  - Props heredadas: HTML header.
  - Notas: Padding base.

- **`TableWrapperPagination`**: Paginación larga o compacta
  - Base: `Pagination`.
  - Props custom: `variant?: long | short`, `text?`, `totalRows?`, `currentRows?`, `pageSize?` requerido en short.
  - Props heredadas: Mantine PaginationProps con omisiones.
  - Notas: short calcula rango de filas; long usa controles completos.

- **`TableWrapperTitle`**: Título de tabla
  - Base: `N/A`.
  - Props custom: ninguna.
  - Props heredadas: HTML p.
  - Notas: Tipografía base.

## Formularios (React Hook Form)

- **`Form`**: Formulario con contexto
  - Base: Box component form.
  - Props custom: `methods: UseFormReturn`, `onSubmit?`, `onSubmitError?`.
  - Control: FormProvider y methods.handleSubmit.
  - Notas: Detiene propagacion; hereda BoxProps y HTML form excepto onSubmit.

- **`FormCheckbox`**: Campo controlado
  - Base: withController(Checkbox).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange; guarda booleano o props.value cuando es truthy.

- **`FormCheckboxGroup`**: Campo controlado
  - Base: withController(MyCheckboxGroup).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormDateInput`**: Campo controlado
  - Base: withController(MyDateInput).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormDatePickerInput`**: Campo controlado
  - Base: withController(MyDatePickerInput).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormDateTimePicker`**: Campo controlado
  - Base: withController(MyDateTimePicker).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormInfinitySelect`**: Campo controlado
  - Base: withController(InfinitySelect).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormMonthPickerInput`**: Campo controlado
  - Base: withController(MyMonthPickerInput).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormMultiSelect`**: Campo controlado
  - Base: withController(MyMultiSelect).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormNumberInput`**: Campo controlado
  - Base: withController(MyNumberInput).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormRadioGroup`**: Campo controlado
  - Base: withController(MyRadioGroup).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormSelect`**: Campo controlado
  - Base: withController(MySelect).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormSubmitButton`**: Boton submit
  - Base: Button.
  - Props custom: `disabledWhenSuccess?`.
  - Control: useFormContext lee isSubmitting e isSubmitSuccessful.
  - Notas: type submit y loading automático.

- **`FormTextInput`**: Campo controlado
  - Base: withController(MyTextInput).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormTextarea`**: Campo controlado
  - Base: withController(MyTextarea).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

- **`FormTimeInput`**: Campo controlado
  - Base: withController(MyTimeInput).
  - Props custom: `name?`, `label?`, `placeholder?`, `description?`, `validate?`, `disabled?`, `onValueChange?`.
  - Control: Controller de React Hook Form.
  - Notas: Props del input y WithControllerProps; defaultValue vacío, validación Zod y onValueChange posterior a field.onChange.

## Hooks

- **`useBreakpoint`**: useMediaQuery con min-width
  - Firma: `useBreakpoint(breakpoint: keyof typeof breakpointsWithPx): boolean`.
  - Parámetros custom: breakpoint: keyof typeof breakpointsWithPx.
  - Retorno: boolean.

- **`useFetchNextPageOnScroll`**: Carga siguiente página al 90% del scroll si hasNextPage
  - Firma: `useFetchNextPageOnScroll(options: FetchNextPageOnScrollOptions): void`.
  - Parámetros custom: options: FetchNextPageOnScrollOptions.
  - Retorno: void.

- **`useModalManager`**: Requiere ModalManagerProvider
  - Firma: `useModalManager(): showModal y closeModal tipados`.
  - Parámetros custom: ninguno.
  - Retorno: showModal y closeModal tipados.

- **`useNavigationHistory`**: Prioriza backUrl y evita loops
  - Firma: `useNavigationHistory(): history, goBack, hasPreviousRoute, currentRoute, getPreviousRoute`.
  - Parámetros custom: ninguno.
  - Retorno: history, goBack, hasPreviousRoute, currentRoute, getPreviousRoute.

- **`useOnScrollProgress`**: callback una vez por efecto; porcentaje debe estar entre 0 y 1
  - Firma: `useOnScrollProgress(options: OnScrollProgressOptions): void`.
  - Parámetros custom: options: OnScrollProgressOptions.
  - Retorno: void.

- **`usePageData<T>`**: Requiere PageDataProvider
  - Firma: `usePageData<T>(): T`.
  - Parámetros custom: ninguno.
  - Retorno: T.

- **`useUpdateSearchParams`**: pushState; elimina null
  - Firma: `useUpdateSearchParams(): updateSearchParams y searchParams`.
  - Parámetros custom: ninguno.
  - Retorno: updateSearchParams y searchParams.

- **`useZodConfig`**: Configura errores Zod requeridos, longitud e email
  - Firma: `useZodConfig(): void`.
  - Parámetros custom: ninguno.
  - Retorno: void.

## Utilidades

- **`addBodyJsonHook`**: Parsea el cuerpo de error HTTP Ky
  - Firma: `addBodyJsonHook(BeforeErrorHook): error con response.bodyJson`.
  - Entrada: BeforeErrorHook.
  - Salida: error con response.bodyJson.

- **`createLkdTheme`**: Combina myDefaultTheme con overrides
  - Firma: `createLkdTheme(theme: MantineThemeOverride): MantineThemeOverride`.
  - Entrada: theme.
  - Salida: MantineThemeOverride.

- **`createNewRoute`**: Soporta path params, query y builders custom
  - Firma: `createNewRoute(config?): constructor de rutas tipado`.
  - Entrada: queryBuilder opcional.
  - Salida: constructor de rutas tipado.

- **`formatBytes`**: Unidades Bytes a MB
  - Firma: `formatBytes(bytes, decimals = 2): string`.
  - Entrada: Número de bytes.
  - Salida: string.

- **`getVirtualContainerProps`**: Altura total y posición relativa
  - Firma: `getVirtualContainerProps(virtualizer): ComponentProps<div>`.
  - Entrada: getTotalSize.
  - Salida: ComponentProps<div>.

- **`getVirtualItemProps`**: Posicion absoluta y measureElement
  - Firma: `getVirtualItemProps(item, virtualizer): props de div con data-index`.
  - Entrada: VirtualItem y virtualizer.
  - Salida: props de div con data-index.

- **`groupBy`**: Agrupa e ignora null
  - Firma: `groupBy(arr, getKey): GroupByResult`.
  - Entrada: Array y callback string o string[] o null.
  - Salida: GroupByResult.

- **`indexBy`**: Indexa e ignora undefined
  - Firma: `indexBy(arr, getKey, getValue?): Record`.
  - Entrada: Array y callback de clave.
  - Salida: Record.

- **`isInfinityEmpty`**: Comprueba registros de la primera página
  - Firma: `isInfinityEmpty(data): boolean`.
  - Entrada: InfiniteData opcional.
  - Salida: boolean.

- **`newRoute`**: Instancia predeterminada de createNewRoute
  - Firma: `newRoute(path, options?): constructor de URL`.
  - Entrada: Template o función.
  - Salida: constructor de URL.

- **`nullableButRequired`**: Acepta nullable en input pero rechaza null
  - Firma: `nullableButRequired(schema, message?): schema Zod`.
  - Entrada: ZodType.
  - Salida: schema Zod.

- **`numberToTimeInput`**: HH:mm
  - Firma: `numberToTimeInput(number): string`.
  - Entrada: Número decimal de horas.
  - Salida: string.

- **`optionalButRequired`**: Acepta optional en input pero rechaza undefined
  - Firma: `optionalButRequired(schema, message?): schema Zod`.
  - Entrada: ZodType.
  - Salida: schema Zod.

- **`parseJSON`**: Cuerpo vacío devuelve objeto vacío
  - Firma: `parseJSON(response): Promise de JSON`.
  - Entrada: Response.
  - Salida: Promise de JSON.

- **`queryStringify`**: Omite undefined y null
  - Firma: `queryStringify(query): string`.
  - Entrada: Objeto de query.
  - Salida: string.

- **`shuffleArray`**: Mezcla Fisher-Yates
  - Firma: `shuffleArray(array): array`.
  - Entrada: Array.
  - Salida: array.

- **`timeInputToNumber`**: Horas decimales a dos posiciones
  - Firma: `timeInputToNumber(timeInput): number`.
  - Entrada: HH:mm.
  - Salida: number.

- **`toApiDateFormat`**: Formato definido por el helper
  - Firma: `toApiDateFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toApiDateMonthFormat`**: Formato definido por el helper
  - Firma: `toApiDateMonthFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toApiDateTimeFormat`**: Formato definido por el helper
  - Firma: `toApiDateTimeFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toDisplayDateFormat`**: Formato definido por el helper
  - Firma: `toDisplayDateFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toDisplayDateTimeFormat`**: Formato definido por el helper
  - Firma: `toDisplayDateTimeFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toDisplayMonthFormat`**: Formato definido por el helper
  - Firma: `toDisplayMonthFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toInputDateFormat`**: Formato definido por el helper
  - Firma: `toInputDateFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toInputDateMonthFormat`**: Formato definido por el helper
  - Firma: `toInputDateMonthFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toInputDateTimeFormat`**: Formato definido por el helper
  - Firma: `toInputDateTimeFormat(val?): string`.
  - Entrada: Fecha compatible con dayjs.
  - Salida: string.

- **`toTailwindColors`**: Escalas numéricas Tailwind
  - Firma: `toTailwindColors(colors: MantineThemeColors): mapa de colores`.
  - Entrada: Paleta Mantine.
  - Salida: mapa de colores.

- **`withController`**: Conecta validación y errores RHF
  - Firma: `withController(WrappedComponent, getControllerProps?): componente controlado`.
  - Entrada: Input y props del Controller.
  - Salida: componente controlado.

- **`withModalManager`**: Gestiona abierto y removeModal
  - Firma: `withModalManager(WrappedComponent): componente de modal`.
  - Entrada: Componente con onClose.
  - Salida: componente de modal.

- **`zodValidator`**: Devuelve mensaje del primer issue
  - Firma: `zodValidator(schema): función validadora`.
  - Entrada: ZodType.
  - Salida: función validadora.

## Constantes y Tipos

- **`ApiList`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ApiPagination`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutClassNames`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutFactory`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutHeaderFactory`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutHeaderProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutLabels`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutMainFactory`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutMainProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutNavbarFactory`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutNavbarProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardLayoutStylesNames`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardNavItem`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardNavSection`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardPageFactory`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardPageProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardPageStylesNames`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardSearchConfig`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardTitleFactory`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardTitleProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DashboardTitleStylesNames`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`DeepPartial`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormCheckboxGroupProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormCheckboxProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormDateInputProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormDatePickerInputProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormDateTimePickerProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormFieldProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormInfinitySelectProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormMonthPickerInputProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormMultiSelectProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormNumberInputProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormRadioGroupProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormSelectProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormTextInputProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormTextareaProps`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`FormTimeInput`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`GroupByResult`**: Resultado agrupado
  - Tipo: `type`.
  - Uso: Resultado agrupado.

- **`HttpStatus`**: Codigos HTTP
  - Tipo: `enum`.
  - Uso: Codigos HTTP.

- **`IconFC`**: Componente SVG
  - Tipo: `type`.
  - Uso: Componente SVG.

- **`IndexByResult`**: Resultado indexado
  - Tipo: `type`.
  - Uso: Resultado indexado.

- **`KyError`**: HTTPError con cuerpo JSON
  - Tipo: `type`.
  - Uso: HTTPError con cuerpo JSON.

- **`LayoutProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ModalKey`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ModalManagerProviderProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ModalManagerRegistryOverride`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ModalRegistry`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ModalRegistryItem`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ModalRegistryRecord`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`MyTableFeatures`**: Features de TanStack Table v9
  - Tipo: `type`.
  - Uso: Features de TanStack Table v9.

- **`PageProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`Revalidate`**: Duraciones en segundos
  - Tipo: `enum`.
  - Uso: Duraciones en segundos.

- **`Setter`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`ShowModalOptions`**: Contrato público tipado
  - Tipo: `type`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`WithControllerProps`**: Contrato público tipado
  - Tipo: `interface`.
  - Uso: Consultar la declaración exportada; tipos de props, navegación, factory o datos del componente correspondiente.

- **`breakpointsWithPx`**: xs 540px, sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px, 3xl 1680px
  - Tipo: `const`.
  - Uso: xs 540px, sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px, 3xl 1680px.

- **`myDefaultTheme`**: Defaults Mantine, Container xl custom, AppShell padding 0 y reglas de Select/Menu/Tooltip
  - Tipo: `const`.
  - Uso: Defaults Mantine, Container xl custom, AppShell padding 0 y reglas de Select/Menu/Tooltip.

- **`myTableFeatures`**: Feature set de MyTable
  - Tipo: `const`.
  - Uso: Feature set de MyTable.

## Notas de Uso

1. Importar desde la raíz del paquete: `import { FormTextInput, MySelect } from 'lkd-web-kit';`.
2. Usar componentes `Form*` solo dentro de formularios controlados por React Hook Form.
3. Consultar https://mantine.dev/llms.txt para props heredadas de Mantine.
4. Tailwind debe escanear dist. Page y Title tienen tema independiente del shell.
5. Registro de regeneración: 2026-11-23T14:45:16-04:00 (America/La_Paz), Codex/OpenAI, modelo no verificado, usuario SO hugo\hugos mediante whoami; detalles en docs/planes-ejecutados/2026-11-23-dashboard-compuesto-0-12-3.md.

## No Exportado

`getPathValue` existe en src/utils/get-path-value.ts y no se exporta desde el barrel. El contexto del dashboard y usePartStyles son internos.
