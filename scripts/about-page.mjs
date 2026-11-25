import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { sharedHeader, sharedFooter } from './shared-layout.mjs'

const bloggerPosts = JSON.parse(await readFile(new URL('../data/blogger-posts.json', import.meta.url), 'utf8'))

const strategicArticles = [
  { href:'/artigos/como-emagrecer-sem-passar-fome/', category:'Emagrecimento', title:'Como emagrecer sem passar fome?', description:'Volume, saciedade e flexibilidade alimentar para construir uma rotina que realmente seja possível manter.', image:'/img/hericles-ferreira-atendimento-nutricional-joinville.webp?v=2' },
  { href:'/artigos/como-perder-gordura-sem-perder-massa-muscular/', category:'Composição corporal', title:'Como perder gordura sem perder massa muscular?', description:'Proteína, treinamento e estratégia nutricional para preservar massa muscular durante o emagrecimento.', image:'/img/avaliacao-fisica-bioimpedancia-dobras-cutaneas-joinville.webp' },
  { href:'/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/', category:'Metabolismo', title:'Por que parei de emagrecer mesmo fazendo dieta?', description:'O que vale a pena observar antes de simplesmente comer menos ou aumentar ainda mais as restrições.', image:'/img/plano-alimentar-personalizado-hericles-ferreira.webp' },
  { href:'/artigos/alimentacao-mounjaro-ozempic-tirzepatida/', category:'Tratamento e alimentação', title:'Alimentação durante o uso de Mounjaro, Ozempic e tirzepatida', description:'Como organizar a alimentação, preservar massa muscular e lidar com dificuldades nutricionais durante o tratamento.', image:'/img/aplicativo-acompanhamento-nutricional-plano-alimentar.webp' }
]

const bloggerArticles = (Array.isArray(bloggerPosts) ? bloggerPosts : []).map(post => ({
  href:'/artigos/' + post.slug + '/',
  category:post.labels?.[0] || 'Nutrição',
  title:post.title,
  description:post.description,
  image:post.image || '/img/hericles-ferreira-retrato-institucional.webp'
}))

const aboutArticles = [
  ...strategicArticles,
  ...bloggerArticles.filter(post => !strategicArticles.some(fixed => fixed.href === post.href))
].slice(0,6)

const renderAboutArticles = () => '<section class="service-articles" id="artigos"><div class="svc-wrap"><div class="service-articles__header"><div><p class="svc-kicker">Leituras do Nutri</p><h2>Artigos que escrevi recentemente</h2></div><a class="service-articles__all" href="/artigos/">Ver todos os artigos →</a></div><div class="service-articles__grid">' + aboutArticles.map(article => '<article class="service-article-card"><a class="service-article-card__cover" href="'+article.href+'" aria-label="Ler artigo '+article.title+'"><div class="service-article-card__image"><img src="'+article.image+'" alt="'+article.title+'" loading="lazy" decoding="async"></div><div class="service-article-card__body"><div class="service-article-card__meta"><span>'+article.category+'</span><span>Hericles Ferreira</span></div><h3>'+article.title+'</h3><p>'+article.description+'</p><span class="service-article-card__link">Ler artigo →</span></div></a></article>').join('') + '</div></div></section>'

