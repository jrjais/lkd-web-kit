# Navegación con prefijos y rutas activas

Registro: 2026-11-24T22:30:19-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; usuario SO hugo\hugos (whoami de sesión).

Implementado localmente en LKDDashboardLayout.Navbar y NavItems. El helper interno navigation-paths comparte el prefijado y la comparación por segmentos. Navbar admite pathPrefix, aplica el mismo prefijo a href y activePaths, evita duplicaciones y conserva la propagación de hijos activos. Ambos componentes admiten match exact/section por elemento; raíz exacta, query/hash ignorados al comparar, enlaces externos preservados. No se mutan los objetos originales.

Compatibilidad: activeStrategy equals/includes permanece; includes corrige su comparación invertida y ahora reconoce descendientes por segmentos. Los consumidores que dependían del marcado accidental pueden observar un cambio.

Validación: 46 pruebas aprobadas en 3 archivos, incluyendo rutas localizadas, raíz, enlaces ya prefijados, activePaths, hijos activos, enlaces externos, coincidencia exacta y overrides explícitos de isActive. npm run build completado (TypeScript y bundles). Sin prueba visual en navegador: el cambio de lógica se verificó con pruebas de DOM y helpers.

Documentación: catálogo y skill distribuida actualizados. No se modificó AEstrenar. Versión 0.12.4 conservada; sin commit ni publicación. La publicación y adopción quedan fuera de esta entrega.

[Plan y criterios](../planes-pendientes/2026-11-24-navigation-path-prefix.md).

Actualización: usuario aprobó y solicitó publicar 0.12.5; quedan supersedidas las restricciones históricas de no publicar/commitear el kit. AEstrenar debe seguir sin commits. [Release](../planes-ejecutados/2026-11-24-publicar-0-12-5.md). Registro: 2026-11-24T22:40:32-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; hugo\hugos (whoami).
