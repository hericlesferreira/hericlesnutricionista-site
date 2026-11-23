import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const origin = 'https://www.nutrihericles.com.br'
const url = origin + '/sobre-hericles-ferreira/'
const title = 'Sobre Hericles Ferreira | Nutricionista em Joinville, CRN-10 12284'
const description = 'Conheça Hericles Ferreira, nutricionista em Joinville e pós-graduado em Metabolismo e Emagrecimento. Saiba como funciona seu acompanhamento nutricional.'
const image = origin + '/img/hericles-ferreira-sofa-profissional.webp'
const wa = 'https://api.whatsapp.com/send?phone=5547988602379&text=' + encodeURIComponent('Olá, Hericles! Li sua apresentação profissional no site e gostaria de saber sobre seu acompanhamento nutricional.')
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': origin + '/#professional',
      name: 'Hericles Ferreira',
      jobTitle: 'Nutricionista',
      identifier: 'CRN-10 12284',
      description: 'Nutricionista pós-graduado em Metabolismo e Emagrecimento, com atendimentos presenciais em Joinville e consultoria nutricional online.',
      url,
      image,
      sameAs: [
        'https://www.instagram.com/nutrihericles/',
        'https://www.linkedin.com/in/hericlesnutri'
      ],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Católica de Santa Catarina' },
        { '@type': 'CollegeOrUniversity', name: 'Faculdade Uniguaçu' }
      ],
      knowsAbout: [
        'Emagrecimento',
        'Metabolismo',
        'Hipertrofia',
        'Composição corporal',
        'Acompanhamento nutricional'
      ]
    },
    {
      '@type': 'ProfilePage',
      '@id': url + '#profile',
      url,
      name: title,
      description,
      inLanguage: 'pt-BR',
      mainEntity: { '@id': origin + '/#professional' },
      isPartOf: { '@id': origin + '/#website' },
      breadcrumb: { '@id': url + '#breadcrumbs' }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumbs',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Sobre Hericles Ferreira', item: url }
      ]
    }
  ]
}
const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${description}">
<meta name="robots" content="index,follow">
<meta name="author" content="Hericles Ferreira">
<link rel="canonical" href="${url}">
<link rel="icon" href="/img/logo-light.ico">
<meta property="og:type" content="profile"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/service-pages.css">
<link rel="stylesheet" href="/refresh-pages.css">
<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>
</head><body>
<header class="svc-header"><div class="svc-wrap svc-header-row">
<a class="svc-brand" href="/">HERICLES<span> NUTRI</span></a>
<nav aria-label="Navegação"><a href="/nutricionista-emagrecimento-joinville/">Emagrecimento</a><a href="/nutricionista-esportivo-joinville/">Nutrição esportiva</a><a href="/consultoria-nutricional-online/">Consultoria online</a></nav>
<a class="svc-header-cta" href="${wa}">Conversar</a></div></header>
<main>
<section class="svc-hero"><div class="svc-wrap svc-hero-grid">
<div class="svc-hero-copy">
<nav class="svc-breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / Sobre o nutricionista</nav>
<p class="svc-eyebrow">Quem cuida da sua alimentação · CRN-10 12284</p>
<h1>Hericles Ferreira, nutricionista em Joinville</h1>
<p class="svc-lead">Minha proposta é encaixar a dieta na realidade de cada paciente, e não o contrário. Sem soluções milagrosas, com estratégia, acompanhamento e respeito à sua rotina.</p>
<a class="svc-button" href="${wa}">Falar sobre meu objetivo</a>
</div>
<img class="svc-hero-photo" src="/img/hericles-ferreira-retrato-institucional.webp" alt="Hericles Ferreira, nutricionista, em retrato profissional" width="300" height="410" fetchpriority="high">
</div></section>
<section class="svc-section"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Minha trajetória</p><h2>Antes de orientar, vivi o processo de mudança</h2>
<p>Minha relação com o emagrecimento também é pessoal. Durante anos, enfrentei o sobrepeso, o cansaço em atividades comuns e a dificuldade de organizar a alimentação. Minha rotina girava em torno de opções rápidas, entre trabalho e compromissos.</p>
<p style="margin-top:16px">A experiência de mudar meus hábitos influenciou a maneira como enxergo a nutrição: um planejamento pode ser tecnicamente correto e, ainda assim, não funcionar se não couber na vida de quem precisa segui-lo.</p>
<p style="margin-top:16px">Foi assim que construí meu propósito profissional: ajudar pessoas a reduzir gordura, ganhar massa muscular e desenvolver hábitos mais consistentes, sem dietas extremas ou culpa por comer.</p>
<h2 style="margin-top:36px">Formação e identificação profissional</h2>
<div class="svc-grid">
<article class="svc-card"><h3>Nutricionista</h3><p>Graduação em Nutrição pela Católica de Santa Catarina. Registro profissional CRN-10 12284.</p></article>
<article class="svc-card"><h3>Metabolismo e Emagrecimento</h3><p>Pós-graduação pela Faculdade Uniguaçu, com aprofundamento em estratégias de nutrição para o controle de peso.</p></article>
<article class="svc-card"><h3>Atuação profissional</h3><p>Emagrecimento, composição corporal, hipertrofia e acompanhamento nutricional individualizado.</p></article>
</div>
</div></section>
<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Como trabalho</p><h2>Alimentação possível, acompanhamento real</h2>
<p>Antes de prescrever um planejamento, procuro compreender como a pessoa se alimenta, o que gosta, quais são os obstáculos e como sua rotina funciona. A estratégia nutricional precisa ser viável dentro desse contexto.</p>
<div class="svc-grid" style="margin-top:25px">
<article class="svc-card"><h3>1. Entender</h3><p>Histórico de saúde, objetivos, rotina alimentar, preferências, treinos e dificuldades.</p></article>
<article class="svc-card"><h3>2. Planejar</h3><p>Definir orientações e um plano alimentar individualizado, sem proibições arbitrárias.</p></article>
<article class="svc-card"><h3>3. Acompanhar</h3><p>Observar a evolução, conversar sobre dificuldades e ajustar a estratégia quando necessário.</p></article>
</div>
<h2 style="margin-top:40px">Como são as modalidades de atendimento?</h2>
<p><strong>Consulta presencial em Joinville:</strong> realizada no consultório, com avaliação nutricional e física conforme a necessidade individual.</p>
<p style="margin-top:14px"><strong>Consultoria nutricional online:</strong> começa por um questionário detalhado, utilizado para elaborar orientações e planejamento alimentar, com acompanhamento digital conforme a modalidade contratada. Não é a mesma modalidade de consulta presencial.</p>
<p style="margin-top:16px">O acompanhamento pode incluir check-ins semanais, suporte pelo WhatsApp, acesso ao aplicativo Dietitian e ajustes do plano conforme o serviço contratado.</p>
</div></section>
<section class="svc-section"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Atendimento e contato</p>
<h2>Onde atendo?</h2>
<p>Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC. Também ofereço consultoria nutricional online para pessoas de outras cidades, quando a modalidade for adequada às suas necessidades.</p>
<p style="margin-top:16px"><a style="color:var(--lime);text-decoration:underline" href="https://www.google.com/maps/search/?api=1&query=Rua+Areia+Branca%2C+1035%2C+Joinville%2C+SC" target="_blank" rel="noopener noreferrer">Como chegar ao consultório no Google Maps</a></p>
<p style="margin-top:16px">Telefone/WhatsApp: <a style="color:var(--lime)" href="tel:+5547988602379">(47) 98860-2379</a>. Instagram: <a style="color:var(--lime)" href="https://www.instagram.com/nutrihericles/" target="_blank" rel="noopener noreferrer">@nutrihericles</a>.</p>
<h2 style="margin-top:36px">Conteúdo e orientações de minha autoria</h2>
<p>Além dos atendimentos, compartilho orientações educativas sobre alimentação, emagrecimento, ganho de massa muscular e saúde metabólica. Um exemplo é meu artigo sobre cuidados nutricionais durante o uso de medicamentos para emagrecimento, desenvolvido a partir de orientações que entrego aos pacientes.</p>
<p style="margin-top:16px"><a class="svc-more-link" href="/alimentacao-mounjaro-ozempic-tirzepatida/">Ler artigo sobre alimentação, Mounjaro e Ozempic →</a></p>
</div></section>
<section class="svc-end"><div class="svc-wrap"><h2>Seu plano precisa funcionar na sua vida</h2>
<p>O objetivo é construir uma estratégia alimentar que você consiga colocar em prática e ajustar ao longo do acompanhamento.</p>
<a class="svc-button" href="${wa}">Conversar com Hericles Ferreira</a>
</div></section>
</main><footer class="svc-footer"><div class="svc-wrap"><p>Hericles Ferreira · Nutricionista · CRN-10 12284</p><p>Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC</p><p><a href="/">Página inicial</a> · <a href="/acompanhamento-nutricional/">Acompanhamento</a> · <a href="/consultoria-nutricional-online/">Consultoria online</a></p></div></footer>
</body></html>`

export async function generateAboutPage() {
  const dir = join('dist', 'sobre-hericles-ferreira')
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), html, 'utf8')
  if (!html.includes('Hericles Ferreira') || !html.includes('application/ld+json')) throw new Error('Perfil profissional incompleto')
  console.log('SEO: página de apresentação profissional gerada.')
}
