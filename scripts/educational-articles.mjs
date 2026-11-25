import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { sharedHeader, sharedFooter } from './shared-layout.mjs'

const base = 'https://www.nutrihericles.com.br'
const author = base + '/#professional'
const img = base + '/img/hericles-ferreira-retrato-perfil.webp'
const image = '/img/hericles-ferreira-sofa-profissional.webp'
const contact = 'https://api.whatsapp.com/send?phone=5547988602379&text=' + encodeURIComponent('Olá, Hericles! Li um artigo do seu site e gostaria de saber mais sobre acompanhamento nutricional.')
const bloggerPosts = JSON.parse(await readFile(new URL('../data/blogger-posts.json', import.meta.url), 'utf8'))

const sanitizeBloggerHtml = (html = '') => String(html)
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
  .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, '')
  .replace(/javascript:/gi, '')
export const articles = [
  {
    slug: 'como-emagrecer-sem-passar-fome',
    nav: 'Emagrecer sem fome',
    title: 'Como emagrecer sem passar fome e sem cortar tudo o que gosta?',
    description: 'É possível emagrecer sem passar fome? Entenda saciedade, volume das refeições e flexibilidade alimentar com orientações do nutricionista Hericles Ferreira.',
    lead: 'Não existe emagrecimento mágico: o balanço energético importa. Mas a maneira de organizar as refeições pode tornar o processo mais satisfatório e sustentável, sem transformar arroz, pão ou encontros com amigos em inimigos.',
    summary: 'Para emagrecer, costuma ser necessário consumir menos energia do que se gasta ao longo do tempo. O segredo de um planejamento viável é adequar porções, combinar alimentos que dão saciedade e manter flexibilidade, em vez de passar o dia inteiro lutando contra a fome.',
    sections: [
      ['Por que algumas dietas deixam você com tanta fome?', [
        'Quando o plano é excessivamente restritivo, a fome pode aumentar e a rotina fica mais difícil de sustentar. O objetivo não é simplesmente comer o mínimo possível: é construir um padrão alimentar que forneça energia e nutrientes adequados e permita um déficit energético compatível com a sua situação.',
        'Dormir pouco, passar muitas horas sem opções práticas de refeição e depender de regras inflexíveis também pode tornar a adesão mais difícil. O que funciona no papel precisa funcionar no trabalho, em casa e no fim de semana.'
      ]],
      ['Volume de comida não é a mesma coisa que quantidade de calorias', [
        'Um prato com vegetais, feijão, uma fonte de proteína e uma porção de arroz pode oferecer bastante volume e saciedade sem precisar excluir os alimentos de que você gosta. Frutas, legumes e outros alimentos ricos em água ou fibras ajudam a compor refeições com menor densidade energética.',
        'Isso não significa que vegetais sejam obrigatórios em toda refeição ou que alimentos mais calóricos estejam proibidos. A ideia é equilibrar quantidades e frequência ao longo do dia.'
      ]],
      ['Proteínas e fibras ajudam, mas não existe alimento milagroso', [
        'Ovos, leite e derivados, feijão, carnes, peixes e outras fontes proteicas podem fazer parte de uma estratégia para controlar a fome e preservar a qualidade da dieta. Frutas, leguminosas, vegetais e cereais integrais contribuem com fibras.',
        'As necessidades de proteínas, calorias e fibras variam. Em pessoas com doenças renais, alterações gastrointestinais ou outras condições clínicas, as recomendações devem ser individualizadas.'
      ]],
      ['Posso continuar comendo pão, arroz e um doce?', [
        'Sim, esses alimentos podem fazer parte de um planejamento para emagrecimento. Não é preciso excluir automaticamente um grupo alimentar para perder gordura. O que conta é a alimentação ao longo do tempo, incluindo porções, frequência e adequação às necessidades.',
        'No consultório, gosto de trabalhar com substituições e combinações que façam sentido para cada pessoa. Se você gosta de arroz e batata, por exemplo, é possível planejar uma refeição com as duas opções, ajustando as quantidades.'
      ]],
      ['O que fazer quando a fome aparece à noite?', [
        'Antes de culpar a falta de força de vontade, vale observar se você comeu muito pouco durante o dia, se as refeições foram pouco satisfatórias ou se existe um padrão de beliscar associado a sono, estresse e rotina.',
        'Uma boa avaliação nutricional procura a causa do problema antes de simplesmente acrescentar mais uma proibição. Fome persistente, episódios frequentes de perda de controle alimentar ou sofrimento com a alimentação merecem avaliação individualizada.'
      ]]
    ],
    faqs: [
      ['Para emagrecer preciso comer de três em três horas?', 'Não existe uma frequência universal. O melhor número e horário de refeições depende da sua rotina, fome, preferências e necessidades.'],
      ['Posso comer carboidrato à noite?', 'Sim. Não é o horário isoladamente que determina o ganho ou perda de gordura, e sim o contexto da alimentação e do gasto energético ao longo do tempo.'],
      ['Uma refeição fora do plano estraga tudo?', 'Não. Um episódio isolado não define o resultado. O mais útil é retomar a rotina e entender o que pode ser ajustado sem compensações extremas.']
    ],
    refs: [
      ['NIDDK: alimentação e atividade física para perder ou manter o peso','https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/eating-physical-activity'],
      ['NIDDK: mitos sobre nutrição e atividade física','https://www.niddk.nih.gov/health-information/weight-management/myths-nutrition-physical-activity']
    ],
    relatedService: '/nutricionista-emagrecimento-joinville/',
    relatedLabel: 'Conhecer o acompanhamento para emagrecimento'
  },
  {
    slug: 'como-perder-gordura-sem-perder-massa-muscular',
    nav: 'Preservar massa muscular',
    title: 'Como perder gordura sem perder massa muscular no emagrecimento?',
    description: 'Saiba por que parte da massa magra pode diminuir durante o emagrecimento e como alimentação, proteína e treino de força ajudam a preservar músculos.',
    lead: 'Perder peso e perder gordura não são sinônimos. Durante o emagrecimento, a atenção à proteína, ao treinamento de força e à evolução corporal ajuda a reduzir a perda de massa muscular.',
    summary: 'Para priorizar a perda de gordura e reduzir a perda muscular, vale combinar um plano alimentar individualizado com ingestão adequada de proteína e treino de força. Não há garantia de preservar 100% da massa magra, e a balança não mostra sozinha o que mudou no corpo.',
    sections: [
      ['Por que a balança não conta toda a história?', [
        'O peso corporal inclui gordura, músculos, água, ossos e outros tecidos. Quando o número da balança diminui, não significa que toda a diferença corresponde a gordura. Parte das mudanças também pode refletir água e massa livre de gordura.',
        'Por isso, além do peso, podemos acompanhar medidas, força, desempenho, rotina e avaliações de composição corporal, interpretando cada método dentro de suas limitações.'
      ]],
      ['É possível emagrecer sem perder absolutamente nenhum músculo?', [
        'O objetivo é minimizar perdas de massa muscular, não prometer que elas nunca acontecerão. A proporção de gordura e massa livre de gordura perdida depende de fatores como idade, composição corporal inicial, intensidade da restrição energética, prática de exercícios e ingestão proteica.',
        'Planos muito agressivos podem dificultar o consumo de nutrientes e prejudicar a recuperação, especialmente quando o paciente também treina.'
      ]],
      ['Quanto de proteína preciso?', [
        'A proteína é importante para a manutenção de tecidos e para a adaptação aos exercícios. A quantidade adequada varia conforme peso, treino, idade, condição clínica, ingestão energética e objetivo.',
        'Em vez de copiar uma meta de proteína de outra pessoa, prefiro ajustar a prescrição ao histórico e à rotina do paciente. A escolha das fontes também pode ser prática: ovos, carnes, laticínios, feijão, soja e outras opções alimentares.'
      ]],
      ['Musculação e treino de força fazem diferença', [
        'Uma revisão sistemática e metanálise publicada em 2025 encontrou benefícios do treinamento resistido para a composição corporal e a força durante programas de perda de peso em adultos com sobrepeso ou obesidade.',
        'A frequência, intensidade e progressão devem respeitar a capacidade individual. Para quem está começando ou possui limitações, o treinamento precisa ser orientado por profissional habilitado.'
      ]],
      ['E quando a pessoa utiliza Mounjaro ou Ozempic?', [
        'Medicamentos que reduzem o apetite podem tornar mais difícil atingir uma ingestão adequada de proteína e energia. O cuidado nutricional inclui verificar o que a pessoa está conseguindo comer, a tolerância digestiva e a evolução da composição corporal.',
        'O medicamento não substitui o plano alimentar ou o exercício, e qualquer prescrição ou ajuste medicamentoso depende do médico responsável.'
      ]]
    ],
    faqs: [
      ['Preciso tomar whey para preservar músculos?', 'Não necessariamente. Suplementos são ferramentas opcionais quando ajudam a atingir necessidades individuais; a alimentação pode ser suficiente.'],
      ['Cardio faz perder músculo?', 'Exercícios aeróbicos não provocam obrigatoriamente perda muscular. O contexto de alimentação, recuperação e treinamento de força importa.'],
      ['É possível ganhar músculo enquanto perde gordura?', 'Em algumas situações, especialmente em pessoas que começam ou retomam o treino, as duas mudanças podem acontecer ao mesmo tempo. A resposta é individual.']
    ],
    refs: [
      ['Revisão sistemática sobre treinamento resistido durante perda de peso, 2025','https://pubmed.ncbi.nlm.nih.gov/40909191/'],
      ['Diretriz VA/DOD para manejo do sobrepeso e obesidade, 2025','https://www.healthquality.va.gov/HEALTHQUALITY/guidelines/CD/obesity/OBE-CPG_2025-Guideline_final_20251105.pdf'],
      ['NIDDK: escolhas alimentares e atividade física para controle do peso','https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/eating-physical-activity']
    ],
    relatedService: '/nutricionista-esportivo-joinville/',
    relatedLabel: 'Conhecer o atendimento para composição corporal'
  },
  {
    slug: 'porque-parei-de-emagrecer-mesmo-fazendo-dieta',
    nav: 'Estagnação do peso',
    title: 'Por que parei de emagrecer mesmo fazendo dieta?',
    description: 'O peso parou de baixar? Entenda adaptações do metabolismo, retenção de líquidos, adesão ao plano alimentar e quando revisar a estratégia.',
    lead: 'A estagnação do peso não significa automaticamente que seu metabolismo está “quebrado”. À medida que o corpo muda, o gasto energético e a rotina também podem mudar. E nem toda semana sem queda na balança representa um platô verdadeiro.',
    summary: 'O peso pode oscilar por água, conteúdo intestinal e outros fatores. Com a perda de peso, o gasto energético tende a diminuir; por isso, uma estratégia que funcionava antes pode deixar de gerar o mesmo déficit. Vale observar tendências ao longo de várias semanas e revisar hábitos e medidas antes de restringir mais a comida.',
    sections: [
      ['Primeiro: alguns dias sem perder peso não são estagnação', [
        'O peso varia por hidratação, sal, ciclo menstrual, conteúdo intestinal, treino e outras condições. Uma medição isolada não representa necessariamente mudança na gordura corporal.',
        'Por isso, prefiro olhar uma sequência de medidas em condições semelhantes, junto de circunferências, evolução clínica e comportamento alimentar.'
      ]],
      ['O corpo passa a gastar menos energia?', [
        'Sim, em geral um corpo menor precisa de menos energia para se movimentar e se manter. Durante o emagrecimento também podem ocorrer adaptações fisiológicas que tornam a progressão mais lenta.',
        'Isso não quer dizer que o metabolismo parou, nem que seja necessário seguir dietas cada vez mais restritivas. Significa que o planejamento talvez precise de revisão, considerando a realidade atual.'
      ]],
      ['A dieta continua sendo seguida como antes?', [
        'A rotina muda. Porções podem crescer sem perceber, bebidas e beliscos podem se acumular, finais de semana podem ser diferentes e atividades físicas podem diminuir. Esses fatores não devem ser tratados como falhas morais, mas como informações úteis para ajustar a estratégia.',
        'No acompanhamento, o check-in semanal serve justamente para identificar obstáculos e retomar decisões mais viáveis. Muitas vezes, organizar a rotina ajuda mais do que reduzir drasticamente as calorias.'
      ]],
      ['Sono, estresse e atividade física também entram na conta', [
        'O sono e o estresse podem influenciar fome, disposição e adesão. Além disso, durante uma dieta algumas pessoas se movimentam menos fora dos treinos, o que altera o gasto energético total.',
        'Quando necessário, revisamos caminhada, treinos, horários, planejamento das refeições e disponibilidade de alimentos, sem usar o exercício como punição pelo que foi comido.'
      ]],
      ['O que fazer antes de cortar ainda mais calorias?', [
        'Confirme a tendência do peso, revise a consistência do plano, avalie sua fome e energia, observe medidas e resultados funcionais. Se a evolução estiver realmente estável por tempo prolongado, vale discutir mudanças graduais na estratégia.',
        'Em casos de sintomas persistentes, suspeitas de alterações clínicas ou uso de medicamentos, é importante trabalhar em conjunto com a equipe de saúde. Uma orientação generalizada pela internet não substitui essa investigação.'
      ]]
    ],
    faqs: [
      ['Quanto tempo parado é considerado platô?', 'Não existe uma regra universal para todos. Alguns dias sem mudança não bastam; a tendência de várias semanas, o contexto e a adesão devem ser avaliados.'],
      ['Devo fazer jejum ou cortar carboidratos para voltar a emagrecer?', 'Não necessariamente. Nenhuma dessas medidas é obrigatória; primeiro é melhor entender as causas da estagnação e revisar o planejamento.'],
      ['Se meu peso não cai, posso estar perdendo gordura?', 'Sim, em algumas situações mudanças em água e massa muscular podem mascarar alterações na gordura. Medidas e composição corporal ajudam na interpretação.']
    ],
    refs: [
      ['NIDDK: manutenção do peso e mudanças no gasto energético','https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/eating-physical-activity'],
      ['Physiology of the weight-loss plateau, 2024','https://pubmed.ncbi.nlm.nih.gov/38644683/'],
      ['Management of Weight Loss Plateau, NCBI Bookshelf','https://www.ncbi.nlm.nih.gov/books/NBK576400/']
    ],
    relatedService: '/acompanhamento-nutricional/',
    relatedLabel: 'Conhecer o acompanhamento nutricional'
  }
]

