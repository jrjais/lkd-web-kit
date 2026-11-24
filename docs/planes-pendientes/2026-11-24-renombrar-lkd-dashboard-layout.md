# Renombrar DashboardLayout a LKDDashboardLayout

Registro: 2026-11-24T14:52:00-04:00 (America/La_Paz). Autor: Codex/OpenAI, modelo no verificado; usuario hugo\hugos (fuente: whoami de la sesión).

Alcance: componente público, tipos y subcomponentes asociados, contexto, rutas de fuente, exportaciones, tests, catálogo y skill distribuida. DashboardPage, DashboardTitle y DashboardNavItem/Section conservan sus nombres.

Cambio incompatible de API: no conservar alias DashboardLayout. Mantine debe registrar defaults con LKDDashboardLayout; actualizar también displayName y mensajes de contexto. Conservar comportamiento y estilos actuales.

No modificar versión 0.12.3, publicar paquete, pushear ni desplegar. Dejar cambios locales para revisión. AEstrenar conserva su dependencia instalada hasta una futura publicación.

Aceptación: export nuevo disponible, sin nombres antiguos en la fuente activa, tests del dashboard, tipos y build correctos. Actualizar documentación de migración pendiente sin reescribir guías históricas publicadas.

Registro: 2026-11-24T14:53:40-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; usuario hugo\hugos (fuente: whoami de la sesión).

Implementación local terminada; ver [ejecución](../planes-ejecutados/2026-11-24-renombrar-lkd-dashboard-layout.md). Publicación y adopción en consumidores fuera del alcance actual.

## API configurable y composición explícita

Registro: 2026-11-24T15:00:11-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; hugo\hugos (whoami de la sesión).

Pedido ampliado: header 56 px y navbar 200 px por defecto, dimensiones configurables desde AppShell, breakpoint compartido con burgers, burgerProps visuales protegidos, colores del tema y composición única. Quitar slots automáticos de la raíz y migrar ejemplos/tests. Riesgos: cambio incompatible en raíz y estados responsive. Aceptación: tests de medidas, breakpoint y toggles, tipo/build y suite. Sin publicación ni versión nueva; AEstrenar se migrará al adoptar la futura versión.

Registro: 2026-11-24T15:03:35-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; hugo\hugos (whoami de la sesión).

API configurable implementada y validada: 17 tests, tipos/build y Biome correctos. Publicación y adopción en AEstrenar siguen fuera de alcance.

Registro: 2026-11-24T15:17:10-04:00 (America/La_Paz). Autor: Codex/OpenAI, modelo no verificado; usuario hugo\hugos (fuente: whoami).

El usuario autoriza publicar el patch 0.12.4; [registro de release](../planes-ejecutados/2026-11-24-publicar-0-12-4.md). Se reemplaza la restricción anterior de no publicar el kit. AEstrenar se adapta sin commits.
