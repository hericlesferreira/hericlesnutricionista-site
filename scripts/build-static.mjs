import { readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { build, createServer } from 'vite'
import { generateServicePages } from './service-pages.mjs'
import { generateMedicationPage } from './medication-page.mjs'
import { generateAboutPage } from './about-page.mjs'
import { generateEducationalArticles } from './educational-articles.mjs'

await build()
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const markup = renderToString(createElement(App))
  const htmlPath = new URL('../dist/index.html', import.meta.url)
  const html = await readFile(htmlPath, 'utf8')
  const placeholder = '<div id="root"></div>'
  if (!html.includes(placeholder)) throw new Error('Root HTML não encontrado.')
  if (!markup.includes('Uma alimentação que funciona na sua vida.') || !markup.includes('Perguntas frequentes')) {
    throw new Error('HTML pré-renderizado incompleto.')
  }
  await writeFile(htmlPath, html.replace(placeholder, `<div id="root">${markup}</div>`), 'utf8')
  await generateServicePages()
  await generateMedicationPage()
  await generateAboutPage()
  await generateEducationalArticles()
  await import('./validate-schema.mjs')
  console.log('SEO: HTML inicial pré-renderizado com sucesso.')
} finally {
  await server.close()
}
