import slugify from 'slugify'

export function Slugify(text: string): string {
  return slugify(text, {
    replacement: '-',
    lower: true
  })
}
