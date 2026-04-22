# Generador de `AGENTS.md` para Proyectos

Este documento provee el *prompt* estándar y las instrucciones necesarias para generar el archivo `AGENTS.md` en cualquier proyecto web nuevo o existente que utilice nuestra pila tecnológica corporativa (Next.js + `lkd-web-kit`). 

El objetivo es asegurar que todos los asistentes o Agentes de IA que operen en los distintos repositorios compartan las mismas consideraciones de arquitectura y reglas base de nuestra biblioteca interna de componentes.

## Instrucciones de Uso

Para generar o alinear el archivo `AGENTS.md` de un proyecto, copia todo el contenido que se encuentra debajo de la primera línea divisoria y entrégaselo a tu Agente IA (Gemini, Claude, Cursor, o GitHub Copilot) directamente dentro del workspace del proyecto en cuestión.

---

### Prompt para el Agente IA

Por favor, analiza la estructura de este proyecto y genera (o actualiza integralmente) el archivo `AGENTS.md` en la raíz del repositorio. Este archivo actuará como el reglamento obligatorio de arquitectura y código para todos los asistentes de IA, incluyéndome.

Utiliza el siguiente diagrama de información y estructura EXACTA para redactarlo:

#### 1. Reglas de Next.js (CRÍTICO Y OBLIGATORIO)
Al inicio del archivo debes colocar exactamente el siguiente tag sin alteraciones. Esto asegura que los agentes siempre lean la documentación fresquita de Next.js:

<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
<!-- END:nextjs-agent-rules -->

#### 2. Idioma de Respuesta (OBLIGATORIO)
Agrega una instrucción mandatoria: "El asistente DEBE responder siempre en español, independientemente del idioma en el que se le hable, manteniendo un tono técnico y profesional."

#### 3. Descripción del Proyecto
Crea una breve sección detallando qué aplicativo es y aclara que se usa Next.js (App Router) comunicándose con APIs externas.

#### 4. Stack Tecnológico y Reglas
Elabora un desglose respetando estos mandamientos:
* **Framework Core:** Next.js (v16+). Directivas `"use client"` únicamente donde se requiera, preferir Server Components y `server-only` para secretos.
* **Herramientas y Tooling:** TypeScript estricto (`.ts` y `.tsx`). PROHIBICIÓN ABSOLUTA de declarar y usar `any`.
* **UI y Estilos:** Se emplea Mantine v8 unificado con Tailwind CSS v4 y clsx. Se usan íconos de SVG importados como componentes.
* **Manejo de Estado:** React Query v5, Zustand v5 y Nuqs para inyectar/sincronizar el estado en los query params.
* **Formularios, Validación y Tablas:** React Hook Form con `zodResolver`. Prohibido definir mensajes de error textuales en el esquema (evitar usar `min(1, "Texto")`). Para tablas se usa @tanstack/react-table.
* **Fechas:** Obligatorio consumir utilidades internas de formateo (ej. desde `src/utils/date-format.ts`) en lugar de llamar directamente a `dayjs().format()`.
* **Rutas y Estructura:** Describe el árbol típico (app, components, services, hooks, utils, types).

#### 5. Consultas a la Biblioteca Interna y Local (OBLIGATORIO)
Agrega una regla explícita que instruya lo siguiente:
"Toda la base estructurada de componentes visuales, forms y modales reside en `lkd-web-kit`. Si este asistente quiere más información de la biblioteca interna, dependencias o properties de sus inputs, DEBE consultar obligatoriamente en: `/docs/lkd-web-kit.md`. 

**Para componentes UI específicos de este proyecto (Shared Local), el asistente DEBE consultar obligatoriamente en: `/docs/local-components.md` antes de crear algo nuevo.**"

#### 6. Estándar de Modales
Detalla el uso del manager global de modales atado a `lkd-web-kit`: Los modales se ubican en `src/components/modals/`, se envuelven con el HOC `withModalManager<Props>`, se registran bajo lazy load en un manager index y se deben invocar usando únicamente el Custom Hook centralizado (`useModalManager` con sus métodos `showModal` y `closeModal`).

#### 7. Arquitectura de Formularios
Aclara estas reglas vitales para todos los `forms`:
- La UI se consume del web-kit usando componentes como `<Form>`, `<FormTextInput>` o `<FormSubmitButtons>`.
- Deben inyectar siempre una property `mode` para discernir la vista ("create", "edit", "view") y bloquear la edición en caso de sólo lectura.
- Al manejar el `onSubmit`, si existe un error desde la API, DEBE hacerse `throw e;` en el `catch` después de mostrar la alerta para que el wrapper reaccione visualmente al estado rechazado.

#### 8. Caché y Datos de Servidor (Next.js)
Resume el flujo de los catálogos y traducciones: 
- Las peticiones son servidas globalmente y cacheadas (Revalidate On Year) en instancias como `fetchApiCache.ts`.
- REGLA CRÍTICA: Siempre que se invoque un `useApiData(...)` dentro de un Client Component, DEBE verificarse que la ruta primaria `page.tsx` posea este catálogo inyectado en un `loadApiData={[...]}`.

#### 9. Política de Reutilización y Ownership
Instruye al agente a no duplicar código y a buscar componentes/hooks existentes respetando esta jerarquía:
1. **`lkd-web-kit`**: Prioridad máxima. Para primitivas y bloques UI genéricos compartidos entre proyectos.
2. **Shared local** (ej. `src/components/ui`, `src/hooks`): Para lógica y componentes reutilizables a nivel global dentro de la misma app.
3. **Feature local**: Para UI y lógica estrictamente acoplada a una ruta. Si se vuelve reusable, debe promoverse a Shared o al kit.

#### 10. Colocation (App Router)
Define que el código privado de una ruta debe mantenerse junto a ella usando colocation. Evita enrutar lógica de uso compartido dentro de los segmentos de las vistas.

#### 11. Checklist de PR
Agrega reglas de higiene de código antes de finalizar un flujo:
- Justificar por qué se creó un componente nuevo si había algo similar.
- Confirmar pruebas mínimas.
- Documentar si se agregó deuda técnica.
- Actualizar el directorio `docs/` cuando cambien reglas de arquitectura.

#### 12. Análisis y Documentación de UI Local (INICIALIZACIÓN)
Instruye al agente a que, si el archivo no existe o está desactualizado, realice lo siguiente:
1. Analizar el directorio `src/components/ui` para identificar los componentes compartidos locales.
2. Crear o actualizar el archivo `/docs/local-components.md` (al mismo nivel que `lkd-web-kit.md`).
3. Documentar en dicho archivo cada componente local (props, propósito y ejemplo de uso) para que sirva como fuente de verdad de la capa *Shared Local*.

---

## Sobre el Flujo de Trabajo

Empleando este documento garantizas que la inteligencia artificial acate los detalles operativos que optimizan el rendimiento en Next.js (como el revalidate en servidor por un año) y previene errores tontos muy comunes en React (como tragar errores y crashear el spinner de botones al omitir el `throw e;`).
