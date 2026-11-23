import { readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { build, createServer } from 'vite'

// Gera os arquivos otimizados do Vite e pré-renderiza a página inicial.
// Assim o conteúdo fica no HTML mesmo quando o rastreador não executa JS.
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

  if (!html.includes(placeholder)) {
    throw new Error('Elemento #root não encontrado no HTML de produção.')
  }
  if (!markup.includes('Emagreça de vez') || !markup.includes('Perguntas frequentes')) {
    throw new Error('A página pré-renderizada está incompleta.')
  }

  await writeFile(
    htmlPath,
    html.replace(placeholder, `<div id="root">${markup}</div>`),
    'utf8',
  )
  console.log('SEO: página inicial pré-renderizada em dist/index.html.')
} finally {
  await server.close()
}
