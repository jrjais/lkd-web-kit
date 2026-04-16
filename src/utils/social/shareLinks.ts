export const buildLinkedInShareUrl = (url: string): string =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

export const buildWhatsAppShareUrl = ({ title, url }: { title: string; url: string }): string => {
  const shareText = `${title} ${url}`
  return `https://wa.me/?text=${encodeURIComponent(shareText)}`
}
