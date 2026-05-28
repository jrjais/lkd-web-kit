import { buildLinkedInShareUrl, buildWhatsAppShareUrl } from 'src/utils/social/shareLinks'
import { describe, expect, it } from 'vitest'

describe('shareLinks', () => {
  it('builds linkedin share url', () => {
    const url = 'https://aestrenar.com.ar/es-ar/blog/post-1'

    const result = buildLinkedInShareUrl(url)

    expect(result).toBe(
      'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Faestrenar.com.ar%2Fes-ar%2Fblog%2Fpost-1',
    )
  })

  it('builds whatsapp share url with title and link', () => {
    const result = buildWhatsAppShareUrl({
      title: 'Nota destacada',
      url: 'https://aestrenar.com.ar/es-ar/blog/post-1',
    })

    expect(result).toBe(
      'https://wa.me/?text=Nota%20destacada%20https%3A%2F%2Faestrenar.com.ar%2Fes-ar%2Fblog%2Fpost-1',
    )
  })
})
