<!-- BEGIN:codex-architecture-baseline -->
# Arquitectura del Proyecto

Este documento describe la arquitectura actual y objetivo del proyecto. Debe mantenerse actualizado ante cambios de frontera, datos, contratos, deploy o responsabilidades.

## Resumen

- Proyecto: $project
- Tipo estimado: $kind
- Ruta local: $checkout
- Estado: completar con el estado funcional y tecnico vigente.

## Mapa de sistemas

Completar y mantener actualizado:

- Frontend: pendiente de completar
- Backend/API: pendiente de completar
- Jobs/workers/syncs: pendiente de completar
- Base de datos principal: pendiente de completar
- Storage/archivos: pendiente de completar
- Servicios externos: pendiente de completar
- Ambientes: DEV / STAGING / PROD segun aplique

## Principios de arquitectura

- Usar Clean Architecture como patron preferido cuando aplique.
- Dominio y casos de uso no deben depender de frameworks, UI, DB ni proveedores externos.
- Infraestructura implementa puertos/adaptadores para DB, APIs externas, storage, auth, colas y logs.
- La capa de presentacion debe orquestar entradas/salidas, no contener reglas de negocio complejas.
- El frontend no debe tocar directamente la base de datos.
- Las integraciones entre sistemas internos deben hacerse por APIs, eventos, colas o contratos explicitos.
- Cada sistema debe tener fronteras claras de ownership de datos.
- Los procesos batch deben ser auditables, reintentables e idempotentes.

## Capas sugeridas

`	ext
Presentacion / API / UI
  -> Casos de uso / Aplicacion
    -> Dominio
    -> Puertos
      -> Adaptadores de infraestructura
        -> DB / APIs externas / Storage / Auth / Jobs
`

Adaptar nombres al framework real del proyecto, conservando la separacion conceptual.

## Fronteras de responsabilidad

### Responsabilidades de este proyecto

- Completar.

### No responsabilidades

- Completar.

### Ownership de datos

- Fuente canonica de: completar.
- Consume datos de: completar.
- Publica hacia: completar.
- Reglas de escritura: evitar escrituras directas en bases de otros sistemas; preferir APIs, colas, jobs o contratos explicitos.

## Configuracion runtime y secretos

- Secretos locales compartidos: C:\Repos\.env.
- Variables del servidor: proveedor de deploy, secret manager o runtime config seguro.
- No commitear secretos.
- No duplicar secretos en documentacion.

## Documentacion

La documentacion vive en docs/:

- docs/README.md
- docs/funcional/
- docs/planes-ejecutados/
- docs/planes-pendientes/
- docs/backlog.md
- docs/decisiones/
- docs/runbooks/

## Riesgos y deuda tecnica

- Completar durante el relevamiento inicial del proyecto.
<!-- END:codex-architecture-baseline -->