const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const linked = (a) => '/artigos/' + a.slug + '/'
const refMarkup = refs => refs.map(([label,url]) => '<li><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a></li>').join('')
const articleLinks = (current) => articles.filter(a => a.slug !== current).map(a=>'<a class="svc-more-link" href="'+linked(a)+'">'+esc(a.nav)+' →</a>').join('')
function shell(head, content) { return '<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+head+'<link rel="icon" type="image/png" href="/img/favicon-hericles.png"><link rel="stylesheet" href="/service-pages.css"><link rel="stylesheet" href="/refresh-pages.css"></head><body>'+content+'</body></html>' }
function render(article) {
  const url = base + linked(article)
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type':'Article','@id':url+'#article',headline:article.title,description:article.description,inLanguage:'pt-BR',
        author: {'@id':author},publisher:{'@id':base+'/#business'},datePublished:'2026-11-23',dateModified:'2026-11-23',
        image:img, mainEntityOfPage:{'@id':url+'#webpage'}},
      { '@type':'WebPage','@id':url+'#webpage',url,name:article.title,inLanguage:'pt-BR',description:article.description,
        isPartOf:{'@id':base+'/#website'},about:{'@id':author},breadcrumb:{'@id':url+'#breadcrumbs'}},
      { '@type':'Person','@id':author,name:'Hericles Ferreira',jobTitle:'Nutricionista',identifier:'CRN-10 12284',
        url:base+'/sobre-hericles-ferreira/',image:img},
      { '@type':'BreadcrumbList','@id':url+'#breadcrumbs',itemListElement:[
        {'@type':'ListItem',position:1,name:'Início',item:base+'/'},
        {'@type':'ListItem',position:2,name:'Artigos',item:base+'/artigos/'},
        {'@type':'ListItem',position:3,name:article.nav,item:url}
      ]}
    ]
  }
  const head = '<title>'+esc(article.title)+' | Hericles Ferreira Nutricionista</title>'+
    '<meta name="description" content="'+esc(article.description)+'"><meta name="robots" content="index,follow">'+
    '<link rel="canonical" href="'+url+'">'+
    '<meta property="og:type" content="article"><meta property="og:locale" content="pt_BR">'+
    '<meta property="og:title" content="'+esc(article.title)+'"><meta property="og:description" content="'+esc(article.description)+'">'+
    '<meta property="og:url" content="'+url+'"><meta property="og:image" content="'+img+'">'+
    '<meta name="twitter:card" content="summary_large_image">'+
    '<script type="application/ld+json">'+JSON.stringify(graph).replaceAll('<','\\u003c')+'</script>'
  const sections = article.sections.map(([h,paras])=>'<section class="svc-article"><h2>'+esc(h)+'</h2>'+paras.map(p=>'<p>'+esc(p)+'</p>').join('')+'</section>').join('')
  const faq = article.faqs.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')
  const header = sharedHeader(contact)
  return shell(head,header+'<main><article>'+
    '<section class="svc-hero"><div class="svc-wrap svc-narrow"><nav class="svc-breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / <a href="/artigos/">Artigos</a> / '+esc(article.nav)+'</nav>'+
    '<p class="svc-eyebrow">Artigo educativo · Nutrição baseada em evidências</p><h1>'+esc(article.title)+'</h1><p class="svc-lead">'+esc(article.lead)+'</p>'+
    '<div class="svc-author-mini"><img src="/img/hericles-ferreira-retrato-perfil.webp" alt="Retrato profissional de Hericles Ferreira" width="82" height="82" decoding="async">'+
    '<p><strong><a href="/sobre-hericles-ferreira/">Hericles Ferreira</a></strong><br>Nutricionista, CRN-10 12284 · Pós-graduado em Metabolismo e Emagrecimento<br><small>Publicado em 23/11/2026</small></p></div></div></section>'+
    '<section class="svc-section"><div class="svc-wrap svc-narrow"><p class="svc-kicker">Resposta direta</p><h2>O que você precisa saber</h2><p>'+esc(article.summary)+'</p></div></section>'+
    '<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow">'+sections+'</div></section>'+
    '<section class="svc-section"><div class="svc-wrap svc-narrow"><p class="svc-kicker">Perguntas frequentes</p><h2>Dúvidas sobre o assunto</h2><div class="svc-faq">'+faq+'</div></div></section>'+
    '<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow"><p class="svc-kicker">Fontes e responsabilidade editorial</p><h2>Referências utilizadas</h2><p>Conteúdo educativo de Hericles Ferreira, CRN-10 12284. As orientações gerais não substituem avaliação nutricional ou médica individual. Não há garantia de resultados específicos.</p><ul class="ed-references">'+refMarkup(article.refs)+'</ul>'+
    '<h2 style="margin-top:40px">Outros artigos que podem ajudar</h2><div class="svc-more">'+articleLinks(article.slug)+'</div></div></section>'+
    '<section class="svc-end"><div class="svc-wrap"><h2>Sua estratégia precisa caber na sua vida</h2><p>Atendimento presencial em Joinville e consultoria nutricional online, conforme a necessidade de cada pessoa.</p><a class="svc-button" href="'+contact+'">Conversar sobre meu objetivo</a><p class="ed-link"><a href="'+article.relatedService+'">'+esc(article.relatedLabel)+' →</a></p></div></section>'+
    '</article></main>'+sharedFooter())
}
function renderBlogger(post) {
  const path = '/artigos/' + post.slug + '/'
  const url = base + path
  const published = post.published ? new Date(post.published).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ''
  const graph = {
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'Article','@id':url+'#article',headline:post.title,description:post.description,inLanguage:'pt-BR',
        author:{'@id':author},publisher:{'@id':base+'/#business'},datePublished:post.published,dateModified:post.updated||post.published,
        image:post.image||img,mainEntityOfPage:{'@id':url+'#webpage'}},
      {'@type':'WebPage','@id':url+'#webpage',url,name:post.title,description:post.description,inLanguage:'pt-BR',
        isPartOf:{'@id':base+'/#website'},about:{'@id':author},breadcrumb:{'@id':url+'#breadcrumbs'}},
      {'@type':'Person','@id':author,name:'Hericles Ferreira',jobTitle:'Nutricionista',identifier:'CRN-10 12284',
        url:base+'/sobre-hericles-ferreira/',image:img},
      {'@type':'BreadcrumbList','@id':url+'#breadcrumbs',itemListElement:[
        {'@type':'ListItem',position:1,name:'Início',item:base+'/'},
        {'@type':'ListItem',position:2,name:'Artigos',item:base+'/artigos/'},
        {'@type':'ListItem',position:3,name:post.title,item:url}
      ]}
    ]
  }
  const head = '<title>'+esc(post.title)+' | Hericles Ferreira Nutricionista</title>'+
    '<meta name="description" content="'+esc(post.description)+'"><meta name="robots" content="index,follow">'+
    '<link rel="canonical" href="'+url+'">'+
    '<meta property="og:type" content="article"><meta property="og:locale" content="pt_BR">'+
    '<meta property="og:title" content="'+esc(post.title)+'"><meta property="og:description" content="'+esc(post.description)+'">'+
    '<meta property="og:url" content="'+url+'"><meta property="og:image" content="'+esc(post.image||img)+'">'+
    '<meta name="twitter:card" content="summary_large_image">'+
    '<script type="application/ld+json">'+JSON.stringify(graph).replaceAll('<','\\u003c')+'</script>'
  const heroImage = post.image ? '<figure class="svc-support-image"><img src="'+esc(post.image)+'" alt="" loading="eager" decoding="async"></figure>' : ''
  const labels = post.labels?.length ? '<p class="svc-kicker">'+post.labels.map(esc).join(' · ')+'</p>' : '<p class="svc-kicker">Artigo educativo</p>'
  const header = sharedHeader(contact)
  return shell(head, header+'<main><article>'+
    '<section class="svc-hero"><div class="svc-wrap svc-narrow"><nav class="svc-breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / <a href="/artigos/">Artigos</a> / '+esc(post.title)+'</nav>'+
    labels+'<h1>'+esc(post.title)+'</h1><p class="svc-lead">'+esc(post.description)+'</p>'+heroImage+
    '<div class="svc-author-mini"><img src="/img/hericles-ferreira-retrato-perfil.webp" alt="Retrato profissional de Hericles Ferreira" width="82" height="82" decoding="async">'+
    '<p><strong><a href="/sobre-hericles-ferreira/">Hericles Ferreira</a></strong><br>Nutricionista, CRN-10 12284 · Pós-graduado em Metabolismo e Emagrecimento'+(published?'<br><small>Publicado em '+published+'</small>':'')+'</p></div></div></section>'+
    '<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow"><div class="svc-article blogger-article">'+sanitizeBloggerHtml(post.contentHtml)+'</div></div></section>'+
    '<section class="svc-end"><div class="svc-wrap"><h2>Sua estratégia precisa caber na sua vida</h2><p>Atendimento presencial em Joinville e consultoria nutricional online.</p><a class="svc-button" href="'+contact+'">Conversar sobre meu objetivo</a></div></section>'+
    '</article></main>'+sharedFooter())
}

