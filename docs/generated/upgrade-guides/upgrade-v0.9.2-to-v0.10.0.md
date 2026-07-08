# Upgrade v0.9.2 to v0.10.0

## Resumen

- Se agrega `ModalManagerProvider` y `useModalManager` a `lkd-web-kit` para centralizar la logica reusable del modal manager.
- Se agrega tipado extensible por proyecto mediante module augmentation de `ModalManagerRegistryOverride`, siguiendo el patron de Mantine.
- Se agregan tipos publicos para registros de modales: `ModalRegistryItem`, `ModalRegistryRecord`, `ModalRegistry`, `ModalKey`, `ModalManagerProviderProps` y `ShowModalOptions`.
- Riesgo esperado: bajo a medio. No cambia el HOC `withModalManager`, pero los consumidores que migren su modal manager local deben pasar el registro runtime al provider y declarar el override de tipos.

## Dependencias a actualizar

- `lkd-web-kit`: `0.10.0`

Peers relevantes sin cambios esperados:
- `@mantine/core`: `^9.4.1`
- `@mantine/dates`: `^9.4.1`
- `@mantine/hooks`: `^9.4.1`
- `@mantine/notifications`: `^9.4.1`
- `@tanstack/react-query`: `^5.101.2`
- `@tanstack/react-virtual`: `^3.14.4`
- `next`: `^16.2.9`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-hook-form`: `^7.80.0`
- `zod`: `^4.4.3`

## Cambios de API o comportamiento

Antes: cada consumidor mantenia su propio contexto de modal manager o una factory local para conectar el registro de modales.

Despues: `lkd-web-kit` exporta un modal manager global reusable. El consumidor pasa el registro runtime al provider y extiende el tipo del registro con module augmentation.

Accion requerida en consumidores que quieran migrar al nuevo modal manager:

```tsx
import {
  ModalManagerProvider as LkdModalManagerProvider,
  useModalManager,
  type ModalManagerProviderProps,
} from "lkd-web-kit";
import { dynamicModals } from "src/components/modals";

export const ModalManagerProvider = ({
  children,
  loadModals,
}: Omit<ModalManagerProviderProps, "modals">) => (
  <LkdModalManagerProvider modals={dynamicModals} loadModals={loadModals}>
    {children}
  </LkdModalManagerProvider>
);

export { useModalManager };
```

Declarar el override de tipos en un archivo `.d.ts` dedicado:

```ts
import "lkd-web-kit";

declare module "lkd-web-kit" {
  interface ModalManagerRegistryOverride {
    modals: typeof import("src/components/modals").dynamicModals;
  }
}
```

El registro de modales debe usar `ModalRegistryItem<Props>` y puede exponer `load` para precarga por `loadModals`:

```ts
const dynamicModal = <T extends object>(path: string): ModalRegistryItem<T> => ({
  component,
  load,
  path,
});
```

No hay cambios requeridos para consumidores que sigan usando solo componentes, formularios, hooks o utilidades existentes de `lkd-web-kit`.

## Cambios requeridos por dependencias peer

No hay cambios esperados por peers. Los rangos de React, Next.js, Mantine, Zod, React Hook Form, TanStack, Ky y dependencias relacionadas se mantienen sin cambios.

## Prompt para IA del proyecto consumidor

Lee `AGENTS.md`, `package.json`, el lockfile y la documentacion local del proyecto consumidor. Actualiza `lkd-web-kit` a `0.10.0` sin cambiar peers salvo que el proyecto ya requiera otra actualizacion. Busca usos relacionados con modales con `rg "ModalManager|useModalManager|showModal|loadModals|withModalManager|dynamicModals" src docs`. Si el proyecto tiene un modal manager local, migralo al `ModalManagerProvider` y `useModalManager` exportados por `lkd-web-kit`, pasando el registro runtime con `modals={dynamicModals}`. Agrega un archivo `.d.ts` dedicado con module augmentation de `ModalManagerRegistryOverride` para que `showModal` autocomplete keys y props desde el registro local. Ajusta el registro para tipar cada item como `ModalRegistryItem<Props>` y exponer `load` si el proyecto usa `loadModals`. Ejecuta `npm install`, `npm run lint`, `npm run test` y `npm run build`. Reporta archivos modificados, cambios aplicados, validaciones ejecutadas y cualquier bloqueo.
