import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const origin = 'https://www.nutrihericles.com.br'
const slug = 'alimentacao-mounjaro-ozempic-tirzepatida'
const url = origin + '/' + slug + '/'
const title = 'Alimentação com Mounjaro, Ozempic e Tirzepatida | Nutricionista'
const description = 'O que comer durante o uso de Mounjaro, Ozempic e tirzepatida? Guia de Hericles Ferreira sobre proteínas, náuseas, hidratação e preservação muscular.'
const whatsapp = 'https://api.whatsapp.com/send?phone=5547988602379&text=' + encodeURIComponent('Olá, Hericles! Li seu artigo sobre alimentação durante o uso de medicamentos para emagrecimento e quero saber sobre acompanhamento nutricional.')
const medicalSource = 'https://diabetesjournals.org/care/article/49/Supplement_1/S166/163915/8-Obesity-and-Weight-Management-for-the-Prevention'
const anvisaSource = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-determina-apreensao-de-canetas-emagrecedoras-sem-registro-sanitario'
const tgSource = 'https://vigilanciasanitaria.saude.sc.gov.br/index.php/component/content/article/alerta-divs-n-03-2026-riscos-a-saude-provenientes-do-uso-de-medicamentos-emagrecedores-a-base-de-tirzepatida-e-retatrutida.html?Itemid=109&catid=11'
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', '@id': url + '#artigo', headline: title, description, inLanguage: 'pt-BR',
      datePublished: '2026-11-23', dateModified: '2026-11-23',
      author: { '@id': origin + '/#professional' },
      publisher: { '@type': 'Organization', name: 'Hericles Ferreira Nutricionista', url: origin + '/' },
      mainEntityOfPage: { '@id': url + '#webpage' },
      citation: [medicalSource, anvisaSource, tgSource] },
    { '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description, inLanguage: 'pt-BR' },
    { '@type': 'Person', '@id': origin + '/#professional', name: 'Hericles Ferreira', jobTitle: 'Nutricionista',
      identifier: 'CRN-10 12284', url: origin + '/', sameAs: ['https://www.instagram.com/nutrihericles/'] },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: origin + '/' },
      { '@type': 'ListItem', position: 2, name: 'Alimentação e medicamentos para emagrecimento', item: url }
    ]}
  ]
}
const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="index,follow">
<meta name="author" content="Hericles Ferreira">
<link rel="canonical" href="${url}">
<link rel="icon" href="/img/logo-light.ico">
<meta property="og:type" content="article"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/img/hericlesnutri1.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/service-pages.css">
<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
</head><body>
<header class="svc-header"><div class="svc-wrap svc-header-row"><a class="svc-brand" href="/">HERICLES<span> NUTRI</span></a>
<nav aria-label="Navegação"><a href="/nutricionista-emagrecimento-joinville/">Emagrecimento</a><a href="/acompanhamento-nutricional/">Acompanhamento</a><a href="/consultoria-nutricional-online/">Consultoria online</a></nav><a class="svc-header-cta" href="${whatsapp}">Agendar</a></div></header>
<main>
<article>
<section class="svc-hero"><div class="svc-wrap svc-narrow">
<nav class="svc-breadcrumb" aria-label="Caminho de navegação"><a href="/">Início</a> / Artigo sobre alimentação e medicamentos</nav>
<p class="svc-eyebrow">Nutrição e tratamento medicamentoso para emagrecimento</p>
<h1>O que comer durante o uso de Mounjaro, Ozempic e tirzepatida?</h1>
<p class="svc-lead">A medicação pode ajudar a controlar o apetite, mas a alimentação continua importante para sua saúde, energia, composição corporal e manutenção dos resultados.</p>
<p><strong>Por Hericles Ferreira</strong> · Nutricionista, CRN-10 12284 · Pós-graduado em Metabolismo e Emagrecimento · Atualizado em 23/11/2026</p>
<div class="svc-actions"><a class="svc-button" href="${whatsapp}">Quero acompanhamento nutricional</a></div>
</div></section>