const origin = 'https://www.nutrihericles.com.br'
const url = origin + '/sobre-hericles-ferreira/'
const title = 'Sobre Hericles Ferreira | Nutricionista em Joinville, CRN-10 12284'
const description = 'Conheça Hericles Ferreira, nutricionista em Joinville e pós-graduado em Metabolismo e Emagrecimento. Saiba como funciona seu acompanhamento nutricional.'
const image = origin + '/img/quem-sou-eu.webp'
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
        'https://www.linkedin.com/in/hericlesnutri',
        'https://www.doctoralia.com.br/hericles-ferreira/nutricionista/joinville'
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
<link rel="canonical" href="${url}">\n<link rel="preload" as="image" href="/img/quem-sou-eu.webp" fetchpriority="high">
<link rel="icon" href="/img/favicon-hericles.png">
<meta property="og:type" content="profile"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/service-pages.css">
<link rel="stylesheet" href="/refresh-pages.css">
<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>
</head><body>
${sharedHeader(wa)}
<main>
<section class="about-hero">
  <div class="about-hero__media" aria-hidden="true"><img src="/img/quem-sou-eu.webp" alt="" fetchpriority="high" decoding="async"></div>
  <div class="svc-wrap about-hero__inner">
    <div class="about-hero__copy">
      <nav class="about-hero__breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / Sobre o nutricionista</nav>
      <p class="about-hero__eyebrow">Quem cuida da sua alimentação · CRN-10 12284</p>
      <h1>Hericles Ferreira, nutricionista em Joinville</h1>
      <p class="about-hero__lead">Minha proposta é encaixar a dieta na sua realidade, e não o contrário. Sem soluções milagrosas, com estratégia e acompanhamento.</p>
      <div class="about-hero__actions"><a class="svc-button" href="${wa}">Agendar consulta</a></div>
    </div>
  </div>
  <div class="about-hero__stats"><div class="svc-wrap about-hero__stats-inner">
    <div><strong>CRN-10 12284</strong><span>Nutricionista em Joinville</span></div><i></i>
    <div><strong>Metabolismo e Emagrecimento</strong><span>Pós-graduação pela Faculdade Uniguaçu</span></div><i></i>
    <div><strong>Online & Presencial</strong><span>Acompanhamento individualizado</span></div>
  </div></div>
