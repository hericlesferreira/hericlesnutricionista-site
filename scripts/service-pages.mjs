import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { sharedHeader, sharedFooter } from './shared-layout.mjs'

const origin = 'https://www.nutrihericles.com.br'
const phone = '5547988602379'
const contact = (subject) => 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + encodeURIComponent('Olá, Hericles! Vim pelo seu site e gostaria de saber mais sobre ' + subject + '.')
const address = 'Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC'
const photos = {
  'nutricionista-emagrecimento-joinville': {
    hero: '/img/hericles-ferreira-retrato-institucional.webp?v=2',
    heroAlt: 'Retrato profissional de Hericles Ferreira, nutricionista em Joinville',
    support: '/img/hericles-ferreira-atendimento-nutricional-joinville.webp?v=2',
    supportAlt: 'Hericles Ferreira durante atendimento nutricional no consultório em Joinville'
  },
  'nutricionista-esportivo-joinville': {
    hero: '/img/hericles-ferreira-retrato-institucional.webp?v=2',
    heroAlt: 'Hericles Ferreira em retrato profissional, nutricionista com atuação em nutrição esportiva',
    support: '/img/hericles-ferreira-retrato-perfil.webp?v=2',
    supportAlt: 'Retrato de Hericles Ferreira, nutricionista em Joinville'
  },
  'consultoria-nutricional-online': {
    hero: '/img/hericles-ferreira-consultoria-online.webp?v=2',
    heroAlt: 'Hericles Ferreira trabalhando no notebook no ambiente de atendimento',
    support: '/img/hericles-ferreira-sofa-profissional.webp?v=2',
    supportAlt: 'Hericles Ferreira sentado em retrato profissional'
  },
  'acompanhamento-nutricional': {
    hero: '/img/hericles-ferreira-atendimento-nutricional-joinville.webp?v=2',
    heroAlt: 'Hericles Ferreira conversando durante atendimento nutricional presencial',
    support: '/img/hericles-ferreira-sofa-profissional.webp?v=2',
    supportAlt: 'Hericles Ferreira, nutricionista, sentado em ambiente profissional'
  }
}
const transformations = [
  ['antes1.png','depois1.png'],
  ['antes11.png','depois11.png'],
  ['antes2.png','depois2.png'],
  ['antes22.png','depois22.png'],
  ['antes3.png','depois3.png'],
  ['antes33.png','depois33.png']
]
function renderTransformations(p) {
  if (!['nutricionista-emagrecimento-joinville','nutricionista-esportivo-joinville'].includes(p.slug)) return ''
  const title = p.slug === 'nutricionista-esportivo-joinville'
    ? 'Evoluções de composição corporal'
    : 'Resultados reais de acompanhamento'
  const text = p.slug === 'nutricionista-esportivo-joinville'
    ? 'Comparativos corporais de pacientes acompanhados. Não representam necessariamente casos de hipertrofia isolada; cada evolução depende do objetivo e da estratégia individual.'
    : 'Registros de antes e depois de pacientes acompanhados. Resultados individuais variam e não representam uma promessa de emagrecimento.'
  return '<section class="svc-section svc-muted svc-results"><div class="svc-wrap"><p class="svc-kicker">Acompanhamento na prática</p><h2>'+title+'</h2><p class="svc-results-note">'+text+'</p><div class="svc-results-grid">'+
    transformations.map(([before,after],i)=>'<div class="svc-results-card"><div class="svc-results-pair"><figure class="svc-results-side"><img src="/img/'+before+'" alt="Registro anterior da evolução corporal '+(i+1)+'" loading="lazy" decoding="async" fetchpriority="low" width="300" height="375"><figcaption>Antes</figcaption></figure><figure class="svc-results-side"><img src="/img/'+after+'" alt="Registro posterior da evolução corporal '+(i+1)+'" loading="lazy" decoding="async" fetchpriority="low" width="300" height="375"><figcaption>Depois</figcaption></figure></div></div>').join('')+
    '</div><p class="svc-results-note">As fotografias ilustram trajetórias individuais. As condições e os resultados variam conforme cada pessoa.</p></div></section>'
}


