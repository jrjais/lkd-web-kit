# Generador de `AGENTS.md` para Proyectos

Este documento provee el prompt estandar y las instrucciones necesarias para generar el archivo `AGENTS.md` en cualquier app web nueva o existente que utilice nuestra pila tecnologica corporativa (Next.js + `lkd-web-kit`).

El objetivo es asegurar que todos los asistentes o agentes de IA que operen en los distintos repositorios compartan las mismas consideraciones de arquitectura y reglas base de nuestra biblioteca interna de componentes.

## Instrucciones de Uso

Para generar o alinear el archivo `AGENTS.md` de una app, copia todo el contenido que se encuentra debajo de la primera linea divisoria y entregaselo a tu agente IA (Gemini, Claude, Cursor o GitHub Copilot) directamente dentro del workspace del proyecto en cuestion.

En monorepos, el workspace puede ser la raiz del monorepo o la carpeta de una app. El prompt debe detectar la app objetivo y trabajar dentro de ella.

---

### Prompt para el Agente IA

Por favor, analiza la estructura de este workspace y genera (o actualiza integralmente) el archivo `AGENTS.md` en la raiz de la app Next.js objetivo. Este archivo actuara como el reglamento obligatorio de arquitectura y codigo para todos los asistentes de IA, incluyendome.

Antes de escribir, determina si el workspace es un monorepo:

1. Busca apps Next.js por `package.json`, `next.config.*`, `src/app` o `app`.
2. Si el workspace ya es una app Next.js, usa su raiz como app objetivo.
3. Si el workspace es monorepo y hay una sola app Next.js clara, usa la raiz de esa app.
4. Si el workspace es monorepo y hay varias apps Next.js posibles, pide confirmacion al usuario antes de crear o actualizar archivos.

Todas las referencias a `docs/`, `/docs/lkd-web-kit.md` o `/docs/local-components.md` en este prompt significan la carpeta `docs` dentro de la app objetivo. No uses ni crees la carpeta `docs` de la raiz del monorepo salvo que esa raiz sea tambien la app Next.js objetivo.

Utiliza el siguiente diagrama de informacion y estructura EXACTA para redactarlo:

#### 1. Reglas de Next.js (CRITICO Y OBLIGATORIO)
Al inicio del archivo debes colocar exactamente el siguiente tag sin alteraciones. Esto asegura que los agentes siempre lean la documentacion actual de Next.js:

<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated -- the docs are the source of truth.
<!-- END:nextjs-agent-rules -->

#### 2. Idioma de Respuesta (OBLIGATORIO)
Agrega una instruccion mandatoria: "El asistente DEBE responder siempre en espanol, independientemente del idioma en el que se le hable, manteniendo un tono tecnico y profesional."

#### 3. Descripcion del Proyecto
Crea una breve seccion detallando que aplicativo es y aclara que se usa Next.js (App Router) comunicandose con APIs externas.

#### 4. Stack Tecnologico y Reglas
Elabora un desglose respetando estos mandamientos:
* **Framework Core:** Next.js (v16+). Directivas `"use client"` unicamente donde se requiera, preferir Server Components y `server-only` para secretos.
* **Herramientas y Tooling:** TypeScript estricto (`.ts` y `.tsx`). PROHIBICION ABSOLUTA de declarar y usar `any`.
* **UI y Estilos:** Se emplea Mantine v8 unificado con Tailwind CSS v4 y clsx. Se usan iconos de SVG importados como componentes.
* **Manejo de Estado:** React Query v5, Zustand v5 y Nuqs para inyectar/sincronizar el estado en los query params.
* **Formularios, Validacion y Tablas:** React Hook Form con `zodResolver`. Prohibido definir mensajes de error textuales en el esquema (evitar usar `min(1, "Texto")`). Para tablas se usa @tanstack/react-table.
* **Fechas:** Obligatorio consumir utilidades internas de formateo (ej. desde `src/utils/date-format.ts`) en lugar de llamar directamente a `dayjs().format()`.
* **Rutas y Estructura:** Describe el arbol tipico (app, components, services, hooks, utils, types).

#### 5. Consultas a la Biblioteca Interna y Local (OBLIGATORIO)
Agrega una regla explicita que instruya lo siguiente:
"Toda la base estructurada de componentes visuales, forms y modales reside en `lkd-web-kit`. Si este asistente quiere mas informacion de la biblioteca interna, dependencias o properties de sus inputs, DEBE consultar obligatoriamente en: `docs/lkd-web-kit.md` dentro de la app objetivo.

**Para componentes UI especificos de este proyecto (Shared Local), el asistente DEBE consultar obligatoriamente en: `docs/local-components.md` dentro de la app objetivo antes de crear algo nuevo.**"

#### 6. Estandar de Modales
Detalla el uso del manager global de modales atado a `lkd-web-kit`: Los modales se ubican en `src/components/modals/`, se envuelven con el HOC `withModalManager<Props>`, se registran bajo lazy load en un manager index y se deben invocar usando unicamente el Custom Hook centralizado (`useModalManager` con sus metodos `showModal` y `closeModal`).

#### 7. Arquitectura de Formularios
Aclara estas reglas vitales para todos los `forms`:
- La UI se consume del web-kit usando componentes como `<Form>`, `<FormTextInput>` o `<FormSubmitButtons>`.
- Deben inyectar siempre una property `mode` para discernir la vista ("create", "edit", "view") y bloquear la edicion en caso de solo lectura.
- Al manejar el `onSubmit`, si existe un error desde la API, DEBE hacerse `throw e;` en el `catch` despues de mostrar la alerta para que el wrapper reaccione visualmente al estado rechazado.

