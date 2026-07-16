---
name: lkd-layout-mantine-tailwind
description: Create or refactor React/Next.js UI layout in this project using Mantine Layout components to express visual structure and Tailwind classes for styling, spacing, responsive behavior, columns, and display properties. Use when Codex needs to create or adjust JSX with Container, Center, Flex, Group, Stack, SimpleGrid, Grid, or Paper, especially in Page or UI components that mix Mantine and Tailwind.
---

# Layout Mantine Tailwind

Usar este skill para maquetar componentes visuales en `aestrenar-web` con Mantine y Tailwind sin mezclar responsabilidades.

## Lectura Obligatoria

1. Leer `docs/lkd-web-kit.md` y `docs/local-components.md` antes de crear componentes nuevos o reemplazar UI existente.
2. Si se toca una pagina o componente de Next.js, leer la documentacion local relevante en `node_modules/next/dist/docs/`.
3. Revisar uno o dos componentes cercanos antes de editar para seguir imports, wrappers locales y tono visual.

## Regla Principal

- Usar componentes Layout de Mantine para que el JSX deje claro el tipo de display o contenedor.
- Usar Tailwind para estilos, medidas, espaciado, columnas, alineacion y responsive.
- No usar props visuales de Mantine cuando una clase Tailwind resuelve lo mismo.

## Componentes Layout

- `Container`: contenedor de ancho de pagina o seccion.
- `Paper`: superficie visual cuando ya existe una tarjeta/panel real.
- `Stack`: layout vertical.
- `Group`: layout horizontal, grupos de acciones, pills, header row o wrapping.
- `SimpleGrid`: grillas simples responsive. Definir columnas con Tailwind: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`.
- `Grid`: usar solo si hace falta una capacidad propia de `Grid` que `SimpleGrid` no cubre.
- `Center`: centrar contenido en ambos ejes cuando ese sea el objetivo del layout.
- `Flex`: usar solo cuando se requiera cambiar entre `flex-row` y `flex-col` segun responsive, con clases Tailwind.

## Tailwind

Usar clases Tailwind para:

- `m*`, `p*`, `gap-*`, `space-*`.
- `rounded-*`, `shadow-*`, `border`, colores y fondos.
- `text-*`, `font-*`, `leading-*`, `tracking-*`.
- `h-*`, `w-*`, `min-*`, `max-*`.
- `items-*`, `justify-*`, `flex-wrap`, `grid-cols-*`, `col-span-*`.
- Breakpoints responsive: `sm:`, `md:`, `lg:`, `xl:`.

No usar props Mantine equivalentes como `m`, `p`, `px`, `py`, `radius`, `shadow`, `w`, `h`, `gap`, `justify`, `align` o `cols` si Tailwind lo expresa claramente.

## Texto y Semantica

- No usar `Text` ni `Title` de Mantine.
- Usar elementos HTML semanticos (`h1`, `h2`, `p`, `section`, `article`, `footer`, `header`) cuando correspondan.
- Usar la prop `component` solo para cambiar semantica real: `component="main"`, `component="section"`, `component="article"`, `component="footer"`.
- Omitir `component` si el resultado seria `div`, porque es el default.

## Patrones

Grilla simple:

```tsx
<SimpleGrid className="grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
  {items.map((item) => (
    <Card key={item.id} data={item} />
  ))}
</SimpleGrid>
```

Layout vertical:

```tsx
<Stack component="section" className="w-full gap-5">
  <Header />
  <Content />
</Stack>
```

Grupo horizontal:

```tsx
<Group className="items-start justify-between gap-3">
  <h2 className="font-bold text-xl">Titulo</h2>
  <ButtonAE>Accion</ButtonAE>
</Group>
```

Responsive row/column:

```tsx
<Flex className="flex-col gap-2 md:flex-row md:items-center md:justify-between">
  <Summary />
  <Actions />
</Flex>
```

## Checklist

- El JSX muestra el layout con Mantine, no con `div` anonimos cuando hay `Stack`, `Group`, `SimpleGrid`, `Flex`, `Center`, `Container` o `Paper` aplicable.
- Las columnas de grilla estan en Tailwind, no en `cols`.
- No hay `component="div"`.
- No hay `Text` ni `Title` de Mantine.
- No se agregaron abstracciones compartidas si el componente es privado de una pagina.
- Se ejecuto una verificacion focalizada, como `npx biome lint <archivo>`.
