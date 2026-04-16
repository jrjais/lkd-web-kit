# lkd-web-kit 

**Versión lkd-web-kit:** `0.7.31` | **Mantine:** `^8.3.18`

## 📦 Descripción del Paquete

`lkd-web-kit` es una librería interna de componentes de React basada en **Mantine** (v8), **React Hook Form**, **Zod** y **React Query**, empaquetada con Vite. Provee componentes de UI estandarizados, envolturas (wrappers) para formularios, hooks y utilidades generales para acelerar y estandarizar el desarrollo en nuestros proyectos.

> **Referencia de Mantine:** El LLM de la biblioteca UI base es https://mantine.dev/llms.txt

## 🛠️ Componentes UI

El paquete exporta componentes de UI que funcionan como wrappers sobre Mantine o componentes personalizados:
> **Nota sobre Props:** Cada componente que extienda de Mantine acepta sus respectivas props. Puedes consultar las props disponibles en la documentación LLM especificada (https://mantine.dev/llms.txt).

### Inputs Genéricos (Prefijo `My`)
Usar cuando se necesiten campos _standalone_ que **no** formen parte de un formulario estructurado. Todos estos componentes heredan las propiedades de su contraparte en Mantine. **Para más información sobre las propiedades heredadas (ej. variantes, tamaños, colores), consulta el LLM correspondiente en [https://mantine.dev/llms.txt](https://mantine.dev/llms.txt).**

- **Texto:** `MyTextInput`, `MyTextarea`
  - *Custom props:* No añaden props significativas, actúan como un wrapper directo.
- **Selección:** `MySelect`, `MyMultiSelect`
  - *Custom props:* Comportamiento base directo sobre Select/MultiSelect de Mantine.
- **Numérico:** `MyNumberInput`
  - *Custom props:* Comportamiento base sobre NumberInput de Mantine.
- **Opciones:** `MyCheckboxGroup`, `MyRadioGroup`
  - *Custom props:* `options` (array de objetos para generar las opciones), `orientation` ('horizontal' | 'vertical'), `gap` (espaciado).
- **Fechas y Horas:** `MyDateInput`, `MyDatePickerInput`, `MyDateTimePicker`, `MyMonthPickerInput`, `MyTimeInput`
  - *Custom props:* Heredan de la paquetería `@mantine/dates`. Sin props adicionales complejas.

### Otros Componentes Visuales
- **`EmptyState`:** Representa de manera estándar los estados vacíos en tablas o listas. 
  - *Custom props:* `label` (ReactNode), `action` (ReactNode), `icon` (IconFC), `size` (string).
- **`Icon`:** Wrapper general para iconos.
  - *Custom props:* `i` (componente del ícono), `size` (string/number).
- **`InfinityLoadMoreButton` y `InfinitySelect`:** Componentes para el manejo de paginación o carga infinita de datos.
  - *Custom props:* Integran dependencias de paginación.
- **`NavItems`:** Componentes enfocados a la navegación.
  - *Custom props:* `label` (string), `href` (string), `isActive` (boolean), `leftSection` / `rightSection` (ReactNode).
- **`MyNotifications`:** Manejo estandarizado y centralizado de notificaciones (basado en `@mantine/notifications`).

> **Nota:** Algunos de estos componentes construyen sobre utilidades de Mantine. Verifica el LLM [https://mantine.dev/llms.txt](https://mantine.dev/llms.txt) si interactúan con la capa UI de Mantine.

## 📝 Formularios (React Hook Form + Zod)

Abstracción central para la creación de formularios con tipado robusto. **NUNCA** utilices componentes nativos o estándar de Mantine directamente. Todos estos componentes controlados extienden las propiedades del componente original de Mantine (las cuales puedes visualizar en su referencia LLM). 

### Componentes de Formulario Base
- **`Form`:** Componente principal que envuelve el `<form>` y maneja el contexto asociado a `react-hook-form`.
- **`FormSubmitButton`:** Botón estandarizado para la emisión de formularios.

### Campos Controlados (Prefijo `Form`)
Estos campos se integran y sincronizan automáticamente con `react-hook-form` a través de un HOC. 

**Custom props compartidas inyectadas por el controlador:**
Todos estos componentes reciben, además de las props heredadas del input de Mantine, las siguientes utilidades:
  - `name` (string): Nombre del campo en el formulario.
  - `validate` (ZodType): Esquema de validación individual aplicado al campo.
  - `label`, `description`, `placeholder`: Textos descriptivos (ReactNode/string).
  - `disabled` (boolean): Inhabilita interacciones.
  - `onValueChange` (función): Callback lateral adicional a las rutinas del formulario.

> **¡Importante!** Para conocer el resto de propiedades de presentación, renderizado y funcionalidad que estos componentes aceptan (ej. si quieres saber qué props recibe `FormTextInput` de forma nativa), debes consultar el LLM del componente base de Mantine en [https://mantine.dev/llms.txt](https://mantine.dev/llms.txt).

- **Texto:** `FormTextInput`, `FormTextarea`
- **Selección:** `FormSelect`, `FormMultiSelect` y `FormSelectInfinity` (diseñado específicamente para selects asíncronos extensos).
- **Numérico:** `FormNumberInput`
- **Opciones múltiples:** `FormCheckbox`, `FormCheckboxGroup`, `FormRadioGroup`
- **Fechas y Horas:** `FormDateInput`, `FormDatePickerInput`, `FormDateTimePicker`, `FormMonthPickerInput`, `FormTimeInput`

### Validación con Zod
- **`zodValidator`:** Helper para resolución de esquemas Zod en los validadores de componentes.
- **Asersores:** `nullable-but-required`, `optional-but-required` para utilidades de validación y control de datos requeridos.

## 🪝 Hooks Personalizados

Librería de hooks reutilizables para optimizar casos de uso recurrentes:
- **`useBreakpoint`:** Permite suscribirse a los *media queries* de manera consistente.
- **`useFetchNextPageOnScroll` / `useOnScrollProgress`:** Gestión avanzada de scroll y optimización de paginación infinita en interfaces de listas largas.
- **`useUpdateSearchParams`:** Integración con *Next.js* o utilidades nativas para la gestión fluida y reactiva de los *query params* en la URL.
- **`useZodConfig`:** Centralización de la configuración del ecosistema *Zod* para los formularios estandarizados.

## 🔧 Utilidades

Funciones puras de ayuda que abstraen lógicas complejas o repetitivas:
- **HTTP / Fetching (`ky`):** `addBodyJsonHook`, `parseJson` para interceptores y transformaciones.
- **Arrays:** `groupBy`, `shuffleArray` para manipulación segura y eficiente.
- **General:**
  - `formatBytes`: Estandariza la muestra de tamaño de archivos para el usuario.
  - `isInfinityEmpty`: Evalúa listas paginadas para detectar estados vacíos de forma universal.
  - `query-stringify`: Procesamiento de cadenas para URLs de consultas.
  - `virtual-styles`: Manejo de inyecciones virtuales de estilo.

## 🎨 Mantine & Tematización

El paquete aporta un sistema de diseño propio por sobre Mantine:
- Acceso a temas base mediante: `my-default-theme`
- Conversiones y compatibilidad exportada: `breakpoints-with-px`, `to-tailwind-colors`

## 🚨 Reglas Críticas de Integración
Al consumir esta biblioteca o delegar trabajo como Agente de IA, respeta los siguientes pilares:
1. **Importaciones Centralizadas:** Efectúa cualquier importación desde la raíz, ej: `import { FormTextInput, useBreakpoint } from 'lkd-web-kit';`.
2. **Formularios Estrictos:** Construye todos los contextos de formulario haciendo uso de las etiquetas `<Form>` y de los campos prefijados por patrón `Form[Type]`.
3. **Consistencia Visual:** Utiliza los tokens de temas previstos. Evita sobreescribir estilos clave usando clases de utilería que rompan las definiciones predeterminadas.
