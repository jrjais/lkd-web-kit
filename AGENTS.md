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

## Skills de agentes
- `src/distributed-skills`: skills públicas que se empaquetan e instala `lkd-install-agent-skills` en los proyectos consumidores.
- `.agents/skills`: skills internas para desarrollar, mantener y publicar `lkd-web-kit`; no se empaquetan ni se instalan en consumidores.

## 📚 Catálogo y Documentación de Componentes
Si necesitas conocer en mayor profundidad los componentes existentes, qué *custom props* implementa cada uno, y su respectiva clasificación funcional, **DEBES CONSULTAR** obligatoriamente el documento final de la librería:
> **Documento Autogenerado:** `docs/generated/lkd-web-kit.md`

Este documento actúa como la **única fuente de verdad** (Source of Truth) de la biblioteca. En él también hallarás el enlace directo para analizar qué *props* y variantes heredan estos componentes nativamente desde el ecosistema Mantine (`https://mantine.dev/llms.txt`).

**🚨 Reglas Críticas:** 
Al operar como Agente de IA, no declares funciones superpuestas y confía en el enrutamiento centralizado del _design-system_. Realiza todas las importaciones limpias desde la base del paquete (`import { FormTextInput, MySelect } from 'lkd-web-kit';`).

<!-- BEGIN:codex-governance -->
# AGENTS.md

Este archivo es el contrato operativo para asistentes de IA y colaboradores que trabajen en este repositorio.

## Proyecto

- Nombre: $project
- Tipo estimado: $kind
- Ruta local: $checkout

## Forma de trabajo obligatoria

- Responder en espanol, con foco practico y tecnico.
- Antes de tocar codigo, revisar git status, rama actual, remotos y cambios locales existentes.
- Todo hilo de Codex que vaya a modificar codigo debe crear una rama propia antes de editar.
- No trabajar directo sobre main, master o develop salvo hotfix explicito autorizado.
- Nombre sugerido de rama: codex/YYYY-MM-DD-descripcion-corta.
- Trabajar, commitear y pushear solo cambios intencionales de esa rama.
- Abrir PR hacia la rama correspondiente (develop si aplica; si no, main).
- No mergear sin revision o aprobacion del usuario.
- No revertir cambios ajenos ni limpiar el worktree sin aprobacion explicita.
- Si el usuario pide analisis o dice que no se toque codigo, trabajar en modo solo lectura hasta nueva instruccion.

## Arquitectura y fronteras

- Preferir Clean Architecture cuando el stack y el tamano del proyecto lo permitan.
- Separar dominio, casos de uso, adaptadores de infraestructura y capa de presentacion/API.
- Evitar que UI, rutas o controllers contengan reglas de negocio complejas.
- No acceder directamente a la base de datos desde el frontend.
- El frontend debe consumir APIs o Server Actions controladas por el backend cuando aplique.
- Las integraciones con terceros deben quedar encapsuladas en servicios/adaptadores dedicados.
- Las escrituras entre sistemas deben hacerse por API, colas, jobs o contratos explicitos; evitar escribir directo en bases de otros sistemas.
- Todo proceso batch/sync debe ser idempotente o tener claves claras para evitar duplicados.

## Documentacion obligatoria

Todos los proyectos deben tener carpeta docs/ con esta estructura minima:

- docs/README.md: indice de documentacion funcional y tecnica.
- docs/funcional/: reglas de negocio, pantallas y flujos.
- docs/planes-ejecutados/: planes aplicados, alcance, evidencia y resultado.
- docs/planes-pendientes/: planes propuestos o aprobados aun no ejecutados.
- docs/backlog.md: tareas pendientes, deuda tecnica y riesgos.
- docs/decisiones/: decisiones relevantes de arquitectura o negocio.
- docs/runbooks/: operacion, deploy, incidentes, jobs, backups y verificaciones.

Actualizar documentacion cuando cambien reglas funcionales, contratos, fronteras, datos, deploy o configuracion.

## Seguridad y secretos

- No commitear tokens, passwords, connection strings, API keys ni secretos.
- No imprimir secretos en logs, documentacion, outputs ni mensajes.
- Los secretos locales compartidos entre proyectos deben guardarse y mantenerse bajo C:\Repos\.env.
- C:\Repos\.env es fuente local operativa para Codex/desarrollo; los servidores deben recibir secretos mediante variables de entorno, secret managers o configuracion runtime segura.
- Si un secreto falta, documentar el nombre esperado y donde debe cargarse, sin inventar ni exponer valores.

## Verificacion

Usar la verificacion mas cercana al riesgo del cambio:

- cambios chicos: lint, typecheck o test focalizado;
- cambios de dominio/API: tests de casos de uso, contrato o integracion;
- cambios de UI: verificacion en navegador cuando el flujo lo requiera;
- cambios de deploy/config: comprobar ambiente real, version activa, logs o healthchecks;
- cambios de datos: relectura de la fuente final visible para el sistema consumidor.
<!-- END:codex-governance -->
