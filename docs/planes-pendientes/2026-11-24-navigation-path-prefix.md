# Navegación con prefijos y coincidencia compartida

Registro: 2026-11-24T22:26:19-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; hugo\hugos (whoami de sesión).

Alcance: pathPrefix en LKDDashboardLayout.Navbar, prefijado consistente de href/activePaths, comparación por segmentos compartida con NavItems y match exact/section por elemento. Conservar activeStrategy equals/includes como API existente de NavItems; corregir includes invertido.

Casos: idioma explícito, links ya prefijados sin duplicación, raíz exacta, barras finales, query/hash ignorados sólo al comparar, enlaces externos sin prefijar ni activar automáticamente, hijos activos y cierre mobile. No mutar los objetos de navegación del consumidor.

Riesgos: consumidores que dependan del includes textual anterior y del marcado accidental de Inicio en descendientes. Documentar el cambio de comportamiento. Criterios: pruebas de helpers y componentes, lint/tipos/build. Sin modificar versión, publicar, commitear ni cambiar AEstrenar.

Implementación y criterios técnicos verificados; pendiente revisión del usuario. [Resultado](../planes-ejecutados/2026-11-24-navigation-path-prefix.md).

Actualización: usuario aprobó y solicitó publicar 0.12.5; quedan supersedidas las restricciones históricas de no publicar/commitear el kit. AEstrenar debe seguir sin commits. [Release](../planes-ejecutados/2026-11-24-publicar-0-12-5.md). Registro: 2026-11-24T22:40:32-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; hugo\hugos (whoami).
