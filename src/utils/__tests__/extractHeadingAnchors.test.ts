import { extractHeadingAnchors } from 'src/utils/extractHeadingAnchors'
import { describe, expect, it } from 'vitest'

describe('extractHeadingAnchors', () => {
  it('creates heading anchors and sets ids when missing', () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <h2>Introduccion general</h2>
      <h3>Subtitulo 1</h3>
      <h2>Introduccion general</h2>
    `

    const result = extractHeadingAnchors(container)

    expect(result).toEqual([
      { id: 'introduccion-general', text: 'Introduccion general', level: 2 },
      { id: 'subtitulo-1', text: 'Subtitulo 1', level: 3 },
      { id: 'introduccion-general-2', text: 'Introduccion general', level: 2 },
    ])
  })

  it('keeps existing ids and supports custom selector', () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <h2 id="manual-id">Titulo principal</h2>
      <h3>Subtitulo</h3>
    `

    const result = extractHeadingAnchors(container, 'h2')

    expect(result).toEqual([{ id: 'manual-id', text: 'Titulo principal', level: 2 }])
  })
})
