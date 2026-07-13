---
name: create-modal-component
description: Crear modales en proyectos internos con el modal manager global de lkd-web-kit. Usar cuando Codex deba agregar, modificar o registrar modales bajo src/components/modals, envolverlos con withModalManager, elegir entre un modal interno del proyecto o Modal de Mantine, organizar el modal en carpeta propia, tipar props para showModal, actualizar dynamicModals, MyModalManagerProvider, module augmentation o loadModals.
---

# Crear Modal Component

Usar este flujo para modales abiertos con `useModalManager().showModal(...)`.

## Lectura Obligatoria

1. Leer `docs/lkd-web-kit.md` y `docs/local-components.md`.
2. Leer `src/components/modals/index.ts`.
3. Leer `src/contexts/MyModalManagerContext/index.tsx`.
4. Leer `src/types/lkd-web-kit.d.ts`.
5. Buscar si existe un modal interno en `src/components/ui` o componentes compartidos antes de importar `Modal` de Mantine.
6. Leer un modal existente del mismo dominio en `src/components/modals/{dominio}`.
7. Si se toca `next/dynamic` o lazy loading, leer `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`.

## Arquitectura Actual

- `lkd-web-kit` exporta `ModalManagerProvider`, `useModalManager`, `withModalManager`, `ModalRegistryItem`, `ModalKey` y tipos relacionados.
- El proyecto no usa `src/contexts/ModalManagerContext`; no recrearlo.
- `src/contexts/MyModalManagerContext/index.tsx` adapta el provider del kit y le pasa `dynamicModals`.
- `src/types/lkd-web-kit.d.ts` hace module augmentation para que `showModal` infiera keys y props desde `dynamicModals`.
- `src/app/PageProviders.tsx` envuelve la app con `MyModalManagerProvider` y propaga `loadModals`.

## Estructura

- Crear modales en `src/components/modals/{dominio}/{NombreModal}/index.tsx` cuando tengan formulario, schema, hooks internos, assets o subcomponentes.
- Usar archivo plano `src/components/modals/{dominio}/{NombreModal}.tsx` solo para modales triviales de una pieza, siguiendo el patron existente.
- Colocar piezas privadas junto al modal: `schema.ts`, `helpers.ts`, subcomponentes o assets dentro de la misma carpeta.
- No mover logica compartida a `src/components/ui` salvo que ya exista mas de un consumidor real.

## Implementacion

1. Definir props exportadas si el modal recibe datos desde `showModal`:

```tsx
export interface MyModalProps {
  itemId: string;
  onSuccess?: () => void;
}
```

2. Envolver el componente con `withModalManager<Props>`.
3. Recibir `modalProps` desde el wrapper y pasarlo al modal raiz.
4. Antes de usar `Modal` de `@mantine/core`, corroborar si el proyecto tiene un modal interno que ya envuelve Mantine y usarlo si cubre el caso.
5. Usar clases Tailwind para spacing, radius, shadow, margin y padding; evitar props Mantine equivalentes si `className` resuelve el caso.
6. Usar wrappers locales del proyecto o `lkd-web-kit` antes que primitivas Mantine directas.
7. No usar `any`.

Modal base con modal interno:

```tsx
import { withModalManager } from "lkd-web-kit";
import ButtonAE from "src/components/ui/ButtonAE";
import InternalModal from "src/components/ui/InternalModal";

export interface MyModalProps {
  onConfirm?: () => void;
}

const MyModal = withModalManager<MyModalProps>(
  ({ onConfirm, modalProps }) => {
    return (
      <InternalModal {...modalProps} size="lg">
        <InternalModal.Header>Titulo</InternalModal.Header>
        <InternalModal.Body className="grid gap-4">Contenido</InternalModal.Body>
        <InternalModal.Footer>
          <ButtonAE
            onClick={() => {
              onConfirm?.();
              modalProps.onClose?.();
            }}
          >
            Guardar
          </ButtonAE>
        </InternalModal.Footer>
      </InternalModal>
    );
  },
);

export default MyModal;
```

Fallback con Mantine, solo si no hay modal interno aplicable:

```tsx
import { Modal } from "@mantine/core";
import { withModalManager } from "lkd-web-kit";

const MyModal = withModalManager(({ modalProps }) => (
  <Modal {...modalProps} title="Titulo">
    Contenido
  </Modal>
));

export default MyModal;
```

## Registro

1. Exportar las props publicas desde el modal.
2. Importar el tipo de props en `src/components/modals/index.ts`:

```ts
import type { MyModalProps } from "./domain/MyModal";
```

3. Registrar con `dynamicModal<Props>("domain/MyModal")`:

```ts
"domain.myModal": dynamicModal<MyModalProps>("domain/MyModal"),
```

4. Usar una key estable con formato `{dominio}.{accion}`.
5. No tocar `src/types/lkd-web-kit.d.ts` si `dynamicModals` sigue siendo la fuente unica. La augmentacion ya apunta a `typeof dynamicModals`.
6. Si se cambia la forma del registro, mantener `ModalRegistryItem<T>` y que cada item tenga `component`, `load` y `path`.

## Contexto y Precarga

- Para rutas que ya usan `PageProviders`, pasar `loadModals` ahi:

```tsx
<PageProviders loadModals={["domain.myModal"]}>{children}</PageProviders>
```

- `loadModals` acepta una key exacta o un prefijo, por ejemplo `"development"` para precargar todos los modales cuyo key empieza con ese prefijo.
- Para layouts que no usan `PageProviders`, envolver el arbol con `MyModalManagerProvider`:

```tsx
import { MyModalManagerProvider } from "src/contexts/MyModalManagerContext";

<MyModalManagerProvider loadModals={["domain.myModal"]}>
  {children}
</MyModalManagerProvider>
```

- Evitar providers anidados salvo que haya una razon real: un provider interno aisla estado y puede cerrar o reemplazar modales inesperadamente.
- Invocar siempre con `useModalManager` desde `lkd-web-kit`, nunca importando el modal directo desde una vista:

```tsx
import { useModalManager } from "lkd-web-kit";

const { showModal, closeModal } = useModalManager();
showModal("domain.myModal", { itemId: "123" });
closeModal("domain.myModal");
```

## Formularios Dentro de Modales

- Usar la skill `rhf-lkd-forms` si el modal contiene formulario.
- Pasar `onSuccess={modalProps.onClose}` o cerrar en el submit exitoso.
- En errores de API, mostrar la alerta esperada y luego hacer `throw error`.
- No poner mensajes textuales en reglas base de Zod.

## Checklist

- El modal exporta default envuelto con `withModalManager`.
- Las props publicas estan exportadas y registradas en `dynamicModals`.
- `showModal("key", props)` queda tipado sin `any`.
- `useModalManager` se importa desde `lkd-web-kit`.
- La ruta esta bajo `PageProviders` o `MyModalManagerProvider`.
- `loadModals` se agrega solo cuando conviene precargar.
- Se reutiliza el modal interno del proyecto salvo necesidad concreta de Mantine directo.
- Se ejecuta una verificacion focalizada si el cambio no es trivial.