function renderIndex(){
  const url=base+'/artigos/'
  const schema={'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':url+'#webpage',url,name:'Artigos de nutrição | Hericles Ferreira',description:'Conteúdos educativos sobre emagrecimento e composição corporal.',inLanguage:'pt-BR',isPartOf:{'@id':base+'/#website'},about:{'@id':author}},
    {'@type':'Person','@id':author,name:'Hericles Ferreira',jobTitle:'Nutricionista',identifier:'CRN-10 12284',url:base+'/sobre-hericles-ferreira/'},
    {'@type':'BreadcrumbList','@id':url+'#breadcrumbs',itemListElement:[{'@type':'ListItem',position:1,name:'Início',item:base+'/'},{'@type':'ListItem',position:2,name:'Artigos',item:url}]}
  ]}
  const head='<title>Artigos de Nutrição e Emagrecimento | Hericles Ferreira</title>'+
    '<meta name="description" content="Artigos educativos de Hericles Ferreira, nutricionista em Joinville, sobre emagrecimento, composição corporal e alimentação real.">'+
    '<link rel="canonical" href="'+url+'"><meta name="robots" content="index,follow">'+
    '<script type="application/ld+json">'+JSON.stringify(schema)+'</script>'

  const strategic = [
    {
      href:'/artigos/como-emagrecer-sem-passar-fome/',
      category:'Emagrecimento',
      title:'Como emagrecer sem passar fome?',
      description:'Volume, saciedade e flexibilidade alimentar para construir uma rotina que realmente seja possível manter.',
      image:'/img/hericles-ferreira-atendimento-nutricional-joinville.webp?v=2',
      alt:'Hericles Ferreira durante atendimento nutricional em Joinville'
    },
    {
      href:'/artigos/como-perder-gordura-sem-perder-massa-muscular/',
      category:'Composição corporal',
      title:'Como perder gordura sem perder massa muscular?',
      description:'Proteína, treinamento e estratégia nutricional para preservar massa muscular durante o emagrecimento.',
      image:'/img/avaliacao-fisica-bioimpedancia-dobras-cutaneas-joinville.webp',
      alt:'Avaliação de composição corporal durante acompanhamento nutricional'
    },
    {
      href:'/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/',
      category:'Metabolismo',
      title:'Por que parei de emagrecer mesmo fazendo dieta?',
      description:'O que vale a pena observar antes de simplesmente comer menos ou aumentar ainda mais as restrições.',
      image:'/img/plano-alimentar-personalizado-hericles-ferreira.webp',
      alt:'Planejamento alimentar personalizado elaborado por Hericles Ferreira'
    },
    {
      href:'/artigos/alimentacao-mounjaro-ozempic-tirzepatida/',
      category:'Tratamento e alimentação',
      title:'Alimentação durante o uso de Mounjaro, Ozempic e tirzepatida',
      description:'Como organizar a alimentação, preservar massa muscular e lidar com dificuldades nutricionais durante o tratamento.',
      image:'/img/aplicativo-acompanhamento-nutricional-plano-alimentar.webp',
      alt:'Acompanhamento nutricional e planejamento alimentar'
    }
  ]

  const blogger = bloggerPosts.map(post=>({
    href:'/artigos/'+post.slug+'/',
    category:post.labels?.[0] || 'Nutrição',
    title:post.title,
    description:post.description,
    image:post.image || '/img/hericles-ferreira-retrato-institucional.webp',
    alt:post.title
  }))

  strategic[0].markers=['Emagrecimento']
  strategic[1].markers=['Emagrecimento','Esportiva']
  strategic[2].markers=['Emagrecimento']
  strategic[3].markers=['Emagrecimento','Medicamentos']
  blogger.forEach((item,index)=>{ item.markers = bloggerPosts[index]?.labels || [] })

  const items=[...strategic,...blogger.filter(post=>!strategic.some(item=>item.href===post.href))]
  const normalizeMarker=value=>String(value||'').trim().toLocaleLowerCase('pt-BR')
  const markers=[...new Set(items.flatMap(item=>item.markers||[]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR'))
  const filters='<div class="articles-index-filters" aria-label="Filtrar artigos por marcador">'+
    '<button type="button" class="articles-index-filter is-active" data-article-filter="todos" aria-pressed="true">Todos</button>'+
    markers.map(marker=>'<button type="button" class="articles-index-filter" data-article-filter="'+esc(normalizeMarker(marker))+'" aria-pressed="false">'+esc(marker)+'</button>').join('')+
  '</div>'

  const cards=items.map((item,index)=>
    '<article class="articles-index-card'+(index>=6?' is-hidden':'')+'" data-article-card data-markers="'+esc((item.markers||[]).map(normalizeMarker).join('|'))+'">'+
      '<a class="articles-index-card__cover" href="'+esc(item.href)+'" aria-label="Ler artigo '+esc(item.title)+'">'+
        '<div class="articles-index-card__image"><img src="'+esc(item.image)+'" alt="'+esc(item.alt)+'" loading="lazy" decoding="async"></div>'+
        '<div class="articles-index-card__body">'+
          '<div class="articles-index-card__meta"><span>'+esc(item.category)+'</span><span>Hericles Ferreira</span></div>'+
          '<h2>'+esc(item.title)+'</h2>'+
          '<p>'+esc(item.description)+'</p>'+
          '<span class="articles-index-card__link">Ler artigo →</span>'+
        '</div>'+
      '</a>'+
    '</article>'
  ).join('')

  const moreButton=items.length>6
    ? '<div class="articles-index-more"><button type="button" id="articles-index-more">Mostrar mais</button></div>'
    : ''

  const behavior='<script>(function(){const cards=[...document.querySelectorAll("[data-article-card]")];const filters=[...document.querySelectorAll("[data-article-filter]")];const more=document.getElementById("articles-index-more");let active="todos";let visible=6;function matches(card){if(active==="todos")return true;return (card.dataset.markers||"").split("|").includes(active)}function render(){let shown=0,total=0;cards.forEach(card=>{const ok=matches(card);if(ok)total++;const display=ok&&shown<visible;if(display)shown++;card.classList.toggle("is-hidden",!display)});if(more)more.style.display=total>visible?"inline-flex":"none"}filters.forEach(btn=>btn.addEventListener("click",function(){active=this.dataset.articleFilter;visible=6;filters.forEach(x=>{const on=x===this;x.classList.toggle("is-active",on);x.setAttribute("aria-pressed",on?"true":"false")});render()}));if(more)more.addEventListener("click",function(){visible+=6;render()});render();})();</script>'

  return shell(head,sharedHeader(contact)+
   '<main><section class="svc-hero"><div class="svc-wrap"><p class="svc-eyebrow">Leituras do Nutri</p><h1>Artigos que escrevi recentemente</h1><p class="svc-lead">Aqui você encontra informação clara e didática, com referências confiáveis e estratégias que fazem sentido na vida real.</p><p class="articles-index-author">Por Hericles Ferreira | Nutricionista CRN 10 12284</p></div></section>'+
   '<section class="svc-section articles-index"><div class="svc-wrap">'+filters+'<div class="articles-index-grid">'+cards+'</div>'+moreButton+'</div></section></main>'+
   sharedFooter()+behavior)
}
export async function generateEducationalArticles(){
  const indexDir=join('dist','artigos')
  await mkdir(indexDir,{recursive:true})
  await writeFile(join(indexDir,'index.html'),renderIndex(),'utf8')
  for(const article of articles){
    const path=join(indexDir,article.slug)
    await mkdir(path,{recursive:true})
    await writeFile(join(path,'index.html'),render(article),'utf8')
  }
  for(const post of bloggerPosts){
    const path=join(indexDir,post.slug)
    await mkdir(path,{recursive:true})
    await writeFile(join(path,'index.html'),renderBlogger(post),'utf8')
  }
  console.log('SEO: biblioteca, '+articles.length+' artigos nativos e '+bloggerPosts.length+' artigo(s) do Blogger gerados.')
}
