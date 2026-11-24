# Renombre local a LKDDashboardLayout

Registro: 2026-11-24T14:53:40-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; usuario hugo\hugos (fuente: whoami de la sesión).

## Resultado

DashboardLayout se renombra a LKDDashboardLayout en el kit. Se renombran carpeta, módulos, contexto y familia de tipos/subcomponentes (Props, Factory, ClassNames, Labels, StylesNames, Header, Navbar y Main). La API compuesta conserva .Header, .Navbar, .Main, .Page y .Title. DashboardPage, DashboardTitle, DashboardNavItem y DashboardNavSection mantienen sus nombres.

Las claves useProps/useStyles, displayName y registro de tema pasan al nombre nuevo. No se conserva el export DashboardLayout. Se actualizan pruebas existentes, barrel público, catálogo generado y skill distribuida lkd-web-dashboard-layout. Se conservan las guías y actas históricas, que describen versiones ya publicadas.

## Migración del consumidor cuando se publique

```tsx
import { LKDDashboardLayout } from 'lkd-web-kit'

<LKDDashboardLayout>
  <LKDDashboardLayout.Header />
  <LKDDashboardLayout.Navbar navigation={navigation} />
  <LKDDashboardLayout.Main>{children}</LKDDashboardLayout.Main>
</LKDDashboardLayout>
```

Reemplazar también DashboardLayoutProps por LKDDashboardLayoutProps y cualquier clave de tema DashboardLayout por LKDDashboardLayout. En AEstrenar podrá sustituirse el import con alias KitDashboardLayout y sus referencias al adoptar la futura versión. No se cambia ahora la aplicación: su paquete instalado 0.12.3 todavía no exporta el nombre nuevo.

## Validación y límites

- 13 pruebas del dashboard correctas, incluidas composición, contexto, refs y tema.
- Build completo correcto (tsc y Vite, ESM/CJS y declaraciones).
- Biome focalizado correcto tras ordenar imports/exports.
- Export raíz CJS comprobado: LKDDashboardLayout presente, DashboardLayout ausente y aliases compuestos iguales a sus exports independientes.
- Versión de package.json conservada en 0.12.3; sin release, npm publish, commits, push ni deploy.

Skill aplicada: mantine-custom-components; ponytail para limitar el cambio al renombre y sus referencias necesarias. Comportamiento y estilos sin cambios.

## API natural y defaults solicitados

Registro: 2026-11-24T15:03:35-04:00 (America/La_Paz). Codex/OpenAI, modelo no verificado; hugo\hugos (whoami de la sesión).

Raíz con header.height=56, navbar.width=200 y navbar.breakpoint=sm por defecto. Configuración tipada y dimensiones responsive delegadas a AppShell, incluyendo header.offset. El breakpoint de tema se comparte con ambos botones; el kit conserva collapsed y los handlers. Se elimina h-16 y el modo automático activado por navigation; los slots pertenecen únicamente a Header/Navbar/Main.

Header.burgerProps acepta props visuales de Mantine sin exponer estado, eventos, visibilidad o accesibilidad. Los handlers y atributos internos se aplican después del spread para protegerlos incluso ante props JavaScript no tipadas. Los colores neutros se resuelven con variables Mantine; NavLink usa el primario del tema. DashboardTitle usa colores de texto/dimmed del tema y mantiene extend para personalización global del consumidor.

Validación: suite completa de 17 pruebas correcta; cuatro casos nuevos comprueban defaults/offsets, medidas responsive y breakpoint compartido, props visuales sin sobreescribir controles, y defaults de tema con overrides locales. Build TypeScript/Vite correcto; Biome focalizado correcto.

AEstrenar queda sin cambios porque la API no está publicada. Al adoptar la futura versión se podrán quitar DashboardLayout.module.css, h-14 y el selector interno Burger, pasar burgerProps y configurar DashboardTitle en el tema. No se cambia el lockfile de la aplicación ni se introduce un enlace local a un paquete no publicado. Sin versión nueva, commit, push ni deploy.
