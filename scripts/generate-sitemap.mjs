import { readFile, writeFile } from 'node:fs/promises'

const origin = 'https://www.nutrihericles.com.br'
const bloggerPosts = JSON.parse(await readFile(new URL('../data/blogger-posts.json', import.meta.url), 'utf8'))

const staticPaths = [
  '/',
  '/nutricionista-emagrecimento-joinville/',
  '/nutricionista-esportivo-joinville/',
  '/consultoria-nutricional-online/',
  '/acompanhamento-nutricional/',
  '/sobre-hericles-ferreira/',
  '/artigos/',
  '/artigos/como-emagrecer-sem-passar-fome/',
  '/artigos/como-perder-gordura-sem-perder-massa-muscular/',
  '/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/',
  '/artigos/alimentacao-mounjaro-ozempic-tirzepatida/'
]

const entries = [
  ...staticPaths.map(path => ({ loc: origin + path })),
  ...(Array.isArray(bloggerPosts) ? bloggerPosts : []).map(post => ({
    loc: origin + '/artigos/' + post.slug + '/',
    lastmod: post.updated || post.published || null
  }))
]

const deduped = [...new Map(entries.map(entry => [entry.loc, entry])).values()]

const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  deduped.map(entry => {
    const lastmod = entry.lastmod ? '\n    <lastmod>' + new Date(entry.lastmod).toISOString().slice(0,10) + '</lastmod>' : ''
    return '  <url>\n    <loc>' + entry.loc + '</loc>' + lastmod + '\n  </url>'
  }).join('\n') +
  '\n</urlset>\n'

await writeFile(new URL('../dist/sitemap.xml', import.meta.url), xml, 'utf8')
console.log('SEO: sitemap.xml gerado com ' + deduped.length + ' URLs canônicas.')
