# Generador de Prompt para LKD Web Kit Forms Guide

## Objetivo

Generar y mantener actualizado el prompt de guía de formularios para LKD Web Kit, que permite a otros proyectos saber cómo usar específicamente los **componentes de formularios** de esta librería.

## Contexto del Sistema de Formularios

LKD Web Kit incluye un sistema completo de formularios que proporciona:

- Componentes de formulario pre-configurados (Form\*)
- Integración automática con React Hook Form + Zod + Mantine
- Validación automática y manejo de estados
- TypeScript completo
- Mensajes de error en español

## Instrucciones para Generar el Prompt de Formularios

Analiza específicamente el **sistema de formularios** de la librería y genera un prompt completo que incluya:

### 1. Información Básica sobre Formularios

- **Título**: Debe incluir el nombre, versión actual del package.json y "Guía de Componentes de Formularios"
- **Descripción**: Qué es el sistema de formularios y qué problema resuelve
- **Tecnologías**: React Hook Form + Zod + Mantine para formularios

### 2. Componentes de Formulario Disponibles

Lista todos los componentes Form\* disponibles agrupados por categoría:

- **Entrada de Texto**: FormTextInput, FormTextarea, FormNumberInput
- **Selección**: FormSelect, FormMultiSelect, FormInfinitySelect, FormRadioGroup
- **Fecha y Hora**: FormDateInput, FormDatePickerInput, FormDateTimePicker, FormMonthPickerInput, FormTimeInput
- **Otros**: FormCheckbox, Form, FormButtonSubmit

### 3. Props Comunes de Campos de Formulario

Documenta la interfaz WithControllerProps que todos los campos comparten:

- name (requerido)
- label, placeholder, description
- validate (para esquemas Zod)
- disabled, readOnly
- Más todas las props del componente Mantine base

### 4. Ejemplos Prácticos de Formularios

Incluye ejemplos completos de código para:

- **Formulario Simple**: Uso básico con validación
- **Formulario Avanzado**: Con zodResolver y esquema completo
- **FormInfinitySelect**: Con useInfiniteQuery de React Query
- **FormTimeInput**: Con utilidades timeInputToNumber y numberToTimeInput
- **Estados del Formulario**: FormButtonSubmit y manejo de errores

### 5. Validación Avanzada con Zod v4

Documenta específicamente:

- **Esquemas condicionales** usando `.check()` (NO `.refine()`)
- **Utilidades custom**: nullableButRequired, optionalButRequired
- **Formato de retorno** con `issues` array para Zod v4
- **Ejemplos prácticos** de validaciones complejas

### 6. Características Clave del Sistema de Formularios

- Validación automática con mensajes en español
- Estados visuales (readOnly usa variant="filled")
- TypeScript completo
- Configuración cero
- Integración completa con Mantine

### 7. Notas Importantes

- Todos los campos requieren prop `name`
- Diferencia entre validación por campo (`validate`) vs validación completa (`zodResolver`)
- Los componentes extienden completamente Mantine
- Sistema optimizado para TypeScript

## Requisitos Específicos

1. **NO incluir** información de instalación o setup inicial
2. **NO incluir** detalles de la arquitectura interna o estructura de archivos
3. **SÍ enfocarse** en cómo usar la librería como dependencia externa
4. **SÍ usar** sintaxis de Zod v4 con `.check()` en lugar de `.refine()`
5. **SÍ incluir** ejemplos completos y funcionales
6. **SÍ mantener** formato markdown limpio y bien estructurado

## Output

El prompt generado debe ser guardado en `.github/prompts/lkd-web-kit-form-guide.md` y debe ser un recurso completo para que otros desarrolladores sepan exactamente cómo implementar **formularios** usando el sistema de formularios de esta librería.

Recuerda actualizar la versión en el título cada vez que se publique una nueva versión del paquete.
