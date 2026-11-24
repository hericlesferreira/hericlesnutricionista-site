import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'

const BRANCH = 'feature/blogger-cms'
const PORT = 4173
let version = Date.now().toString()
let rebuilding = false

const run = (cmd, args, options = {}) => spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...options })

function currentBranch() {
  const r = spawnSync('git', ['branch', '--show-current'], { encoding: 'utf8', shell: process.platform === 'win32' })
  return (r.stdout || '').trim()
}
function localChanges() {
  const r = spawnSync('git', ['status', '--porcelain'], { encoding: 'utf8', shell: process.platform === 'win32' })
  return (r.stdout || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean)
}
function hasBlockingLocalChanges() {
  const ignored = new Set(['data/blogger-posts.json'])
  return localChanges().some(line => {
    const path = line.slice(3).trim()
    return !ignored.has(path)
  })
}
function remoteChanged() {
  spawnSync('git', ['fetch', 'origin', BRANCH], { stdio: 'ignore', shell: process.platform === 'win32' })
  const local = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', shell: process.platform === 'win32' }).stdout?.trim()
  const remote = spawnSync('git', ['rev-parse', 'origin/' + BRANCH], { encoding: 'utf8', shell: process.platform === 'win32' }).stdout?.trim()
  return Boolean(local && remote && local !== remote)
}
function syncBlogger() {
  const path = 'data/blogger-posts.json'
  let before = ''
  try { before = readFileSync(path, 'utf8') } catch {}

  const r = run('node', ['scripts/sync-blogger.mjs'])
  if (r.status !== 0) {
    console.log('⚠️ Não foi possível sincronizar o Blogger. Mantendo os artigos já salvos.')
    return false
  }

  let after = ''
  try { after = readFileSync(path, 'utf8') } catch {}
  return before !== after
}

function build() {
  console.log('\n🔧 Reconstruindo site local...')
  const r = run('npm', ['run', 'build'])
  if (r.status === 0) {
    version = Date.now().toString()
    console.log('✅ Site local atualizado. O navegador vai recarregar sozinho.')
  } else {
    console.log('❌ O build falhou. A versão local anterior continua disponível.')
  }
}
function syncAndBuild() {
  if (rebuilding) return
  rebuilding = true
  try {
    if (currentBranch() !== BRANCH) {
      console.log('⚠️ Branch atual diferente de ' + BRANCH + '. Mantendo apenas o servidor local.')
      return
    }
    if (hasBlockingLocalChanges()) {
      console.log('⚠️ Existem alterações locais não commitadas. Pull automático pausado para não sobrescrever seu trabalho.')
      return
    }
    if (remoteChanged()) {
      console.log('\n⬇️ Nova alteração detectada no GitHub. Atualizando...')
      const r = run('git', ['pull', '--ff-only', 'origin', BRANCH])
      if (r.status === 0) build()
    }
  } finally {
    rebuilding = false
  }
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

const reloadScript = `<script>
(() => {
  let current = null;
  async function check() {
    try {
      const r = await fetch('/__local_version', { cache: 'no-store' });
      const v = await r.text();
      if (current === null) current = v;
      else if (v !== current) location.reload();
    } catch {}
  }
  setInterval(check, 1200);
  check();
})();
</script>`

const server = createServer(async (req, res) => {
  if (req.url === '/__local_version') {
    res.writeHead(200, { 'content-type': 'text/plain', 'cache-control': 'no-store' })
    res.end(version)
    return
  }

  let pathname = decodeURIComponent((req.url || '/').split('?')[0])
  if (pathname.includes('..')) pathname = '/'
  let filePath = join('dist', normalize(pathname).replace(/^([/\\])+/, ''))

  try {
    const info = await stat(filePath)
    if (info.isDirectory()) filePath = join(filePath, 'index.html')
  } catch {
    if (!extname(filePath)) filePath = join(filePath, 'index.html')
  }

  try {
    let data = await readFile(filePath)
    const type = mime[extname(filePath).toLowerCase()] || 'application/octet-stream'
    if (type.startsWith('text/html')) {
      let html = data.toString('utf8')
      html = html.replace('</body>', reloadScript + '</body>')
      data = Buffer.from(html)
    }
    res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' })
    res.end(data)
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('Página não encontrada no build local.')
  }
})

console.log('🚀 Preparando ambiente local...')
console.log('📰 Sincronizando Blogger na inicialização...')
syncBlogger()
build()
server.listen(PORT, '127.0.0.1', () => {
  console.log('\n👀 Preview automático: http://localhost:' + PORT)
  console.log('🔄 Verificando novas alterações no GitHub a cada 5 segundos.')
  console.log('💡 Deixe este terminal aberto enquanto estivermos editando o site.\n')
})

setInterval(syncAndBuild, 5000)

function scheduleBloggerSyncAtSix() {
  const now = new Date()
  const next = new Date(now)
  next.setHours(6, 0, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)

  const delay = next.getTime() - now.getTime()
  console.log('📰 Próxima verificação do Blogger: ' + next.toLocaleString('pt-BR'))

  setTimeout(() => {
    if (!rebuilding && currentBranch() === BRANCH && !hasBlockingLocalChanges()) {
      rebuilding = true
      try {
        if (syncBlogger()) {
          console.log('\n📰 Novo conteúdo detectado no Blogger.')
          build()
        } else {
          console.log('📰 Blogger verificado às 06h. Nenhum artigo novo.')
        }
      } finally {
        rebuilding = false
      }
    }
    scheduleBloggerSyncAtSix()
  }, delay)
}

scheduleBloggerSyncAtSix()
