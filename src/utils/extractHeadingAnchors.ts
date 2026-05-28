export type HeadingAnchor = {
  id: string
  text: string
  level: number
}

export const slugifyHeadingText = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

export const extractHeadingAnchors = (
  container: HTMLElement,
  selector: string = 'h2, h3',
): HeadingAnchor[] => {
  const headingElements = Array.from(container.querySelectorAll(selector)) as HTMLHeadingElement[]
  const usedIds = new Set<string>()

  return headingElements
    .map((element) => {
      const text = element.textContent?.trim() ?? ''
      if (!text) return null

      const baseId = element.id || slugifyHeadingText(text)
      let id = baseId
      let counter = 2

      while (usedIds.has(id)) {
        id = `${baseId}-${counter}`
        counter += 1
      }

      usedIds.add(id)
      if (!element.id) {
        element.id = id
      }

      const tagLevel = Number(element.tagName.slice(1))

      return {
        id,
        text,
        level: Number.isFinite(tagLevel) ? tagLevel : 0,
      } satisfies HeadingAnchor
    })
    .filter((item): item is HeadingAnchor => item !== null)
}
