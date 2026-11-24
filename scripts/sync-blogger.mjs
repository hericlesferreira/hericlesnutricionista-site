import { mkdir, writeFile } from 'node:fs/promises'

const feedUrl = 'https://nutrihericles.blogspot.com/feeds/posts/default?alt=json&max-results=100'
const out = new URL('../data/blogger-posts.json', import.meta.url)

const stripHtml = (html = '') => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ')
  .trim()

const slugFromUrl = (url, fallback) => {
  try {
    const last = new URL(url).pathname.split('/').filter(Boolean).at(-1) || fallback
    return last.replace(/\.html$/i, '').replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
  } catch {
    return fallback
  }
}

const res = await fetch(feedUrl, { headers: { 'user-agent': 'HericlesNutriSiteSync/1.0' } })
if (!res.ok) throw new Error('Blogger feed indisponível: HTTP ' + res.status)
const data = await res.json()
const entries = data?.feed?.entry ?? []

const posts = entries.map((entry, index) => {
  const alternate = entry.link?.find(link => link.rel === 'alternate')?.href ?? ''
  const rawHtml = entry.content?.$t ?? entry.summary?.$t ?? ''
  const plain = stripHtml(rawHtml)
  const fallback = 'post-' + (index + 1)
  const firstImage = rawHtml.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null
  return {
    slug: slugFromUrl(alternate, fallback),
    title: entry.title?.$t?.trim() || 'Artigo sem título',
    description: plain.slice(0, 170),
    contentHtml: rawHtml,
    published: entry.published?.$t ?? null,
    updated: entry.updated?.$t ?? entry.published?.$t ?? null,
    originalUrl: alternate,
    labels: (entry.category ?? []).map(item => item.term).filter(Boolean),
    image: firstImage,
  }
}).filter(post => post.slug && post.title)

posts.sort((a, b) => String(b.published).localeCompare(String(a.published)))
await mkdir(new URL('../data/', import.meta.url), { recursive: true })
await writeFile(out, JSON.stringify(posts, null, 2) + '\n', 'utf8')
console.log('Blogger: ' + posts.length + ' post(s) sincronizado(s).')
