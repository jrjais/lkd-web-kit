# lkd-web-kit - AI Agent Instructions

Este archivo provee el contexto fundacional sobre la estructura, dependencias y arquitectura general del paquete `lkd-web-kit`.

## 📦 Acerca del Proyecto
`lkd-web-kit` es una librería interna de componentes de UI y lógica estándar para acelerar el desarrollo corporativo en React. Depende de las siguientes tecnologías clave:
- **Mantine (v8):** Librería UI base del sistema de diseño gráfico subyacente.
- **React Hook Form:** Para el manejo global y performante del estado interno de los formularios.
- **Zod:** Para validación fuertemente tipada y estructuración de esquemas de datos.
- **React Query + Ky:** Ecosistema adoptado para fetching asíncrono y control de caché/estado de peticiones.

## 🏗️ Estructura del Código
La arquitectura se divide principalmente en:
- `src/components`: Envolturas (wrappers) de los correspondientes inputs de Mantine (indicados con el prefijo `My`) y otros componentes modulares netamente visuales (e.g. NavItems, states vacíos).
- `src/form`: Componentes form-controlled estrictos (prefijados con `Form*`) que delegan su control a un HOC específico (`withController`) atado a *React Hook Form*. Las lógicas de entrada que muten un `form` deben consumirse únicamente desde aquí.
- `src/hooks` y `src/utils`: Helpers y ganchos reutilizables globalmente (paginaciones asíncronas, query mappings, listeners de media queries).
- `src/mantine`: Integración del tema base, tokens gráficos y unificación de paletas estandarizadas.

## 📚 Catálogo y Documentación de Componentes
Si necesitas conocer en mayor profundidad los componentes existentes, qué *custom props* implementa cada uno, y su respectiva clasificación funcional, **DEBES CONSULTAR** obligatoriamente el documento final de la librería:
> **Documento Autogenerado:** `docs/generated/lkd-web-kit.md`

Este documento actúa como la **única fuente de verdad** (Source of Truth) de la biblioteca. En él también hallarás el enlace directo para analizar qué *props* y variantes heredan estos componentes nativamente desde el ecosistema Mantine (`https://mantine.dev/llms.txt`).

**🚨 Reglas Críticas:** 
Al operar como Agente de IA, no declares funciones superpuestas y confía en el enrutamiento centralizado del _design-system_. Realiza todas las importaciones limpias desde la base del paquete (`import { FormTextInput, MySelect } from 'lkd-web-kit';`).