const homeJourneySteps = [
  ['01','Pré-consulta','Sua consulta começa antes de você chegar','No questionário pré-consulta eu levanto pontos importantes sobre sua saúde, hábitos e rotina. Assim, nosso encontro começa com contexto e aproveitamos melhor cada minuto da consulta.','/img/hericles-ferreira-questionario-pre-consulta-nutricional-joinville.webp','Etapa de pré-consulta do acompanhamento nutricional.'],
  ['02','Consulta','Eu entendo a sua realidade','Em consulta vou entender melhor seu histórico de saúde e comportamento, rotina, exames, dificuldades do dia a dia e tudo o que puder influenciar na sua evolução.','/img/consulta-nutricional-hericles-ferreira-joinville.webp','Consulta nutricional com Hericles Ferreira.'],
  ['03','Avaliação física','Bioimpedância e dobras cutâneas','Realizamos a avaliação física para criar um ponto de partida e acompanhar sua evolução ao longo do processo com dados, contexto e comparação. Sempre realizamos bioimpedância + circunferências + dobras cutâneas.','/img/avaliacao-fisica-bioimpedancia-dobras-cutaneas-joinville.webp','Avaliação física durante o acompanhamento nutricional.'],
  ['04','Plano alimentar','Plano personalizado e individualizado','Após a consulta, eu elaboro o plano inicial da operação com base no que conversamos, respeitando sua rotina, preferências e objetivo.','/img/plano-alimentar-personalizado-hericles-ferreira.webp','Planejamento alimentar individualizado.'],
  ['05','Check-in semanal','Toda sexta-feira','Temos um aplicativo exclusivo de acompanhamento, onde acompanhamos como foi a semana, onde o planejamento funcionou, onde travou e como está sua adesão. Assim conseguimos acompanhar a fase e ajustar o caminho.','/img/check-in-semanal-acompanhamento-nutricional.webp','Check-in semanal do acompanhamento nutricional.'],
  ['06','Suporte','Acompanhamento','Entre os encontros, você tem meu suporte pelo WhatsApp para esclarecer dúvidas e realizar alterações no planejamento quando a rotina pedir um ajuste.','/img/suporte-whatsapp-nutricionista-hericles-ferreira.webp','Hericles Ferreira, nutricionista responsável pelo acompanhamento.'],
  ['07','App exclusivo','Tudo o que construímos fica organizado em um só lugar','No aplicativo você acessa o planejamento alimentar, avaliação física, dados dos nossos encontros e materiais que usamos ao longo da jornada.','/img/aplicativo-acompanhamento-nutricional-plano-alimentar.webp','Acompanhamento nutricional com acesso digital ao planejamento.'],
  ['08','Recursos exclusivos','Caixa de Ferramentas do Nutri','Você também recebe acesso à minha Caixa de Ferramentas, um espaço exclusivo com recursos e materiais pensados para facilitar sua rotina e ajudar a colocar o planejamento nutricional em prática.','/img/caixa-de-ferramentas-nutri-hericles-ferreira.webp','Recursos exclusivos disponíveis durante o acompanhamento nutricional.']
]

const homeResults = [
  {nome:'Leonardo',idade:'24 anos',antes:'85kg',depois:'79,5kg',tempo:'3 meses',perfil:'Falso magro',descricao:'Definição corporal + perda de gordura + ganho de massa',image:'/img/Leonardo.png'},
  {nome:'Daniela',perfil:'Pré-diabetes e hipotireoidismo',descricao:'Reeducação alimentar e emagrecimento com tratamento nutricional em pré-diabetes e hipotireoidismo',image:'/img/Daniela.png'},
  {nome:'Gabriel',idade:'28 anos',antes:'80kg',depois:'74kg',tempo:'3 meses',perfil:'Falso magro',descricao:'Ganho de massa + redução de gordura',image:'/img/Gabriel.png'},
  {nome:'Djonatan',idade:'30 anos',antes:'87kg',depois:'77kg',tempo:'5 meses',perfil:'Falso magro',descricao:'Perda de gordura + definição muscular',image:'/img/Djonatan.png'},
  {nome:'Hericles',idade:'30 anos',antes:'115kg',depois:'84kg',tempo:'5 meses',perfil:'Obesidade',descricao:'Recomposição corporal com maior perda de gordura',image:'/img/Hericles.png'}
]

function renderHomeJourney() {
  const cards = homeJourneySteps.map(([n,eyebrow,title,text,image,alt]) =>
    '<article class="emag-journey-card"><img src="'+image+'" alt="'+esc(alt)+'" loading="lazy" decoding="async"><div class="emag-journey-card__body"><p class="emag-journey-card__eyebrow"><span>'+n+'</span> '+esc(eyebrow)+'</p><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p></div></article>'
  ).join('')
  return '<section class="emag-journey" id="como-funciona"><div class="svc-wrap"><div class="emag-section-intro"><p class="svc-kicker">Seu acompanhamento</p><h2>Sua jornada para <span>emagrecer</span> começa aqui</h2><p>Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para transformar uma consulta em acompanhamento de verdade. E a nossa jornada é assim:</p></div><div class="emag-journey-grid">'+cards+'</div></div></section>'
}

