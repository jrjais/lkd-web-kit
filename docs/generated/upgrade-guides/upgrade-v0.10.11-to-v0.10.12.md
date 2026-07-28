# Upgrade v0.10.11 to v0.10.12

## Resumen

- Agrega utilidades publicas de formato de fechas exportadas desde `lkd-web-kit`.
- Declara `dayjs` como peer dependency requerida por esas utilidades.
- Es un cambio patch compatible; no elimina ni renombra APIs existentes.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.12`
- `dayjs`: `^1.11.13`

Peers relevantes sin cambios:

- `react`: `^19.2.8`
- `react-dom`: `^19.2.8`
- `next`: `^16.2.12`
- `@mantine/core`: `^9.5.0`
- `@mantine/dates`: `^9.5.0`
- `zod`: `^4.4.3`

## Cambios de API o comportamiento

- Antes: los consumidores que necesitaban formatear fechas debian mantener helpers locales, por ejemplo `src/utils/date-format.ts`.
- Despues: `lkd-web-kit` exporta `toInputDateFormat`, `toInputDateTimeFormat`, `toInputDateMonthFormat`, `toApiDateTimeFormat`, `toApiDateFormat`, `toApiDateMonthFormat`, `toDisplayDateFormat`, `toDisplayMonthFormat` y `toDisplayDateTimeFormat`.
- Accion requerida en consumidores: actualizar imports para usar `lkd-web-kit` donde corresponda y evitar duplicar helpers locales.

## Cambios requeridos por dependencias peer

`dayjs` debe estar instalado en el proyecto consumidor porque ahora es peer dependency explicita. No se esperan cambios adicionales por React, Mantine, Next, Zod, React Hook Form, TanStack o Ky.

## Prompt para IA del proyecto consumidor

```text
Lee package.json, lockfile, AGENTS.md y la documentacion local del proyecto.

Actualiza lkd-web-kit a 0.10.12 y asegura que dayjs cumpla ^1.11.13.

Busca imports/usos afectados con rg, especialmente helpers locales de formato de fechas como src/utils/date-format.ts y llamadas a toInputDateFormat, toInputDateTimeFormat, toInputDateMonthFormat, toApiDateTimeFormat, toApiDateFormat, toApiDateMonthFormat, toDisplayDateFormat, toDisplayMonthFormat y toDisplayDateTimeFormat.

Aplica estos cambios de API:
- Si el proyecto importa esos helpers desde un archivo local duplicado, cambia el import a lkd-web-kit.
- Si el helper local ya no tiene usos, eliminalo.
- No cambies formatos ni comportamiento salvo que la guia lo indique.

Ejecuta npm install, npm run lint, npm run test y npm run build.

Reporta cambios aplicados, archivos modificados, validaciones ejecutadas y bloqueos.
```
