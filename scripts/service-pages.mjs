import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const origin = 'https://www.nutrihericles.com.br'
const phone = '5547988602379'
const contact = (subject) => 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + encodeURIComponent('Olá, Hericles! Vim pelo seu site e gostaria de saber mais sobre ' + subject + '.')
const address = 'Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC'
const pages = [
  {
    slug: 'nutricionista-emagrecimento-joinville',
    nav: 'Emagrecimento',
    title: 'Nutricionista para Emagrecimento em Joinville | Hericles Ferreira',
    description: 'Acompanhamento nutricional para emagrecimento em Joinville, com plano alimentar adaptado à sua rotina, avaliação física e check-ins semanais. Conheça o atendimento.',
    label: 'Emagrecimento em Joinville',
    heading: 'Emagrecimento com estratégia, sem dieta maluca',
    intro: 'Emagrecer não precisa significar cortar tudo o que você gosta. O acompanhamento nutricional considera sua rotina, preferências, histórico e objetivos para planejar mudanças que façam sentido na vida real.',
    benefits: [
      ['Plano alimentar individualizado', 'Estratégias para reduzir gordura corporal sem transformar cada refeição em uma lista de proibições.'],
      ['Acompanhamento de verdade', 'Check-ins semanais para identificar dificuldades, acompanhar a evolução e orientar ajustes no planejamento.'],
      ['Avaliação da evolução', 'No atendimento presencial, a avaliação física complementa a análise de hábitos, medidas e composição corporal.'],
    ],
    sections: [
      ['Para quem é o acompanhamento?', 'Para pessoas que desejam reduzir gordura corporal, melhorar hábitos alimentares e trabalhar a manutenção do peso após o emagrecimento. A estratégia é adaptada ao contexto clínico e à rotina individual.'],
      ['Como funciona na prática?', 'Começamos entendendo seu histórico, alimentação, rotina e dificuldades. A partir da avaliação, desenvolvemos um plano alimentar personalizado, com acesso ao aplicativo Dietitian, suporte pelo WhatsApp e acompanhamento semanal.'],
      ['É preciso cortar arroz, pão ou sair da vida social?', 'Não existe uma proibição universal desses alimentos. O planejamento pode acomodar alimentos que você gosta e ocasiões sociais, considerando quantidades, frequência e suas necessidades.'],
    ],
    faqs: [
      ['Preciso passar fome para emagrecer?', 'Não. O plano considera saciedade, preferências e adequação energética para buscar uma estratégia sustentável.'],
      ['Existe acompanhamento depois da consulta?', 'Sim. O acompanhamento nutricional inclui check-ins semanais, orientações e ajustes conforme a evolução e o plano contratado.'],
      ['Você atende presencialmente em Joinville?', 'Sim. O atendimento presencial acontece na Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC.'],
    ],
  },
  {
    slug: 'nutricionista-esportivo-joinville',
    nav: 'Nutrição esportiva',
    title: 'Nutricionista Esportivo em Joinville | Hipertrofia e Composição Corporal',
    description: 'Nutrição esportiva em Joinville para musculação, hipertrofia, ganho de massa muscular e recomposição corporal. Planejamento ajustado à rotina e aos treinos.',
    label: 'Nutrição esportiva em Joinville',
    heading: 'Alimentação alinhada aos seus treinos e objetivos',
    intro: 'Quer ganhar massa muscular, melhorar a composição corporal ou organizar a alimentação para os treinos? O planejamento nutricional considera intensidade, frequência dos exercícios, rotina e preferências alimentares.',
    benefits: [
      ['Estratégia para hipertrofia', 'Ajuste da ingestão energética e de nutrientes de acordo com os objetivos e as necessidades individuais.'],
      ['Composição corporal', 'Acompanhamento de medidas, evolução física e sinais da rotina para orientar decisões ao longo do processo.'],
      ['Praticidade para quem treina', 'Refeições e alternativas planejadas para conciliar alimentação, treino, trabalho e vida social.'],
    ],
    sections: [
      ['Nutrição esportiva vai além dos suplementos', 'Antes de pensar em produtos, avaliamos o conjunto da alimentação: energia, proteínas, carboidratos, gorduras, hidratação e distribuição de refeições.'],
      ['Cutting e bulking sem extremismos', 'A estratégia pode ser direcionada para redução de gordura ou ganho de massa muscular, com metas realistas e adaptações conforme resposta individual.'],
      ['Como é o acompanhamento?', 'A consulta presencial inclui avaliação nutricional e física. O acompanhamento permite revisar a adesão ao planejamento, a rotina de treinos e a evolução corporal.'],
    ],
    faqs: [
      ['Preciso usar whey para ganhar massa muscular?', 'Não necessariamente. A necessidade de suplementos depende da alimentação, da rotina e da avaliação individual.'],
      ['Atende quem está começando musculação?', 'Sim. A estratégia é adaptada tanto a iniciantes quanto a quem já treina regularmente.'],
      ['O atendimento é apenas para atletas?', 'Não. Pessoas que praticam atividade física e desejam melhorar a alimentação e a composição corporal também podem se beneficiar.'],
    ],
  },
  {
    slug: 'consultoria-nutricional-online',
    nav: 'Consultoria online',
    title: 'Consultoria Nutricional Online | Hericles Ferreira Nutricionista',
    description: 'Consultoria nutricional online para emagrecimento e hipertrofia: questionário inicial, plano alimentar personalizado, acompanhamento e ajustes sem deslocamento.',
    label: 'Consultoria nutricional online',
    heading: 'Acompanhamento nutricional onde você estiver',
    intro: 'A consultoria online é uma alternativa prática para quem quer organizar a alimentação sem precisar comparecer ao consultório. O ponto de partida é um questionário detalhado sobre rotina, objetivos e hábitos alimentares.',
    benefits: [
      ['Início pelo questionário', 'Você compartilha informações sobre alimentação, rotina e objetivos por um formulário online.'],
      ['Plano alimentar individualizado', 'As orientações são elaboradas a partir das respostas e das informações necessárias para seu acompanhamento.'],
      ['Suporte e evolução', 'Você recebe orientações e acompanhamento, com revisões e ajustes conforme a modalidade contratada.'],
    ],
    sections: [
      ['Qual é a diferença para a consulta presencial?', 'Na consultoria online, a avaliação inicial ocorre por questionário, sem consulta presencial e sem avaliação física feita no consultório. É uma modalidade diferente, pensada para quem prefere praticidade.'],
      ['Como recebo o meu planejamento?', 'O plano alimentar e materiais de orientação ficam disponíveis digitalmente, incluindo acesso pelo aplicativo Dietitian.'],
      ['Quais objetivos posso trabalhar?', 'A consultoria pode ajudar na organização alimentar para emagrecimento, ganho de massa muscular e melhora dos hábitos, desde que a modalidade seja adequada às necessidades individuais.'],
    ],
    faqs: [
      ['Preciso morar em Joinville?', 'Não. A consultoria é online e pode ser realizada de outras cidades.'],
      ['É uma videochamada?', 'A consultoria descrita aqui começa por um questionário online, que substitui a consulta presencial nessa modalidade.'],
      ['Consigo tirar dúvidas durante o acompanhamento?', 'Sim. O suporte e os ajustes seguem as condições da modalidade de acompanhamento contratada.'],
    ],
  },
  {
    slug: 'acompanhamento-nutricional',
    nav: 'Acompanhamento',
    title: 'Acompanhamento Nutricional Personalizado | Hericles Ferreira',
    description: 'Acompanhamento nutricional com check-ins semanais, plano alimentar personalizado, suporte pelo WhatsApp e ajustes conforme a evolução. Presencial em Joinville e online.',
    label: 'Acompanhamento nutricional',
    heading: 'Mais do que receber uma dieta: ter acompanhamento',
    intro: 'Um plano alimentar é o começo. Acompanhamento nutricional significa observar o que funciona na sua rotina, identificar obstáculos e adaptar as estratégias ao longo do caminho.',
    benefits: [
      ['Check-ins semanais', 'Perguntas para entender adesão, dificuldades, rotina de exercícios e outros fatores que influenciam o planejamento.'],
      ['Ajustes individualizados', 'As estratégias podem ser revistas considerando evolução, necessidades e dificuldades relatadas.'],
      ['Materiais e suporte', 'Acesso ao aplicativo Dietitian com planejamento e orientações, além do suporte previsto na modalidade contratada.'],
    ],
    sections: [
      ['Como funciona o check-in semanal?', 'O check-in ajuda a entender como foi seguir o planejamento, quais refeições foram mais difíceis, como ficaram a rotina de atividade física e outros hábitos relevantes.'],
      ['E se eu sair do plano alimentar?', 'A proposta não é tratar um episódio fora do planejado como fracasso. Usamos essas situações para identificar o que precisa mudar e desenvolver estratégias mais viáveis.'],
      ['Presencial ou online?', 'Há modalidades de atendimento presencial em Joinville e consultoria online. A estrutura, avaliação inicial e condições variam conforme o serviço contratado.'],
    ],
    faqs: [
      ['O planejamento pode mudar ao longo do acompanhamento?', 'Sim. A evolução e o feedback do paciente orientam a necessidade de ajustes.'],
      ['Vou receber materiais digitais?', 'Sim. Os documentos e orientações do acompanhamento são disponibilizados pelo aplicativo Dietitian.'],
      ['O acompanhamento serve para emagrecer e ganhar massa?', 'Sim. As estratégias são individualizadas conforme o objetivo, histórico e necessidades de cada pessoa.'],
    ],
  },
]