function renderHomeResults() {
  const cards = homeResults.map(item => {
    const stats = [item.idade,item.antes && ('Antes '+item.antes),item.depois && ('Depois '+item.depois)].filter(Boolean).map(x=>'<span>'+esc(x)+'</span>').join('')
    return '<article class="emag-result-card"><div class="emag-result-card__visual"><img src="'+item.image+'" alt="Transformação corporal de '+esc(item.nome)+': comparação antes e depois do acompanhamento nutricional" loading="lazy" decoding="async">'+(item.tempo?'<span class="emag-result-card__time">'+esc(item.tempo)+'</span>':'')+'</div><div class="emag-result-card__body"><div class="emag-result-card__head"><div><h3>'+esc(item.nome)+'</h3><p>'+esc(item.perfil)+'</p></div></div>'+(stats?'<div class="emag-result-card__stats">'+stats+'</div>':'')+'<p class="emag-result-card__desc">'+esc(item.descricao)+'</p></div></article>'
  }).join('')
  return '<section class="emag-results" id="resultados"><div class="svc-wrap"><div class="emag-section-intro emag-section-intro--light"><h2>Transformações reais</h2><p>Histórias reais de pacientes acompanhados. Cada resultado depende do contexto, adesão e características individuais.</p></div><div class="emag-results-grid">'+cards+'</div></div></section>'
}


const homeFaqs = [
  ['Como funciona a consulta nutricional presencial?','Antes da nossa consulta presencial, você recebe nosso questionário pré-consulta. Depois, temos nossa consulta presencial, onde entendemos sua rotina, hábitos alimentares e comportamento. Realizamos a avaliação física e definimos como será seu novo plano alimentar.'],
  ['Como funciona a consultoria online?','A consultoria online começa com um questionário detalhado que substitui a consulta presencial. Com base nas respostas, elaboro seu planejamento alimentar.'],
  ['Preciso cortar pão, arroz e os alimentos de que gosto para emagrecer?','Não necessariamente. O planejamento alimentar considera suas preferências, rotina e necessidades.'],
  ['O acompanhamento inclui contato depois do plano alimentar?','Sim! Além do meu suporte diário por WhatsApp, temos o check-in semanal.'],
  ['É possível ganhar massa muscular e perder gordura?','Sim. Tudo depende do histórico e contexto. Mudanças na composição corporal podem acontecer com planejamento alimentar e treinamento adequados. A estratégia precisa ser individualizada.'],
  ['Você acompanha pessoas que usam Mounjaro, Ozempic ou tirzepatida?','Sim. Acompanho pessoas que fazem uso de medicação para emagrecer. O planejamento nutricional ajuda a organizar a alimentação, avaliar a ingestão de proteínas e lidar com dificuldades nutricionais durante o tratamento.'],
  ['Quanto tempo demora para receber o planejamento alimentar?','Após nossa consulta, o prazo para entrega do planejamento alimentar e orientações nutricionais é de 72h.'],
  ['Onde encontro o plano e as orientações?','Além de receber todo o planejamento e orientações por WhatsApp, você também recebe acesso ao nosso aplicativo Dietitian, onde acessa o plano alimentar, receitas, prescrições e exames.'],
  ['Qual é o endereço do atendimento presencial?','Meu consultório fica na Rua Areia Branca, 1035, Jardim Iririú, em Joinville/SC.']
]

function renderHomeFaq(contactUrl) {
  const items = homeFaqs.map(([q,a]) => '<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')
  return '<section class="svc-section emag-faq"><div class="svc-wrap svc-narrow"><h2>Perguntas frequentes</h2><div class="svc-faq">'+items+'</div><div class="emag-faq__cta"><p>Ainda tem dúvida sobre emagrecimento, hipertrofia ou consultoria online? Me manda mensagem.</p><a class="svc-outline" href="'+contactUrl+'">Falar no WhatsApp</a></div></div></section>'
}