<section class="svc-section"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Artigo e orientações práticas</p>
<h2>O medicamento não substitui o acompanhamento alimentar</h2>
<p>A semaglutida, presente em medicamentos como Ozempic e Wegovy, atua nos receptores de GLP-1. A tirzepatida, princípio ativo de Mounjaro, atua nos receptores de GIP e GLP-1. Essas terapias podem reduzir o apetite e modificar o esvaziamento gástrico. A escolha do tratamento, suas indicações e a prescrição devem ser avaliadas pelo médico.</p>
<p style="margin-top:16px">Com menos fome, é possível acabar consumindo menos proteína, fibras, líquidos e outros nutrientes do que o necessário. Por isso, o acompanhamento nutricional não se resume a fazer o peso baixar: ele ajuda a organizar uma alimentação viável durante o tratamento.</p>
<h2 style="margin-top:36px">O que costuma mudar na alimentação?</h2>
<div class="svc-grid">
<article class="svc-card"><h3>Menos apetite</h3><p>Refeições menores podem facilitar o conforto, mas é preciso avaliar se a ingestão total continua adequada.</p></article>
<article class="svc-card"><h3>Digestão mais lenta</h3><p>Pratos grandes ou muito gordurosos podem piorar náuseas, refluxo e sensação de estômago cheio.</p></article>
<article class="svc-card"><h3>Atenção aos músculos</h3><p>Durante a perda de peso, parte da massa livre de gordura também pode diminuir. Alimentação e exercícios de força merecem atenção.</p></article>
</div>
</div></section>

<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Minha orientação aos pacientes</p>
<h2>Proteína: uma prioridade durante o emagrecimento</h2>
<p>Com a redução do apetite, pode ficar mais difícil consumir proteína suficiente. Alimentos como ovos, peixes, frango, carnes magras, iogurtes e opções vegetais proteicas podem ajudar. A quantidade adequada depende da avaliação nutricional, do peso, da condição clínica e da rotina.</p>
<p style="margin-top:16px">A preservação de massa muscular envolve também treinamento de força, quando possível e liberado, além do acompanhamento da evolução corporal. A perda de peso na balança não conta toda a história.</p>

<h2 style="margin-top:40px">Hidratação e fibras continuam importantes</h2>
<p>Manter uma ingestão de líquidos compatível com suas necessidades é especialmente importante quando há náuseas, vômitos, diarreia ou constipação. Beber em pequenos goles ao longo do dia pode ser mais confortável. A meta de água é individual, e 2 litros não é uma regra para todas as pessoas.</p>
<p style="margin-top:16px">Para a constipação, vale avaliar a ingestão de água, frutas, vegetais, leguminosas e fibras, aumentando-as progressivamente conforme tolerância. Se os sintomas persistirem, converse com a equipe responsável.</p>

<h2 style="margin-top:40px">Náuseas, refluxo e refeições pesadas: como lidar?</h2>
<div class="svc-grid">
<article class="svc-card"><h3>Náuseas</h3><p>Experimente refeições menores e mais lentas, preparações leves e alimentos frios ou em temperatura ambiente, se forem melhor tolerados.</p></article>
<article class="svc-card"><h3>Refluxo e azia</h3><p>Evite deitar logo após comer e observe se refeições volumosas, muito gordurosas ou alimentos específicos agravam os sintomas.</p></article>
<article class="svc-card"><h3>Constipação</h3><p>Revise ingestão de líquidos, fibras e atividade física. Ajustes devem respeitar tolerância e possíveis condições de saúde.</p></article>
</div>
<p style="margin-top:22px">Não é necessário proibir alimentos indiscriminadamente. O objetivo é identificar quais escolhas e volumes são mais confortáveis e oferecem boa qualidade nutricional.</p>
</div></section>

<section class="svc-section"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Atenção à segurança</p>
<h2>Quando procurar atendimento médico?</h2>
<p>Procure orientação médica diante de vômitos persistentes, dificuldade de manter líquidos, sinais de desidratação, fraqueza importante, tonturas frequentes ou suspeita de hipoglicemia. Dor abdominal intensa ou persistente, especialmente se irradiar para as costas, exige avaliação médica urgente.</p>
<p style="margin-top:18px">Não altere, suspenda ou inicie medicamentos por conta própria. Se você usa medicamentos para diabetes, a equipe médica deve avaliar o risco de hipoglicemia e eventuais ajustes de tratamento.</p>

<h2 style="margin-top:42px">E quanto a TG, Lipoless e outras marcas de tirzepatida?</h2>
<p>É importante distinguir princípios ativos de nomes comerciais e verificar a regularidade sanitária de cada produto. A Anvisa e a Vigilância Sanitária de Santa Catarina publicaram alertas e medidas de apreensão envolvendo produtos identificados como TG e Lipoless. Esses nomes não devem ser tratados automaticamente como equivalentes aprovados de Mounjaro.</p>
<p style="margin-top:16px">Antes de utilizar qualquer produto, confirme com o médico e o farmacêutico sua procedência, registro e condições de uso. Produtos de origem irregular podem representar riscos adicionais.</p>

