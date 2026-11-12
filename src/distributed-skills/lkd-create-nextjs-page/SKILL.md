---
name: lkd-create-nextjs-page
description: Crear o refactorizar paginas de Next.js App Router manteniendo el directorio app enfocado en routing y delegando la UI a componentes Page en src/components/pages. Usar al crear page.tsx, migrar vistas fuera de app, organizar subcomponentes privados, aplicar providers de pagina o normalizar nombres y rutas de componentes Page en proyectos que consumen lkd-web-kit.
---

# Create Next.js Page

## Trazabilidad documental

Al crear o actualizar documentacion, pendientes, planes, handoffs o evidencias de
cada ejecucion, registrar por documento y por entrada/evento: fecha y hora ISO 8601
con offset y zona horaria, autor real y, si intervino IA, agente/producto,
proveedor, modelo/version solo si es verificable y usuario del sistema logueado.
Obtenerlo con `whoami` en Windows o `id -un` en Linux y registrar la fuente;
si no se obtiene o solo identifica una cuenta de servicio, preguntar al usuario.
Preservar creacion y autoria anteriores y registrar cada actualizacion sustancial.
No inventar fechas, modelos ni autores historicos; marcar lo desconocido como
`no consta` o `no verificado`. No atribuir al usuario la ejecucion del agente.
En esquemas controlados, usar campos compatibles o referencia al registro con
estos metadatos, sin romper consumidores ni exponer secretos. Esta regla no
amplia permisos de escritura, publicacion ni despliegue.

Actualizacion de esta regla: 2026-11-12T15:35:31-03:00 (America/Buenos_Aires); autor Codex
(OpenAI), modelo no verificado; usuario SO `pc-desktop-joni\administrador` (Windows, `whoami`).


Usar este skill para crear o refactorizar paginas de Next.js App Router en proyectos que usan `lkd-web-kit`.

## Lectura obligatoria

1. Leer la documentacion relevante de Next.js antes de tocar rutas. Si existe `node_modules/next/dist/docs/`, usarla como fuente local.
2. Leer la documentacion local del proyecto sobre `lkd-web-kit`, componentes compartidos y patrones de UI si existe.
3. Revisar una pagina y un layout cercanos antes de editar para respetar aliases, providers, carga de datos, traducciones y convenciones locales.

## Regla principal

- Mantener `app` como capa de routing de Next.js.
- En `app`, dejar `page.tsx`, `layout.tsx` y archivos especiales de Next.js cuando correspondan: `not-found.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, `template.tsx`, `default.tsx` y archivos de metadata.
- No colocar vistas, subcomponentes, hooks privados, helpers de UI, schemas ni columnas de tabla dentro de `app`.
- Colocar la UI real de cada ruta en `src/components/pages`.
- No crear carpetas de features genericas en la raiz de `pages`, como `components`, `widgets` o `recommendations`. Colocar las piezas privadas dentro de la Page dueña o moverlas a componentes compartidos cuando exista reutilizacion real.

## Estructura

Derivar el area desde el route group principal cuando exista. Si termina en `-layout`, quitar ese sufijo; si no hay route group, usar el primer segmento estatico de la ruta. Ignorar locale, route groups y segmentos dinamicos.

```txt
src/app/(dashboard-layout)/reports/page.tsx
src/components/pages/dashboard/reports/ReportsPage.tsx

src/app/products/[productId]/page.tsx
src/components/pages/products/ProductPage.tsx
```

Para una Page con piezas privadas:

```txt
src/components/pages/dashboard/reports/ReportsPage/index.tsx
src/components/pages/dashboard/reports/ReportsPage/ReportFilters.tsx
src/components/pages/dashboard/reports/ReportsPage/helpers.ts
```

- Usar archivo plano `{PageName}Page.tsx` si el componente es de una pieza.
- Usar carpeta `{PageName}Page/index.tsx` si tiene subcomponentes, helpers, schemas o piezas privadas.
- Usar PascalCase y el sufijo `Page` para todo componente que represente una pagina.
- Para rutas dinamicas, nombrar la Page por el ultimo concepto estable, no por el nombre del parametro. En rutas anidadas, reflejar los segmentos estaticos que den contexto.
- Si hay colision o ambiguedad real, anteponer el segmento padre.
- No usar `index.tsx` como Page principal directamente bajo el area o la ruta.
- Mover a componentes compartidos solo cuando haya mas de un consumidor real o exista un patron local establecido.

## Providers

Si el proyecto ya define `PageProviders`, envolver cada `page.tsx` con ese componente y pasar solo props soportadas y necesarias.

```tsx
import PageProviders from "@/app/PageProviders";
import ReportsPage from "@/components/pages/dashboard/reports/ReportsPage";

export default async function Page() {
  return (
    <PageProviders>
      <ReportsPage />
    </PageProviders>
  );
}
```

- Adaptar los aliases, import y props al proyecto consumidor. No crear `PageProviders` solo para cumplir este skill.
- No usar `PageProviders` en un `layout.tsx` compartido por varias pages. Si el layout necesita un provider, importar y aplicar solamente el provider especifico del proyecto.
- Excepcion: un layout dedicado exclusivamente a una page puede usar `PageProviders` cuando evita duplicar providers o carga de datos de esa unica ruta.
- Mantener `PageProviders` en `page.tsx` cuando la pagina necesita props propias, como datos de servidor, traducciones, catalogos o precarga de modales.
- Mantener en `page.tsx` solo responsabilidades de entrypoint: params, metadata, fetch server-side, redirects, `notFound` y providers.
- No duplicar providers dentro del componente Page salvo que el proyecto lo documente.

## Checklist

- `app` queda sin UI ni logica privada de ruta.
- `page.tsx` importa un componente desde `src/components/pages`.
- El componente de pagina termina en `Page` y sus piezas privadas estan dentro de su carpeta `*Page` cuando corresponde.
- Se usa el provider existente del proyecto en el limite correcto: page por defecto, layout solo si es exclusivo de una unica page.
- No quedan imports a la ubicacion anterior de vistas.
- No se usa `any`.
- Ejecutar una verificacion focalizada para el cambio realizado.