const pages = [
  {
    slug: 'nutricionista-emagrecimento-joinville',
    nav: 'Emagrecimento',
    title: 'Nutricionista para Emagrecimento em Joinville | Hericles Ferreira',
    description: 'Acompanhamento nutricional para emagrecimento em Joinville, com plano alimentar adaptado à sua rotina, avaliação física e check-ins semanais. Conheça o atendimento.',
    label: 'Emagrecimento em Joinville',
    heading: 'Emagrecimento com estratégia, sem dieta maluca',
    intro: 'Emagrecer não precisa significar cortar tudo o que você gosta. O acompanhamento considera sua rotina, preferências, histórico e objetivos para planejar mudanças que façam sentido na vida real.',
    benefits: [
      ['Plano alimentar individualizado', 'Estratégias para reduzir gordura corporal sem transformar cada refeição em uma lista de proibições.'],
      ['Acompanhamento de verdade', 'Check-ins semanais para identificar dificuldades, acompanhar a evolução e orientar ajustes no planejamento.'],
      ['Avaliação da evolução', 'No atendimento presencial, a avaliação física complementa a análise de hábitos, medidas e composição corporal.'],
    ],
    sections: [
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
const footer = '<img class="svc-footer-logo" src="/img/logo-preta.png" alt="Hericles Nutri" width="2000" height="500" decoding="async"><p>Hericles Ferreira · Nutricionista · CRN-10 12284</p><p>' + esc(address) + '</p><p><a href="tel:+5547988602379">(47) 98860-2379</a> · <a href="https://www.instagram.com/nutrihericles/" rel="noopener noreferrer" target="_blank">Instagram</a></p>'
const card = ([title, description]) => '<article class="svc-card"><h3>' + esc(title) + '</h3><p>' + esc(description) + '</p></article>'
function render(p) {
  const photo = photos[p.slug]
  const url = origin + '/' + p.slug + '/'
  const other = pages.filter(x => x.slug !== p.slug).map(x => '<a class="svc-more-link" href="/' + x.slug + '/">' + esc(x.nav) + ' →</a>').join('')
  const questions = p.faqs.map(([q,a]) => '<details><summary>' + esc(q) + '</summary><p>' + esc(a) + '</p></details>').join('')
  const sections = p.sections.map(([h,body]) => '<section class="svc-article"><h2>' + esc(h) + '</h2><p>' + esc(body) + '</p></section>').join('')
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': url + '#webpage', name: p.title, description: p.description, url, inLanguage: 'pt-BR', isPartOf: { '@id': origin + '/#website' }, about: { '@id': origin + '/#professional' }, mainEntity: { '@id': url + '#service' }, breadcrumb: { '@id': url + '#breadcrumbs' } },
      { '@type': 'Service', '@id': url + '#service', name: p.nav, description: p.description, serviceType: p.nav, url, provider: { '@id': origin + '/#business' }, areaServed: [{ '@type': 'City', name: 'Joinville' }, { '@type': 'Country', name: 'Brasil' }] },
      { '@type': 'Person', '@id': origin + '/#professional', name: 'Hericles Ferreira', jobTitle: 'Nutricionista', identifier: 'CRN-10 12284', url: origin + '/sobre-hericles-ferreira/', image: origin + '/img/hericles-ferreira-retrato-perfil.webp', sameAs: ['https://www.instagram.com/nutrihericles/'] },
      { '@type': 'BreadcrumbList', '@id': url + '#breadcrumbs', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: p.nav, item: url }] },
    ]
  }
  return `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}">
<meta name="robots" content="index,follow"><meta name="author" content="Hericles Ferreira">
<link rel="canonical" href="${url}">\n<link rel="preload" as="image" href="${photo.hero}" fetchpriority="high">
<link rel="icon" href="/img/favicon-hericles.png">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${origin}${photo.hero}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/service-pages.css">
<link rel="stylesheet" href="/refresh-pages.css">
<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
</head><body>
${sharedHeader(contact(p.nav))}
<main>
${p.slug === 'nutricionista-emagrecimento-joinville' ? `
<section class="emag-hero">
  <picture class="emag-hero__media" aria-hidden="true">
    <source media="(max-width:768px)" srcset="/img/hero-home-mobile.png">
    <img src="/img/hero-home-desktop.png" alt="" fetchpriority="high" decoding="async">
  </picture>
  <div class="svc-wrap emag-hero__inner">
    <div class="emag-hero__copy">
      <nav class="emag-breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / ${esc(p.nav)}</nav>
      <p class="emag-hero__eyebrow">${esc(p.label)} · CRN-10 12284</p>
      <h1>${esc(p.heading)}</h1>
      <p class="emag-hero__lead">${esc(p.intro)}</p>
      <div class="emag-hero__actions"><a class="svc-button" href="${contact(p.nav)}">Agendar consulta</a><a class="emag-hero__secondary" href="/sobre-hericles-ferreira/">Conheça o meu trabalho</a></div>
    </div>
  </div>
  <div class="emag-stats"><div class="svc-wrap emag-stats__inner"><div><strong>Online & Presencial</strong><span>Joinville/SC</span></div><i></i><div><strong>Até 72h</strong><span>Receba seu plano alimentar em até 72h após sua consulta</span></div><i></i><div><strong>Acompanhamento semanal</strong><span>Para ajustar dieta, treino e evolução</span></div></div></div>
