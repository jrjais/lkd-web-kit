# Upgrade v0.12.1 to v0.12.2

## Resumen

- Patch solicitado por el usuario con actualización de peers estables auditados.
- No hay cambios de API pública detectados en el kit; se mantienen imports, exports y props propias.
- Se elevan mínimos peer. Mantener alineadas las familias Mantine, React/React DOM y Next cuando haya paquetes auxiliares.
- Revisar cambios heredados de Select, Ky y Zod; validar formularios y navegación del consumidor.

## Dependencias a actualizar

- `lkd-web-kit`: `0.12.2`
- `@mantine/core`: `^9.7.3`
- `@mantine/dates`: `^9.7.3`
- `@mantine/hooks`: `^9.7.3`
- `@mantine/notifications`: `^9.7.3`
- `@tanstack/react-query`: `^5.104.5`
- `@tanstack/react-table`: `^9.3.1`
- `@tanstack/react-virtual`: `^3.14.21`
- `ky`: `^2.2.0`
- `next`: `^16.4.2`
- `react`: `^19.3.1`
- `react-dom`: `^19.3.1`
- `react-hook-form`: `^7.90.0`
- `zod`: `^4.6.7`

Peers sin cambios: `clsx` `^2.1.1`, `dayjs` `^1.11.23` y `react-query-kit` `^3.4.0`.

## Cambios de API o comportamiento

No hay cambios de API pública detectados.

Antes: mismos componentes, props propias y utilidades del kit sobre peers anteriores. Después: mismos exports con tipos y correcciones de las dependencias actualizadas. Acción requerida: instalar peers compatibles y revisar los casos siguientes; no renombrar imports ni agregar wrappers.

## Cambios requeridos por dependencias peer

- Mantine Select corrige el segundo argumento de onChange para admitir null. Revisar callbacks que desestructuren option sin comprobarlo. MySelect/FormSelect heredan el tipo.
- Ky normaliza a minúsculas los headers de hooks init, valida opciones y pasa errores de lectura del body por beforeError. Usar claves de headers en minúsculas y no suponer que todo error es HTTPError. addBodyJsonHook ya comprueba isHTTPError.
- Zod rechaza colecciones que exceden max/length antes de validar elementos y refinamientos posteriores. Revisar dependencias de errores por elemento o efectos secundarios en refinamientos.
- React Hook Form corrige Controller tras reset, useWatch con Activity y suscripciones. TanStack actualiza suscripciones y virtualización. No se detectaron migraciones adicionales necesarias en el kit.
- Next 16.4.2 incluye correcciones de seguridad de 16.4.1 y fixes de Turbopack. Revisar el build de cada consumidor.
- Alinear también paquetes Mantine y auxiliares Next instalados por la aplicación, aunque no sean peers directos del kit.

## Prompt para IA del proyecto consumidor

```text
Lee AGENTS.md, package.json, lockfile, documentación local y esta guía completa.
Actualiza lkd-web-kit a 0.12.2 y todos sus peers a los rangos indicados arriba.
Alinea la familia Mantine y los paquetes auxiliares Next existentes sin introducir dependencias nuevas.
Busca con rg callbacks Select.onChange, hooks init/beforeError de Ky y schemas de colecciones Zod max/length/refine.
Adapta únicamente usos afectados por los cambios descritos, conservando las APIs públicas del kit.
Ejecuta npm install y npx lkd-install-agent-skills; revisa el diff de las skills y actualiza la documentación local.
Ejecuta npm run lint, npm run test y npm run build; informa fallos previos y limitaciones reales.
Reporta archivos modificados, versiones instaladas, validaciones y bloqueos.
Respeta las instrucciones del usuario sobre commits, ramas, push y deploy.
```

Auditoría detallada y fuentes: [actualización de peers](../../planes-ejecutados/2026-10-20-actualizar-peer-dependencies.md).
