# ¿Cómo regenerar autogenerar la documentación (lkd-web-kit.md)?

El archivo `docs/generated/lkd-web-kit.md` actúa como la principal fuente de verdad y referencia rápida generada de este paquete interno de UI. Actualmente, este documento es **construido (y reconstruido) mediante un flujo de trabajo asistido por IA** leyendo directamente la carpeta `src/`.

Si la estructura base de componentes de `lkd-web-kit` cambia dramáticamente (nuevos componentes `My*`, nuevos `Form*`, o nuevos `hooks`), no necesitas actualizar `lkd-web-kit.md` a mano componente por componente. Usa este proceso con tu agente de IA preferido para volver a generarlo.

## Flujo de Trabajo (Instrucciones para la IA o el Agente)

Puedes solicitar a un modelo o agente (como Gemini o Claude en Cursor) el siguiente *prompt* general dentro del proyecto:

```text
Por favor, analiza la carpeta `src` de este entorno. Específicamente, inspecciona:
1. `src/components`: Para listar todos los componentes generales (`My*`, genéricos, visuales, de navegación).
2. `src/form/base` y `src/form/utils`: Para los componentes form-controlled (`Form*`) y utilidades con Zod.
3. `src/hooks` y `src/utils`: Para los hooks personalizados y funciones auxiliares.

Con esta información, regenera y sobrescribe el documento en `docs/generated/lkd-web-kit.md` siguiendo este formato:
- Un título principal donde obligatoriamente leas el `package.json` de la raíz y escribas la versión actual del paquete (`lkd-web-kit`) en conjunto con la de `@mantine/core`.
- Un bloque inicial para la Descripción del Paquete.
- Una sección de "Inputs Genéricos" agrupando los componentes `My*`.
- Una sección separada para los componentes de la capa de UI.
- Una sección para "Formularios (React Hook Form)".
- Secciones para Hooks y Utilidades.

¡MUY IMPORTANTE!:
Por cada componente en la lista, debes observar sus types o interfaces. Haz una nota explícita breve sobre las 'custom props' definidas por nuestra librería. Y reitera (en la introducción de cada categoría o en los componentes que hereden props de Mantine), que el desarrollador consulte la URL del LLM base de la UI en: https://mantine.dev/llms.txt para ver las props heredadas y las particularidades de renderizado.
```

## Recomendaciones Técnicas

- Procura que el agente haga lecturas explícitas de las cabeceras e interfaces (e.g. `FormTextInputProps` o `MyCheckboxGroupProps`) para inferir adecuadamente las props expuestas y diferenciarlas así de las de Mantine.
- Este proceso preserva que la IA conozca los estándares nativos de `react-hook-form` gracias al HOC `withController.tsx`. No es necesario que liste _cada_ prop inherente si es manejada por Mantine.
- Si surge un conflicto durante la regeneración, simplemente utiliza un git diff o revisa el estado anterior desde tu control de versiones (`git restore docs/generated/lkd-web-kit.md`).
- **Nota Especial sobre AGENTS.md:** No dupliques ni agendes generar esta documentación a nivel de componentes dentro de `AGENTS.md`. Aquel archivo está reservado exclusivamente para la arquitectura general y delegará siempre en `lkd-web-kit.md` la información detallada que generes aquí.