</section>` : `<section class="svc-hero"><div class="svc-wrap svc-hero-grid"><div class="svc-hero-copy">
<nav class="svc-breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / ${esc(p.nav)}</nav>
<p class="svc-eyebrow">${esc(p.label)} · CRN-10 12284</p><h1>${esc(p.heading)}</h1>
<p class="svc-lead">${esc(p.intro)}</p>
<div class="svc-actions"><a class="svc-button" href="${contact(p.nav)}">Quero saber mais pelo WhatsApp</a><a class="svc-outline" href="/sobre-hericles-ferreira/">Conhecer o nutricionista</a></div>
</div><img class="svc-hero-photo" src="${photo.hero}" alt="${esc(photo.heroAlt)}" width="380" height="480" fetchpriority="high" decoding="async"></div></section>`}
${p.slug === 'nutricionista-emagrecimento-joinville' ? renderHomeJourney() : ''}
<section class="svc-section"><div class="svc-wrap"><p class="svc-kicker">O que você encontra</p><h2>Estratégia adaptada à sua realidade</h2><div class="svc-grid">${p.benefits.map(card).join('')}</div></div></section>
${p.slug === 'nutricionista-emagrecimento-joinville' ? '' : `<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow">${sections}<figure class="svc-support-image"><img src="${photo.support}" alt="${esc(photo.supportAlt)}" loading="lazy" decoding="async" width="320" height="420"><figcaption>Hericles Ferreira · Atendimento nutricional individualizado</figcaption></figure></div></section>`}
${p.slug === 'nutricionista-emagrecimento-joinville' ? renderHomeResults() : renderTransformations(p)}
${p.slug === 'nutricionista-emagrecimento-joinville' ? renderHomeFaq(contact(p.nav)) : `<section class="svc-section"><div class="svc-wrap svc-narrow"><p class="svc-kicker">Dúvidas frequentes</p><h2>Perguntas sobre ${esc(p.nav.toLowerCase())}</h2><div class="svc-faq">${questions}</div></div></section>`}
${p.slug === 'nutricionista-emagrecimento-joinville' ? '' : `<section class="svc-section svc-muted"><div class="svc-wrap"><p class="svc-kicker">Outros atendimentos</p><h2>Conheça também</h2><div class="svc-more">${other}</div></div></section>`}
<section class="svc-end"><div class="svc-wrap"><h2>Seu planejamento começa com uma conversa</h2><p>Atendimento presencial em Joinville, na ${esc(address)}, e modalidades online conforme o serviço.</p><a class="svc-button" href="${contact(p.nav)}">Conversar sobre meu objetivo</a></div></section>
</main>${sharedFooter()}
</body></html>`
}

export async function generateServicePages() {
  for (const page of pages) {
    const dir = join('dist', page.slug)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), render(page), 'utf8')
  }
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [origin + '/', ...pages.map(p => origin + '/' + p.slug + '/'), origin + '/artigos/alimentacao-mounjaro-ozempic-tirzepatida/', origin + '/sobre-hericles-ferreira/', origin + '/artigos/', origin + '/artigos/como-emagrecer-sem-passar-fome/', origin + '/artigos/como-perder-gordura-sem-perder-massa-muscular/', origin + '/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/'].map(url => '  <url><loc>' + url + '</loc><lastmod>2026-11-23</lastmod></url>').join('\n') +
    '\n</urlset>\n'
  await writeFile('dist/sitemap.xml', sitemap, 'utf8')
  const html = await readFile('dist/' + pages[0].slug + '/index.html', 'utf8')
  if (!html.includes('application/ld+json') || !html.includes('<h1>')) throw new Error('Página SEO incompleta')
  console.log('SEO: ' + pages.length + ' páginas de serviços geradas.')
}