<h2 style="margin-top:42px">Quem está pensando em começar o tratamento precisa de nutricionista?</h2>
<p>A avaliação nutricional pode ser útil antes, durante e depois do tratamento. Ela ajuda a identificar hábitos, necessidades nutricionais, objetivos e estratégias para o período em que o apetite pode mudar. O nutricionista não substitui o médico responsável pela indicação ou prescrição de medicamentos.</p>
</div></section>

<section class="svc-section svc-muted"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Perguntas frequentes</p><h2>Dúvidas sobre alimentação e canetas emagrecedoras</h2>
<div class="svc-faq">
<details><summary>Quem usa Mounjaro precisa comer proteína?</summary><p>Sim. A ingestão proteica adequada faz parte do cuidado nutricional e deve ser individualizada, especialmente durante a perda de peso.</p></details>
<details><summary>Posso usar polivitamínico por conta própria?</summary><p>Não é necessário suplementar automaticamente. A indicação depende da avaliação alimentar, dos sintomas, de exames quando apropriados e da condição clínica.</p></details>
<details><summary>Se estou sem fome, posso simplesmente pular todas as refeições?</summary><p>Ingestão muito baixa por períodos prolongados pode comprometer proteínas, energia e micronutrientes. Converse com a equipe para ajustar volumes e distribuição das refeições.</p></details>
<details><summary>Nutricionista pode prescrever tirzepatida ou semaglutida?</summary><p>Não. A indicação e a prescrição desses medicamentos são de responsabilidade médica. O acompanhamento nutricional atua de forma complementar.</p></details>
</div>
</div></section>

<section class="svc-section"><div class="svc-wrap svc-narrow">
<p class="svc-kicker">Sobre o autor</p>
<h2>Hericles Ferreira, nutricionista em Joinville</h2>
<p>Sou nutricionista registrado no CRN-10 sob o número 12284, formado pela Católica-SC e pós-graduado em Metabolismo e Emagrecimento pela Faculdade Uniguaçu. Meu trabalho busca encaixar o planejamento alimentar na realidade de cada paciente, sem terrorismo alimentar.</p>
<p style="margin-top:16px">Atendo presencialmente em Joinville, na Rua Areia Branca, 1035, Jardim Iririú, e ofereço consultoria nutricional online. O acompanhamento pode incluir planejamento personalizado, check-ins semanais, suporte e ajustes de acordo com a modalidade contratada.</p>
<h2 style="margin-top:36px">Referências e atualização</h2>
<p>Este artigo adapta orientações educativas entregues aos meus pacientes e foi revisado com base em diretrizes e informações de órgãos reguladores. As orientações gerais não substituem avaliação individual.</p>
<ul style="padding-left:22px">
<li><a style="color:var(--lime);text-decoration:underline" href="${medicalSource}" target="_blank" rel="noopener noreferrer">American Diabetes Association: Standards of Care in Diabetes, 2026 (obesidade e controle do peso)</a>.</li>
<li><a style="color:var(--lime);text-decoration:underline" href="${anvisaSource}" target="_blank" rel="noopener noreferrer">Anvisa: apreensão de canetas emagrecedoras sem registro, 2026</a>.</li>
<li><a style="color:var(--lime);text-decoration:underline" href="${tgSource}" target="_blank" rel="noopener noreferrer">Vigilância Sanitária de Santa Catarina: alerta sobre produtos irregulares, 2026</a>.</li>
</ul>
</div></section>

<section class="svc-end"><div class="svc-wrap">
<h2>Vai começar ou já está utilizando medicação para emagrecer?</h2>
<p>Organize a alimentação para cuidar da saúde e da composição corporal durante o tratamento, com acompanhamento nutricional individualizado e alinhado às orientações médicas.</p>
<a class="svc-button" href="${whatsapp}">Conversar com o nutricionista</a>
</div></section>
</article>
</main><footer class="svc-footer"><div class="svc-wrap"><p>Hericles Ferreira · Nutricionista · CRN-10 12284</p><p>Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC</p><p><a href="/">Início</a> · <a href="/nutricionista-emagrecimento-joinville/">Emagrecimento</a> · <a href="/acompanhamento-nutricional/">Acompanhamento</a></p></div></footer>
</body></html>`

export async function generateMedicationPage() {
  const dir = join('dist', slug)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), html, 'utf8')
  if (!html.includes('Hericles Ferreira') || !html.includes('application/ld+json')) throw new Error('Artigo SEO incompleto')
  console.log('SEO: artigo de medicações para emagrecimento gerado.')
}