</section>
<section class="svc-section"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Minha trajetória</p><h2>Antes de te orientar, eu precisei viver o <span class="about-trajectory-emphasis">meu processo</span></h2>
<p>Minha relação com o emagrecimento também é pessoal. Durante anos, enfrentei a obesidade, o cansaço em atividades simples do dia a dia e a dificuldade de organizar a alimentação. Minha rotina girava em torno de opções rápidas, entre trabalho e compromissos.</p>
<p style="margin-top:16px">A experiência que tive e as dificuldades que enfrentei ao mudar meus hábitos influenciou a maneira como eu enxergo a nutrição: um planejamento pode ser tecnicamente correto e, ainda assim, não funcionar se não couber na vida de quem precisa segui-lo.</p>
<p style="margin-top:16px">Foi assim que construí meu propósito profissional: ajudar pessoas a reduzir gordura, ganhar massa muscular e desenvolver hábitos mais consistentes, sem dietas extremas ou culpa por comer.</p>
<h2 style="margin-top:36px">Formação e identificação profissional</h2>
<div class="svc-grid">
<article class="svc-card"><h3>Nutricionista</h3><p>Graduação em Nutrição pela Católica de Santa Catarina. Registro profissional CRN-10 12284.</p></article>
<article class="svc-card"><h3>Metabolismo e Emagrecimento</h3><p>Pós-graduação pela Faculdade Uniguaçu, com aprofundamento em estratégias de nutrição para o controle de peso.</p></article>
<article class="svc-card"><h3>Atuação profissional</h3><p>Emagrecimento, composição corporal, hipertrofia e acompanhamento nutricional individualizado.</p></article>
</div>
</div></section>
<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Como trabalho</p><h2>Tudo para a <em>sua</em> realidade</h2>
<p>Antes de prescrever seu planejamento, eu procuro compreender como você se alimenta, o que gosta, quais são os seus obstáculos e como sua rotina funciona. A nossa estratégia precisa ser viável dentro do seu contexto.</p>
<div class="svc-grid" style="margin-top:25px">
<article class="svc-card"><h3>1. Entender</h3><p>Histórico de saúde, objetivos, rotina alimentar, preferências, treinos e dificuldades.</p></article>
<article class="svc-card"><h3>2. Planejar</h3><p>Definir orientações e um plano alimentar individualizado, sem proibições arbitrárias.</p></article>
<article class="svc-card"><h3>3. Acompanhar</h3><p>Observar a evolução, conversar sobre dificuldades e ajustar a estratégia quando necessário.</p></article>
</div>
<h2 style="margin-top:40px">Atendimento presencial e online</h2>
<p><strong>Consulta presencial:</strong> realizada no meu consultório, em Joinville, com avaliação física conforme sua necessidade.</p>
<p style="margin-top:14px"><strong>Consulta online:</strong> realizada por videochamada, usando o Google Meet. Neste caso, fazemos a avaliação física por meio de fotos e algumas medidas que peço para você me enviar. Também envio um guia orientando como fazer essas medidas da melhor forma.</p>
<p style="margin-top:14px"><strong>Consultoria online:</strong> A consultoria online é uma alternativa prática para quem quer organizar a alimentação sem precisar comparecer ao consultório, ou ainda para pessoas de outras cidade e países.</p>
</div></section>
${renderAboutArticles()}
<section class="about-location section localizacao" id="localizacao" aria-labelledby="localizacao-titulo">
  <div class="svc-wrap">
    <div class="localizacao__header">
      <p class="svc-kicker">Atendimento presencial em Joinville</p>
      <h2 id="localizacao-titulo">Onde fica o consultório?</h2>
      <p class="localizacao__description">Meu consultório fica em Joinville/SC, com atendimento presencial em um espaço preparado para avaliação, acompanhamento e definição da sua estratégia nutricional.</p>
    </div>
    <div class="localizacao__grid">
      <div class="localizacao__map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d894.4864640924357!2d-48.804348630362256!3d-26.26342059590358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deafed6802f801%3A0xb15dc1c82143089b!2sMais%20que%20Rubis%20Studio%20-%20Est%C3%A9tica%20e%20Micropigmenta%C3%A7%C3%A3o%20by%20Girlane%20Ferreira!5e0!3m2!1spt-BR!2sbr!4v1795549649378!5m2!1spt-BR!2sbr" title="Localização do consultório de Hericles Ferreira em Joinville" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div class="localizacao__info">
        <div class="localizacao__card">
          <strong>Hericles Ferreira | Nutricionista</strong>
          <span>CRN-10 12284</span>
          <span>Especialização em Metabolismo e Emagrecimento</span>
          <address>Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC, CEP 89224-090</address>
          <a href="tel:+5547988602379">(47) 98860-2379</a>
        </div>
        <div class="localizacao__actions">
          <a class="svc-outline" href="https://www.google.com/maps/search/?api=1&query=Rua+Areia+Branca%2C+1035%2C+Jardim+Iririu%2C+Joinville%2C+SC" target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
          <a class="svc-button" href="${wa}">Agendar consulta</a>
        </div>
      </div>
    </div>
    <div class="localizacao__gallery" aria-label="Fotos da clínica">
      <figure><img src="/img/consultorio.webp" alt="Consultório de Hericles Ferreira para atendimento nutricional em Joinville" loading="lazy" decoding="async"></figure>
      <figure><img src="/img/clinica.webp" alt="Fachada da clínica onde Hericles Ferreira realiza atendimento nutricional em Joinville" loading="lazy" decoding="async"></figure>
    </div>
  </div>
</section>
<section class="svc-end"><div class="svc-wrap"><h2>Seu plano precisa funcionar na sua vida</h2>
<p>O objetivo é construir uma estratégia alimentar que você consiga colocar em prática e ajustar ao longo do acompanhamento.</p>
<a class="svc-button" href="${wa}">Conversar com Hericles Ferreira</a>
</div></section>
</main>${sharedFooter()}
</body></html>`

export async function generateAboutPage() {
  const dir = join('dist', 'sobre-hericles-ferreira')
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), html, 'utf8')
  if (!html.includes('Hericles Ferreira') || !html.includes('application/ld+json')) throw new Error('Perfil profissional incompleto')
  console.log('SEO: página de apresentação profissional gerada.')
}
