# Como regenerar la documentacion autogenerada de lkd-web-kit

`docs/generated/lkd-web-kit.md` es la fuente de verdad rapida del API publico de esta libreria interna. Se regenera con un flujo asistido por IA leyendo directamente `src/`.

Regenera este documento cuando cambie la superficie publica: nuevos componentes `My*` o `Form*`, cambios de props, cambios de comportamiento exportado, nuevos hooks/utilidades exportadas o breaking changes de peer dependencies que obliguen a modificar wrappers, formularios o tipos publicos.

## Prompt para el agente

```text
Analiza la carpeta `src` de este entorno y regenera `docs/generated/lkd-web-kit.md`.

Fuentes obligatorias:
1. `package.json`: leer la version actual de `lkd-web-kit` y el rango de `@mantine/core`.
2. `src/index.ts`: usarlo como fuente de verdad de exportaciones publicas.
3. `src/components`: listar componentes generales, wrappers `My*` y UI visual.
4. `src/form/base` y `src/form/utils`: listar componentes `Form*`, HOC/controladores y utilidades de formularios.
5. `src/hooks` y `src/utils`: listar solo hooks y utilidades exportadas publicamente.

Reglas de contenido:
- Documenta solo API publico exportado desde la raiz o desde barrels publicos.
- Para cada componente, hook o utilidad, lee sus types/interfaces y distingue props custom de props heredadas.
- No listes cada prop heredada de Mantine. Indica que se consulte https://mantine.dev/llms.txt.
- Si una prop no puede confirmarse en codigo, no la inventes.
- Si un simbolo existe en `src` pero no esta exportado publicamente, mencionalo solo en una nota final de "No exportado" si es relevante.

Formato exacto:
- Usa Markdown ASCII.
- No uses tablas.
- No uses emojis.
- No uses espacios al final de linea.
- Usa exactamente un salto de linea en blanco entre bloques.
- No dejes lineas en blanco dentro de una ficha de componente, hook o utilidad.
- Ordena alfabeticamente los items dentro de cada seccion por nombre exportado.
- Mantiene nombres de secciones y orden exactamente como se indica abajo.
- Si una seccion no tiene items, escribe una unica linea: `No hay exports publicos documentables.`
- Cada bullet debe ser de una sola linea, salvo que el valor sea inevitablemente largo.

Estructura obligatoria:

# lkd-web-kit

**Version lkd-web-kit:** `<version>` | **Mantine core:** `<range>`

## Descripcion

Un parrafo breve que describa la libreria.

> **Referencia Mantine:** los componentes que extienden props de Mantine heredan su superficie nativa de props, variantes y comportamiento. Para consultar esas props heredadas y detalles de renderizado, usar https://mantine.dev/llms.txt.

## Inputs Genericos

Formato por componente:
- **`NombreExportado`**: descripcion breve.
  - Base: `ComponenteBase` o `N/A`.
  - Props custom: `prop: Tipo`, `otraProp?: Tipo`; si no agrega props propias, escribir `ninguna`.
  - Props heredadas: `Mantine <Nombre>Props`, `HTML <element>` o `N/A`.
  - Notas: comportamiento relevante en una frase, o `ninguna`.

## Componentes UI

Usa el mismo formato por componente de "Inputs Genericos".

## Formularios (React Hook Form)

Formato por componente:
- **`NombreExportado`**: descripcion breve.
  - Base: `ComponenteBase` o `withController(...)`.
  - Props custom: `prop: Tipo`, `otraProp?: Tipo`; si no agrega props propias, escribir `ninguna`.
  - Control: explica como se conecta con React Hook Form en una frase.
  - Notas: comportamiento relevante en una frase, o `ninguna`.

## Hooks

Formato por hook:
- **`nombreHook`**: descripcion breve.
  - Firma: `nombreHook(args): ReturnType`.
  - Parametros custom: `param: Tipo`, `otro?: Tipo`; si no aplica, escribir `ninguno`.
  - Retorno: descripcion breve.

## Utilidades

Formato por utilidad:
- **`nombreUtilidad`**: descripcion breve.
  - Firma: `nombreUtilidad(args): ReturnType` o `const nombre: Tipo`.
  - Entrada: descripcion breve, o `N/A`.
  - Salida: descripcion breve, o `N/A`.

## Constantes y Tipos

Formato:
- **`NombreExportado`**: descripcion breve.
  - Tipo: `type`, `interface`, `enum`, `const` o `namespace`.
  - Uso: descripcion breve.

## Notas de Uso

Lista numerada corta con reglas de consumo:
1. Importar desde la raiz del paquete: `import { FormTextInput, MySelect } from 'lkd-web-kit';`.
2. Usar componentes `Form*` solo dentro de formularios controlados por React Hook Form.
3. Consultar https://mantine.dev/llms.txt para props heredadas de Mantine.

## No Exportado

Incluye solo simbolos relevantes que existen en `src` pero no estan exportados publicamente. Si no hay casos relevantes, escribir `No hay simbolos relevantes no exportados.`
```

## Reglas de estabilidad de diff

- No reordenes secciones.
- No cambies titulos si no cambia esta guia.
- No agregues separadores horizontales.
- No cambies comillas simples por dobles dentro de ejemplos existentes salvo que el codigo fuente lo exija.
- Normaliza listas: cada item empieza con `- **\`Nombre\`**:`.
- Normaliza versiones: copiar exactamente el valor de `package.json`.
- Despues de regenerar, revisa `git diff -- docs/generated/lkd-web-kit.md` y elimina cambios que sean solo espacios, enters, reflow de texto o reordenamiento no justificado.

## Recomendaciones tecnicas

- Lee explicitamente interfaces como `FormTextInputProps`, `MyCheckboxGroupProps` o equivalentes antes de describir props.
- Considera `withController.tsx` como la pieza central para componentes `Form*`.
- Si el cambio viene de peer dependency breaking, documenta solo la nueva superficie publica resultante, no el historial de migracion.
- No dupliques estas reglas dentro de `AGENTS.md`; ese archivo debe delegar la documentacion detallada en `docs/generated/lkd-web-kit.md`.
