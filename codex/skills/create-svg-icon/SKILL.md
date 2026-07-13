---
name: create-svg-icon
description: Create SVG icon files in projects that expose SVGs from src/icons. Use when Codex must add a new icon under src/icons from user-provided SVG markup, normalize SVG colors to currentColor for Tailwind text-* styling, and export the icon alias from src/icons/index.ts.
---

# Create SVG Icon

Use this skill when the user provides SVG markup and the desired icon name, usually in the form `Icon{Name}`.

## Required Workflow

1. Read `src/icons/index.ts` before editing.
2. Determine the component export name from the user input.
   - Expected format: `Icon{Name}`.
   - Keep the export alias with the `Icon` prefix.
3. Verify the icon does not already exist.
   - Check for the exact alias in `src/icons/index.ts`.
   - Check for the target SVG filename in `src/icons/`.
   - If either exists, cancel the operation and notify the user.
4. Build the SVG filename.
   - Remove the leading `Icon` prefix.
   - Convert the remaining name to kebab-case.
   - Save it as `src/icons/{name}.svg`.
   - Example: `IconBuildingTower` -> `src/icons/building-tower.svg`.
5. Normalize the provided SVG.
   - Replace every explicit visual color value with `currentColor`.
   - Include colors expressed as hex, rgb(), rgba(), hsl(), hsla(), named colors, or inline style values.
   - Apply this to attributes such as `fill`, `stroke`, `color`, `stop-color`, and CSS declarations inside `style`.
   - Preserve `fill="none"`, `stroke="none"`, `currentColor`, `transparent`, masks, clipping, sizing, viewBox, paths, and structural SVG attributes.
   - Do not convert opacity values to `currentColor`.
6. Create the SVG file in `src/icons/`.
7. Add the alias in `src/icons/index.ts` following the existing export style in that file.
8. Report the created SVG path and the added export alias.

## Guardrails

- Do not use `any`.
- Do not create React wrapper components for the icon unless the existing icon system requires it.
- Do not overwrite an existing icon file or alias.
- Do not invent SVG path data; use the SVG supplied by the user.
- Keep edits scoped to `src/icons/{name}.svg` and `src/icons/index.ts` unless the user asks for something else.