const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const nav = pages.map(p => '<a href="/' + p.slug + '/">' + esc(p.nav) + '</a>').join('')
const footer = '<p>Hericles Ferreira · Nutricionista · CRN-10 12284</p><p>' + esc(address) + '</p><p><a href="tel:+5547988602379">(47) 98860-2379</a> · <a href="https://www.instagram.com/nutrihericles/" rel="noopener noreferrer" target="_blank">Instagram</a></p>'
const card = ([title, description]) => '<article class="svc-card"><h3>' + esc(title) + '</h3><p>' + esc(description) + '</p></article>'
function render(p) {
  const url = origin + '/' + p.slug + '/'
  const other = pages.filter(x => x.slug !== p.slug).map(x => '<a class="svc-more-link" href="/' + x.slug + '/">' + esc(x.nav) + ' →</a>').join('')
  const questions = p.faqs.map(([q,a]) => '<details><summary>' + esc(q) + '</summary><p>' + esc(a) + '</p></details>').join('')
  const sections = p.sections.map(([h,body]) => '<section class="svc-article"><h2>' + esc(h) + '</h2><p>' + esc(body) + '</p></section>').join('')
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': url + '#webpage', name: p.title, description: p.description, url, inLanguage: 'pt-BR', isPartOf: { '@id': origin + '/#website' }, about: { '@id': origin + '/#professional' } },
      { '@type': 'Service', name: p.nav, description: p.description, serviceType: p.nav, provider: { '@id': origin + '/#professional' }, areaServed: [{ '@type': 'City', name: 'Joinville' }, { '@type': 'Country', name: 'Brasil' }] },
      { '@type': 'Person', '@id': origin + '/#professional', name: 'Hericles Ferreira', jobTitle: 'Nutricionista', identifier: 'CRN-10 12284', url: origin + '/', sameAs: ['https://www.instagram.com/nutrihericles/'] },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: p.nav, item: url }] },
    ]
  }
  return \`<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>\${esc(p.title)}</title><meta name="description" content="\${esc(p.description)}">
<meta name="robots" content="index,follow"><meta name="author" content="Hericles Ferreira">
<link rel="canonical" href="\${url}">
<link rel="icon" href="/img/logo-light.ico">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="\${esc(p.title)}"><meta property="og:description" content="\${esc(p.description)}">
<meta property="og:url" content="\${url}"><meta property="og:image" content="\${origin}/img/hericlesnutri1.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/service-pages.css">
<script type="application/ld+json">\${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
</head><body>
<header class="svc-header"><div class="svc-wrap svc-header-row"><a class="svc-brand" href="/">HERICLES<span> NUTRI</span></a><nav aria-label="Serviços">\${nav}</nav><a class="svc-header-cta" href="\${contact(p.nav)}">Agendar</a></div></header>
<main>
<section class="svc-hero"><div class="svc-wrap">
<nav class="svc-breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / \${esc(p.nav)}</nav>
<p class="svc-eyebrow">\${esc(p.label)} · CRN-10 12284</p><h1>\${esc(p.heading)}</h1>
<p class="svc-lead">\${esc(p.intro)}</p>
<div class="svc-actions"><a class="svc-button" href="\${contact(p.nav)}">Quero saber mais pelo WhatsApp</a><a class="svc-outline" href="/#sobre">Conhecer o nutricionista</a></div>
</div></section>
<section class="svc-section"><div class="svc-wrap"><p class="svc-kicker">O que você encontra</p><h2>Estratégia adaptada à sua realidade</h2><div class="svc-grid">\${p.benefits.map(card).join('')}</div></div></section>
<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow">\${sections}</div></section>
<section class="svc-section"><div class="svc-wrap svc-narrow"><p class="svc-kicker">Dúvidas frequentes</p><h2>Perguntas sobre \${esc(p.nav.toLowerCase())}</h2><div class="svc-faq">\${questions}</div></div></section>
<section class="svc-section svc-muted"><div class="svc-wrap"><p class="svc-kicker">Outros atendimentos</p><h2>Conheça também</h2><div class="svc-more">\${other}</div></div></section>
<section class="svc-end"><div class="svc-wrap"><h2>Seu planejamento começa com uma conversa</h2><p>Atendimento presencial em Joinville, na \${esc(address)}, e modalidades online conforme o serviço.</p><a class="svc-button" href="\${contact(p.nav)}">Conversar sobre meu objetivo</a></div></section>
</main><footer class="svc-footer"><div class="svc-wrap">\${footer}<p><a href="/">Voltar à página inicial</a></p></div></footer>
</body></html>\`
}

export async function generateServicePages() {
  for (const page of pages) {
    const dir = join('dist', page.slug)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), render(page), 'utf8')
  }
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [origin + '/', ...pages.map(p => origin + '/' + p.slug + '/')].map(url => '  <url><loc>' + url + '</loc><lastmod>2026-11-23</lastmod></url>').join('\n') +
    '\n</urlset>\n'
  await writeFile('dist/sitemap.xml', sitemap, 'utf8')
  const html = await readFile('dist/' + pages[0].slug + '/index.html', 'utf8')
  if (!html.includes('application/ld+json') || !html.includes('<h1>')) throw new Error('Página SEO incompleta')
  console.log('SEO: ' + pages.length + ' páginas de serviços geradas.')
}
