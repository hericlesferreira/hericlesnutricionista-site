import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const base = 'https://www.nutrihericles.com.br/'
const pages = [
  '',
  'nutricionista-emagrecimento-joinville',
  'nutricionista-esportivo-joinville',
  'consultoria-nutricional-online',
  'acompanhamento-nutricional',
  'alimentacao-mounjaro-ozempic-tirzepatida',
  'sobre-hericles-ferreira',
  'artigos',
  'artigos/como-emagrecer-sem-passar-fome',
  'artigos/como-perder-gordura-sem-perder-massa-muscular',
  'artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta',
]

const fail = (reason, page) => { throw new Error('Schema audit [' + (page || '/') + ']: ' + reason) }
for (const page of pages) {
  const path = join('dist', ...(page ? [page, 'index.html'] : ['index.html']))
  const html = await readFile(path, 'utf8')
  const jsonLd = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/g)]
  if (!jsonLd.length) fail('JSON-LD ausente', page)
  let graphs = []
  for (const found of jsonLd) {
    let data
    try { data = JSON.parse(found[1]) } catch (e) { fail('JSON-LD inválido: ' + e.message, page) }
    graphs.push(...(data['@graph'] ?? [data]))
  }
  const ids = graphs.map(x => x['@id']).filter(Boolean)
  if (new Set(ids).size !== ids.length) fail('@id duplicado', page)
  if (html.includes('"@type": "MedicalTherapy"') || html.includes("'@type': 'MedicalTherapy'")) fail('MedicalTherapy usado para serviço', page)
  if (!graphs.some(x => x['@type'] === 'Person' && x['@id'] === base + '#professional')) fail('Entidade Person sem ID padronizado', page)
  const canonical = page ? base + page + '/' : base
  if (!html.includes('href="' + canonical + '"')) fail('Canônico ausente ou divergente', page)
  const graphTypes = graphs.map(x => x['@type'])
  if (page === '' && (!graphTypes.includes('MedicalBusiness') || !graphTypes.includes('WebSite'))) fail('Entidades principais ausentes', page)
  if (page === 'sobre-hericles-ferreira' && !graphTypes.includes('ProfilePage')) fail('ProfilePage ausente', page)
  if ((page === 'alimentacao-mounjaro-ozempic-tirzepatida' || page.startsWith('artigos/')) && !graphTypes.includes('Article')) fail('Article ausente', page)
  if (page === 'artigos' && !graphTypes.includes('CollectionPage')) fail('CollectionPage ausente', page)
  if (page.startsWith('nutricionista-') || page.startsWith('consultoria-') || page.startsWith('acompanhamento-')) {
    if (!graphTypes.includes('Service')) fail('Service ausente', page)
  }
  console.log('Schema OK:', canonical, '(', graphTypes.join(', '), ')')
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
for (const page of pages) {
  const url = base + (page ? page + '/' : '')
  if (!sitemap.includes('<loc>' + url + '</loc>')) fail('Sitemap sem URL ' + url, page)
}
console.log('Validação local: ' + pages.length + ' páginas e sitemap coerentes.')
