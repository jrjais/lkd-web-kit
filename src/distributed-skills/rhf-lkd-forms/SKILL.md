---
name: rhf-lkd-forms
description: Crear y revisar formularios, filtros, campos controlados, integraciones con React Hook Form, validaciones Zod, reglas superRefine, botones de submit y patrones Form* de lkd-web-kit. Usar cuando Codex trabaje en interfaces de formularios, filtros, wrappers de campos, schemas, valores iniciales, mapeo de payloads, flujos de submit o comportamiento de validación en proyectos que usan React Hook Form, Zod y lkd-web-kit.
---

# Formularios RHF + lkd-web-kit

Usar este skill para formularios, filtros y campos controlados construidos con React Hook Form, Zod y `lkd-web-kit`.

## Workflow obligatorio

1. Leer primero la documentación de formularios del proyecto: `docs/lkd-web-kit.md` o el equivalente local.
2. Reutilizar la familia `Form*` existente antes de crear algo nuevo:
   `Form`, `FormTextInput`, `FormSelect`, `FormMultiSelect`, `FormTextarea`,
   `FormNumberInput`, `FormMonthPickerInput`, `FormCheckbox`,
   `FormRadioGroup`, `FormSubmitButton` y wrappers cercanos del proyecto.
3. Importar primero desde `lkd-web-kit`. Usar wrappers locales solo cuando el proyecto ya los tenga y agreguen estilos o comportamiento propio.
4. No crear un wrapper nuevo si el kit o el proyecto ya tienen un campo equivalente.
5. Para formularios con validación, usar `useForm` con `zodResolver(schema)`.
6. Pasar `mode` solo cuando la API del componente lo soporte. No inventar props.

## Estructura recomendada

- Mantener formularios triviales inline.
- Cuando un formulario mapea datos de API o construye un payload, separar lo repetitivo:
  - `schema`: objeto Zod y tipo inferido.
  - `createDefaultValues`: datos de API/dominio a valores del formulario.
  - `createPayload`: valores del formulario a payload de API.
- Usar `z.input<typeof schema>` para defaults cuando haya transforms o preprocess.
- Usar `z.infer<typeof schema>` para datos ya validados en submit.
- Colocar el código privado junto a la ruta o feature, salvo que sea realmente compartido.

## Validaciones con Zod

- Poner reglas de campo en el schema base.
- No poner mensajes textuales en reglas base de Zod como `min(1, "Texto")`; usar la configuración global de errores o la capa de traducciones del proyecto.
- Usar `superRefine` para reglas cruzadas entre campos y reglas de negocio.
- En `superRefine`, asociar el issue al campo que el usuario puede corregir usando `path`.
- Permitir mensajes custom en `superRefine` cuando el proyecto no tenga un mapeo de códigos para esa regla de negocio.
- Preferir `ctx.addIssue(...)`; usar `ctx.issues.push(...)` solo si ya es el patrón local.

## Campos y filtros

- Todo input que modifique estado de React Hook Form debe ser un componente `Form*`.
- Usar `My*` o inputs Mantine solo para UI standalone fuera de React Hook Form.
- Preferir componentes de campo del proyecto, como `NameField` o `StatusField`, cuando ya provean `name`, labels, opciones traducidas o carga de datos.
- Los filtros siguen el mismo patrón: `useForm` + `Form` + `Form*`.
- El submit de filtros puede actualizar query params, estado local o estado del padre según el proyecto; no agregar una librería de estado solo por un filtro.
- Si un campo client lee catálogos o datos cacheados, verificar que la página o el padre carguen esos datos según la convención del proyecto.

## Submit y errores

- Usar `FormSubmitButton` para acciones de submit. No usar aliases como `FormButtonSubmit` salvo que el proyecto realmente los exporte.
- Dejar que `FormSubmitButton` maneje el loading de submit mediante React Hook Form.
- En submits async, mostrar la notificación de éxito o error esperada por el proyecto.
- En `catch`, mostrar la notificación de error y luego hacer `throw error` para que el wrapper del formulario pueda reaccionar visualmente.
- Recortar o normalizar valores en el límite donde se arma el payload de API, no en handlers sueltos de campos.

## Antipatrones

- No usar `register` directamente para campos ya cubiertos por `Form*`.
- No duplicar wrappers tipo `FormTextInput` o `FormSelect`.
- No usar `any`; tipar valores del formulario desde el schema.
- No agregar helpers custom de validación cuando Zod ya cubre la regla.
- No mezclar campos Mantine no controlados dentro de un formulario de React Hook Form.
- No agregar dependencias nuevas para estado de formulario, validación de campos o filtros comunes.

## Ejemplos mínimos

Formulario de edición:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
} from "lkd-web-kit";
import { useForm } from "react-hook-form";
import z from "zod";
import Form from "src/components/form/Form";

const editSchema = z.object({
  name: z.string().min(1),
  status: z.string().nullable(),
});

type EditValues = z.infer<typeof editSchema>;

const createDefaultValues = (item: { name: string; status: string | null }): EditValues => ({
  name: item.name,
  status: item.status,
});

const createPayload = (data: EditValues) => ({
  name: data.name.trim(),
  status: data.status || undefined,
});

export function EditItemForm({ item }: { item: { name: string; status: string | null } }) {
  const methods = useForm<EditValues>({
    defaultValues: createDefaultValues(item),
    resolver: zodResolver(
      editSchema.superRefine((data, ctx) => {
        if (data.status === "published" && data.name.trim().length < 3) {
          ctx.addIssue({
            code: "custom",
            message: "El nombre es demasiado corto para publicar",
            path: ["name"],
          });
        }
      }),
    ),
  });

  return (
    <Form
      methods={methods}
      onSubmit={async (data) => {
        try {
          await updateItem(createPayload(data));
        } catch (error) {
          showErrorNotification();
          throw error;
        }
      }}
    >
      <FormTextInput name="name" label="Nombre" />
      <FormSelect
        name="status"
        label="Estado"
        data={[
          { value: "draft", label: "Borrador" },
          { value: "published", label: "Publicado" },
        ]}
      />
      <FormSubmitButton>Guardar</FormSubmitButton>
    </Form>
  );
}
```

Filtro:

```tsx
"use client";

import { FormSelect, FormSubmitButton, FormTextInput } from "lkd-web-kit";
import { useForm } from "react-hook-form";
import Form from "src/components/form/Form";

type FilterValues = {
  search: string;
  status: string | null;
};

export function ItemFilters({
  onApply,
}: {
  onApply: (values: FilterValues) => void;
}) {
  const methods = useForm<FilterValues>({
    defaultValues: {
      search: "",
      status: null,
    },
  });

  return (
    <Form methods={methods} onSubmit={onApply}>
      <FormTextInput name="search" label="Buscar" />
      <FormSelect
        name="status"
        label="Estado"
        data={[
          { value: "draft", label: "Borrador" },
          { value: "published", label: "Publicado" },
        ]}
      />
      <FormSubmitButton>Aplicar</FormSubmitButton>
    </Form>
  );
}
```