#### 8. Cache y Datos de Servidor (Next.js)
Resume el flujo de los catalogos y traducciones:
- Las peticiones son servidas globalmente y cacheadas (Revalidate On Year) en instancias como `fetchApiCache.ts`.
- REGLA CRITICA: Siempre que se invoque un `useApiData(...)` dentro de un Client Component, DEBE verificarse que la ruta primaria `page.tsx` posea este catalogo inyectado en un `loadApiData={[...]}`.

#### 9. Politica de Reutilizacion y Ownership
Instruye al agente a no duplicar codigo y a buscar componentes/hooks existentes respetando esta jerarquia:
1. **`lkd-web-kit`**: Prioridad maxima. Para primitivas y bloques UI genericos compartidos entre proyectos.
2. **Shared local** (ej. `src/components/ui`, `src/hooks`): Para logica y componentes reutilizables a nivel global dentro de la misma app.
3. **Feature local**: Para UI y logica estrictamente acoplada a una ruta. Si se vuelve reusable, debe promoverse a Shared o al kit.

#### 10. Colocation (App Router)
Define que el codigo privado de una ruta debe mantenerse junto a ella usando colocation. Evita enrutar logica de uso compartido dentro de los segmentos de las vistas.

#### 11. Checklist de PR
Agrega reglas de higiene de codigo antes de finalizar un flujo:
- Justificar por que se creo un componente nuevo si habia algo similar.
- Confirmar pruebas minimas.
- Documentar si se agrego deuda tecnica.
- Actualizar el directorio `docs/` de la app objetivo cuando cambien reglas de arquitectura.

#### 12. Analisis y Documentacion de UI Local (INICIALIZACION)
Instruye al agente a que, si el archivo no existe o esta desactualizado, realice lo siguiente:

1. Analizar `src/components/ui` dentro de la app objetivo para identificar los componentes compartidos locales.
2. Crear o actualizar `docs/local-components.md` dentro de la app objetivo, al mismo nivel que `docs/lkd-web-kit.md`.
3. Documentar solo componentes Shared Local reales. No documentar componentes privados de rutas ni simbolos que no existan.
4. Leer los types/interfaces del componente antes de describir props. Si una prop no puede confirmarse en codigo, no inventarla.
5. No listar props heredadas de Mantine; indicar que se consulte https://mantine.dev/llms.txt.

Formato exacto para `docs/local-components.md`:

```md
# Componentes Locales (Shared Local)

Este documento lista los componentes compartidos propios de esta app. Antes de crear un componente nuevo, revisar primero `lkd-web-kit` y luego esta capa local.

> Referencia Mantine: los componentes que extienden props de Mantine heredan su superficie nativa de props, variantes y comportamiento. Para consultar props heredadas y detalles de renderizado, usar https://mantine.dev/llms.txt.

## Componentes UI

- **`NombreComponente`**: descripcion breve.
  - Base: `ComponenteBase` o `N/A`.
  - Props custom: `prop: Tipo`, `otraProp?: Tipo`; si no agrega props propias, escribir `ninguna`.
  - Props heredadas: `Mantine <Nombre>Props`, `HTML <element>` o `N/A`.
  - Notas: comportamiento relevante en una frase, o `ninguna`.
  - Ejemplo: `import NombreComponente from "src/components/ui/NombreComponente";`

## Hooks Locales

- **`useNombreHook`**: descripcion breve.
  - Firma: `useNombreHook(args): ReturnType`.
  - Parametros custom: `param: Tipo`, `otro?: Tipo`; si no aplica, escribir `ninguno`.
  - Retorno: descripcion breve.
  - Ejemplo: `const value = useNombreHook();`

## Utilidades Locales

- **`nombreUtilidad`**: descripcion breve.
  - Firma: `nombreUtilidad(args): ReturnType` o `const nombre: Tipo`.
  - Entrada: descripcion breve, o `N/A`.
  - Salida: descripcion breve, o `N/A`.
  - Ejemplo: `const value = nombreUtilidad(input);`

## No Documentado

Incluye solo componentes relevantes encontrados en `src/components/ui` que no pudieron documentarse por falta de tipos claros. Si no hay casos, escribir `No hay componentes locales pendientes de documentar.`
```

Reglas de formato para `docs/local-components.md`:
- Usar Markdown ASCII.
- No usar tablas.
- No usar emojis.
- No usar espacios al final de linea.
- Usar exactamente un salto de linea en blanco entre bloques.
- No dejar lineas en blanco dentro de una ficha.
- Ordenar alfabeticamente los items dentro de cada seccion por nombre exportado.
- Si una seccion no tiene items, escribir una unica linea: `No hay items documentables.`
- Cada bullet debe ser de una sola linea, salvo que el valor sea inevitablemente largo.
- Despues de regenerar, revisar `git diff -- docs/local-components.md` dentro de la app objetivo y eliminar cambios que sean solo espacios, enters, reflow de texto o reordenamiento no justificado.

---

## Sobre el Flujo de Trabajo

Empleando este documento garantizas que la inteligencia artificial acate los detalles operativos que optimizan el rendimiento en Next.js (como el revalidate en servidor por un ano) y previene errores comunes en React (como tragar errores y crashear el spinner de botones al omitir el `throw e;`).
