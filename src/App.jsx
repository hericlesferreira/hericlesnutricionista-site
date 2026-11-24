import { useState, useEffect } from 'react'
import './App.css'
import './refresh.css'

const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=Rua+Areia+Branca%2C+1035%2C+Jardim+Iririu%2C+Joinville%2C+SC'
const ADDRESS = 'Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC, CEP 89224-090'

const WA_LINK = "https://api.whatsapp.com/send?phone=5547988602379&text=Ol%C3%A1%2C%20H%C3%A9ricles!%20Estava%20no%20seu%20site%20e%20quero%20um%20acompanhamento%20nutricional%20para%20emagrecer%20e%20ganhar%20massa%20magra."
const WA_ONLINE = "https://api.whatsapp.com/send?phone=5547988602379&text=Ol%C3%A1%2C%20H%C3%A9ricles!%20Tenho%20interesse%20na%20consultoria%20online%20para%20emagrecimento%20e%20hipertrofia."
const WA_PRESENCIAL = "https://api.whatsapp.com/send?phone=5547988602379&text=Ol%C3%A1%2C%20H%C3%A9ricles!%20Tenho%20interesse%20na%20consulta%20presencial%20em%20Joinville%20para%20emagrecer%20e%20ganhar%20massa%20magra."

const faqs = [
  { q: "Como funciona a consulta nutricional presencial em Joinville?", a: "O atendimento presencial envolve avaliação individualizada, análise da rotina alimentar e avaliação física conforme sua necessidade. O plano alimentar é elaborado a partir das informações da consulta." },
  { q: "Como funciona a consultoria nutricional online?", a: "A consultoria online começa com um questionário detalhado que substitui a consulta presencial nessa modalidade. Com base nas respostas, elaboro seu planejamento alimentar e realizo o acompanhamento digital conforme o serviço contratado." },
  { q: "Preciso cortar pão, arroz e os alimentos de que gosto para emagrecer?", a: "Não necessariamente. O planejamento alimentar considera suas preferências, rotina e necessidades. Ajustamos quantidades e frequência em vez de adotar proibições sem necessidade." },
  { q: "O acompanhamento inclui contato depois do plano alimentar?", a: "As modalidades de acompanhamento oferecem check-ins semanais e suporte conforme as condições contratadas, para avaliar dificuldades e orientar eventuais ajustes." },
  { q: "É possível ganhar massa muscular e perder gordura?", a: "Dependendo do histórico e do contexto, mudanças na composição corporal podem acontecer com planejamento alimentar e treinamento adequados. A estratégia é individualizada e a evolução é acompanhada." },
  { q: "Você acompanha pessoas que usam Mounjaro, Ozempic ou tirzepatida?", a: "Sim. O acompanhamento nutricional pode ajudar a organizar a alimentação, avaliar a ingestão de proteínas e lidar com dificuldades nutricionais durante o tratamento. A prescrição e o monitoramento dos medicamentos cabem ao médico." },
  { q: "Quanto tempo demora para receber o plano alimentar?", a: "O prazo informado para elaboração do plano após a avaliação é de até 72 horas, considerando o recebimento das informações necessárias." },
  { q: "Onde encontro o plano e as orientações?", a: "O aplicativo Dietitian reúne documentos, planejamento alimentar, receitas e orientações disponibilizadas durante o acompanhamento." },
  { q: "Qual é o endereço do atendimento presencial?", a: "Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC. Para agendar, entre em contato pelo WhatsApp." },
]

const journeySteps = [
  {
    n: '01',
    eyebrow: 'Pré-consulta',
    title: 'Sua consulta começa antes de você chegar',
    text: 'No questionário pré-consulta eu levanto pontos importantes sobre sua saúde, hábitos e rotina. Assim, nosso encontro começa com contexto e aproveitamos melhor cada minuto da consulta.',
    image: '/img/hericles-ferreira-questionario-pre-consulta-nutricional-joinville.webp',
    alt: 'Etapa de pré-consulta do acompanhamento nutricional.'
  },
  {
    n: '02',
    eyebrow: 'Consulta',
    title: 'Eu entendo a sua realidade',
    text: 'Em consulta vou entender melhor seu histórico de saúde e comportamento, rotina, exames, dificuldades do dia a dia e tudo o que puder influenciar na sua evolução.',
    image: '/img/consulta-nutricional-hericles-ferreira-joinville.webp',
    alt: 'Consulta nutricional com Hericles Ferreira.'
  },
  {
    n: '03',
    eyebrow: 'Avaliação física',
    title: 'Bioimpedância e dobras cutâneas',
    text: 'Realizamos a avaliação física para criar um ponto de partida e acompanhar sua evolução ao longo do processo com dados, contexto e comparação. Sempre realizamos bioimpedância + circunferências + dobras cutâneas.',
    image: '/img/avaliacao-fisica-bioimpedancia-dobras-cutaneas-joinville.webp',
    alt: 'Avaliação física durante o acompanhamento nutricional.'
  },
  {
    n: '04',
    eyebrow: 'Plano alimentar',
    title: 'Plano personalizado e individualizado',
    text: 'Após a consulta, eu elaboro o plano inicial da operação com base no que conversamos, respeitando sua rotina, preferências e objetivo.',
    image: '/img/plano-alimentar-personalizado-hericles-ferreira.webp',
    alt: 'Planejamento alimentar individualizado.'
  },
  {
    n: '05',
    eyebrow: 'Check-in semanal',
    title: 'Toda sexta-feira',
    text: 'Temos um aplicativo exclusivo de acompanhamento, onde acompanhamos como foi a semana, onde o planejamento funcionou, onde travou e como está sua adesão. Assim conseguimos acompanhar a fase e ajustar o caminho.',
    image: '/img/check-in-semanal-acompanhamento-nutricional.webp',
    alt: 'Check-in semanal do acompanhamento nutricional.'
  },
  {
    n: '06',
    eyebrow: 'Suporte',
    title: 'Acompanhamento',
    text: 'Entre os encontros, você tem meu suporte pelo WhatsApp para esclarecer dúvidas e realizar alterações no planejamento quando a rotina pedir um ajuste.',
    image: '/img/suporte-whatsapp-nutricionista-hericles-ferreira.webp',
    alt: 'Hericles Ferreira, nutricionista responsável pelo acompanhamento.'
  },
  {
    n: '07',
    eyebrow: 'App exclusivo',
    title: 'Tudo o que construímos fica organizado em um só lugar',
    text: 'No aplicativo você acessa o planejamento alimentar, avaliação física, dados dos nossos encontros e materiais que usamos ao longo da jornada.',
    image: '/img/aplicativo-acompanhamento-nutricional-plano-alimentar.webp',
    alt: 'Acompanhamento nutricional com acesso digital ao planejamento.'
  },
  {
    n: '08',
    eyebrow: 'Recursos exclusivos',
    title: 'Caixa de Ferramentas do Nutri',
    text: 'Você também recebe acesso à minha Caixa de Ferramentas, um espaço exclusivo com recursos e materiais pensados para facilitar sua rotina e ajudar a colocar o planejamento nutricional em prática.',
    image: '/img/caixa-de-ferramentas-nutri-hericles-ferreira.webp',
    alt: 'Recursos exclusivos disponíveis durante o acompanhamento nutricional.'
  }
]

const transformacoes = [
  {
    nome: 'Leonardo',
    idade: 24,
    antes: '85kg',
    depois: '79,5kg',
    tempo: '3 meses',
    perfil: 'Falso magro',
    descricao: 'Definição corporal + perda de gordura + ganho de massa',
    image: '/img/Leonardo.png',
  },
  {
    nome: 'Gabriel',
    idade: 28,
    antes: '80kg',
    depois: '74kg',
    tempo: '3 meses',
    perfil: 'Falso magro',
    descricao: 'Ganho de massa + redução de gordura',
    image: '/img/Gabriel.png',
  },
  {
    nome: 'Djonatan',
    idade: 30,
    antes: '87kg',
    depois: '77kg',
    tempo: '5 meses',
    perfil: 'Falso magro',
    descricao: 'Perda de gordura + definição muscular',
    image: '/img/Djonatan.png',
  },
  {
    nome: 'Hericles',
    idade: 30,
    antes: '115kg',
    depois: '84kg',
    tempo: '5 meses',
    perfil: 'Obesidade',
    descricao: 'Recomposição corporal com maior perda de gordura',
    image: '/img/Hericles.png',
  },
  {
    nome: 'Daniela',
    perfil: 'Pré-diabetes e hipotireoidismo',
    descricao: 'Reeducação alimentar e emagrecimento com tratamento nutricional em pré-diabetes e hipotireoidismo',
    image: '/img/Daniela.png',
  },
]

function WaBtn({ href = WA_LINK, children, variant = 'primary', className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`wa-btn wa-btn--${variant} ${className}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {children}
    </a>
  )
}

function FAQ() {
  return (
    <div className="faq-list">
      {faqs.map((item, i) => (
        <details className="faq-item" key={i}>
          <summary className="faq-q">
            <span>{item.q}</span>
            <span className="faq-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="faq-a">{item.a}</div>
        </details>
      ))}
    </div>
  )
}

function NavBar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo">
          <img src="/img/logo-preta.png" alt="Hericles Nutricionista" width="2000" height="500" decoding="async" />
        </a>
        <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Atendimento</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Áreas de atuação</a>
          <a href="/sobre-hericles-ferreira/" onClick={() => setMenuOpen(false)}>Sobre mim</a>
          <a href="/artigos/" onClick={() => setMenuOpen(false)}>Artigos</a>
          <WaBtn href={WA_LINK} variant="nav" className="nav-cta">Agendar</WaBtn>
        </nav>
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero__media" aria-hidden="true">
          <picture>
            <source media="(max-width: 768px)" srcSet="/img/hero-home-mobile.png" />
            <img src="/img/hero-home-desktop.png" alt="" fetchPriority="high" decoding="async" />
          </picture>
        </div>
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">Nutricionista em Joinville · CRN-10 12284 · Online e presencial</p>
            <h1 className="hero__title">
              <span className="hero__rotator" aria-label="alimentação, dieta, acompanhamento ou planejamento">
                <span className="hero__rotator-track" aria-hidden="true">
                  <span>alimentação</span>
                  <span>dieta</span>
                  <span>acompanhamento</span>
                  <span>planejamento</span>
                  <span>alimentação</span>
                </span>
              </span>
              <span className="hero__title-line">que cabe</span>
              <span className="hero__title-line">na sua vida</span>
            </h1>
            <p className="hero__desc">
              Emagrecimento e ganho de massa muscular com acompanhamento individualizado, sem dietas extremas e sem abrir mão do que você gosta.
            </p>
            <ul className="hero__bullets">
              <li><span>📈</span> Acompanhamento personalizado</li>
              <li><span>🧠</span> Prática baseada em evidências</li>
              <li><span>🍽️</span> Flexibilidade, sem restrições desnecessárias</li>
            </ul>
            <div className="hero__ctas">
              <WaBtn href={WA_LINK} variant="primary">Agendar consulta</WaBtn>
              <a href="/sobre-hericles-ferreira/" className="btn-ghost">Conheça meu trabalho →</a>
            </div>
          </div>
        </div>
        <div className="hero__stats-bar">
          <div className="container hero__stats-inner">
            <div className="stat"><strong>Online & Presencial</strong><span>Joinville/SC</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>Até 72h</strong><span>Receba seu plano alimentar em até 72h após sua consulta</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>Acompanhamento semanal</strong><span>Para ajustar dieta, treino e evolução</span></div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section como-funciona" id="como-funciona">
        <div className="container">
          <div className="journey-intro">
            <p className="section-tag">Seu acompanhamento</p>
            <h2 className="section-title journey-title">
              <span>Sua jornada para</span>
              <span className="journey-rotator" aria-label="emagrecer, hipertrofiar, crescer, evoluir ou viver de verdade">
                <span className="journey-rotator-track" aria-hidden="true">
                  <span>emagrecer</span>
                  <span>hipertrofiar</span>
                  <span>crescer</span>
                  <span>evoluir</span>
                  <span>viver de verdade</span>
                  <span>emagrecer</span>
                </span>
              </span>
              <span>começa aqui</span>
            </h2>
            <p className="journey-lead">
              Do primeiro contato aos ajustes de cada semana, cada etapa foi pensada para transformar uma consulta em acompanhamento de verdade. E a nossa jornada é assim:
            </p>
          </div>

          <div className="journey-grid" aria-label="Etapas do acompanhamento nutricional">
            {journeySteps.map((step) => (
              <article className="journey-card" key={step.n}>
                <div className="journey-card__media">
                  <img src={step.image} alt={step.alt} loading="lazy" decoding="async" width="900" height="700" />
                </div>
                <div className="journey-card__body">
                  <div className="journey-card__content">
                    <div className="journey-card__heading">
                      <span className="journey-card__number" aria-hidden="true">{step.n}</span>
                      <p className="journey-card__eyebrow">{step.eyebrow}</p>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    {step.n === '08' && (
                      <a
                        className="journey-card__link"
                        href="https://caixadeferramentasnutri.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Conhecer a Caixa de Ferramentas →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="journey-cta">
            <p>Você não recebe apenas um plano alimentar. Recebe uma estratégia que continua sendo acompanhada depois da consulta.</p>
            <WaBtn href={WA_LINK} variant="primary">Agendar consulta</WaBtn>
          </div>
        </div>
      </section>

      {/* ARTIGOS */}
      <section className="section articles-home" id="artigos" aria-labelledby="artigos-heading">
        <div className="container">
          <div className="articles-home__header">
            <div>
              <p className="section-tag">Leituras do Nutri</p>
              <h2 className="section-title" id="artigos-heading">Artigos que escrevi recentemente</h2>
            </div>
            <a className="articles-home__all" href="/artigos/">Ver todos os artigos →</a>
          </div>

          <div className="articles-home__grid">
            <article className="article-card article-card--featured">
              <a className="article-card__image" href="/artigos/como-emagrecer-sem-passar-fome/" aria-label="Ler artigo Como emagrecer sem passar fome">
                <img src="/img/hericles-ferreira-atendimento-nutricional-joinville.webp?v=2" alt="Hericles Ferreira durante atendimento nutricional em Joinville" loading="lazy" decoding="async" />
              </a>
              <div className="article-card__body">
                <div className="article-card__meta"><span>Emagrecimento</span><span>Hericles Ferreira</span></div>
                <h3><a href="/artigos/como-emagrecer-sem-passar-fome/">Como emagrecer sem passar fome?</a></h3>
                <p>Volume, saciedade e flexibilidade alimentar para construir uma rotina que realmente seja possível manter.</p>
                <a className="article-card__link" href="/artigos/como-emagrecer-sem-passar-fome/">Ler artigo →</a>
              </div>
            </article>

            <article className="article-card">
              <a className="article-card__image" href="/artigos/como-perder-gordura-sem-perder-massa-muscular/" aria-label="Ler artigo Como perder gordura sem perder massa muscular">
                <img src="/img/avaliacao-fisica-bioimpedancia-dobras-cutaneas-joinville.webp" alt="Avaliação de composição corporal durante acompanhamento nutricional" loading="lazy" decoding="async" />
              </a>
              <div className="article-card__body">
                <div className="article-card__meta"><span>Composição corporal</span><span>Hericles Ferreira</span></div>
                <h3><a href="/artigos/como-perder-gordura-sem-perder-massa-muscular/">Como perder gordura sem perder massa muscular?</a></h3>
                <p>Proteína, treinamento e estratégia nutricional para preservar massa muscular durante o emagrecimento.</p>
                <a className="article-card__link" href="/artigos/como-perder-gordura-sem-perder-massa-muscular/">Ler artigo →</a>
              </div>
            </article>

            <article className="article-card">
              <a className="article-card__image" href="/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/" aria-label="Ler artigo Por que parei de emagrecer mesmo fazendo dieta">
                <img src="/img/plano-alimentar-personalizado-hericles-ferreira.webp" alt="Planejamento alimentar personalizado elaborado por Hericles Ferreira" loading="lazy" decoding="async" />
              </a>
              <div className="article-card__body">
                <div className="article-card__meta"><span>Metabolismo</span><span>Hericles Ferreira</span></div>
                <h3><a href="/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/">Por que parei de emagrecer mesmo fazendo dieta?</a></h3>
                <p>O que vale a pena observar antes de simplesmente comer menos ou aumentar ainda mais as restrições.</p>
                <a className="article-card__link" href="/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/">Ler artigo →</a>
              </div>
            </article>
          </div>

          <article className="article-card article-card--wide">
            <div className="article-card__wide-copy">
              <div className="article-card__meta"><span>Tratamento e alimentação</span><span>Hericles Ferreira</span></div>
              <h3><a href="/alimentacao-mounjaro-ozempic-tirzepatida/">Alimentação durante o uso de Mounjaro, Ozempic e tirzepatida</a></h3>
              <p>Como organizar a alimentação, preservar massa muscular e lidar com dificuldades nutricionais durante o tratamento, sem julgamento e sem terrorismo alimentar.</p>
              <a className="article-card__link" href="/alimentacao-mounjaro-ozempic-tirzepatida/">Ler artigo →</a>
            </div>
          </article>
        </div>
      </section>

      {/* TRANSFORMAÇÕES */}
      <section className="section resultados" id="resultados">
        <div className="container">
          <div className="section-header resultados__header">
            <p className="section-tag">Resultados</p>
            <h2 className="section-title">Transformações reais</h2>
            <p className="section-sub">Histórias reais de pacientes acompanhados. Cada resultado depende do contexto, adesão e características individuais.</p>
          </div>

          <div className="results-showcase">
            {transformacoes.map((t) => (
              <article className="result-story" key={t.nome}>
                <div className="result-story__visual">
                  <img
                    src={t.image}
                    alt={`Transformação corporal de ${t.nome}: comparação antes e depois do acompanhamento nutricional`}
                    loading="lazy"
                    decoding="async"
                  />
                  {t.tempo && <span className="result-story__time">{t.tempo}</span>}
                </div>
                <div className="result-story__content">
                  {t.antes && t.depois && (
                    <div className="result-story__weights">
                      <div><strong>{t.antes}</strong><span>Antes</span></div>
                      <div><strong>{t.depois}</strong><span>Depois</span></div>
                    </div>
                  )}
                  <h3>{t.nome}{t.idade ? `, ${t.idade} anos` : ''}</h3>
                  <p className="result-story__profile">{t.perfil}</p>
                  <p className="result-story__desc">{t.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="section sobre bg-dark-section" id="sobre">
        <div className="container sobre__inner">
          <div className="sobre__img-wrap">
            <img src="/img/hericles-ferreira-sofa-profissional.webp?v=2" alt="Hericles Ferreira, nutricionista em Joinville, em retrato profissional" loading="lazy" decoding="async" width="220" height="300" />
          </div>
          <div className="sobre__text">
            <p className="section-tag">Quem sou eu</p>
            <h2 className="section-title light">Atuação em<br /><span className="accent">Metabolismo, Emagrecimento e Hipertrofia</span></h2>
            <p>Sou Hericles Ferreira, nutricionista em Joinville/SC, registrado no CRN-10 sob o número 12284, formado pela Católica-SC e pós-graduado em Metabolismo e Emagrecimento pela Faculdade Uniguaçu.</p>
            <p>Minha jornada começou de dentro: passei pelo processo de emagrecimento sem orientação e entendi na prática o caos das informações divergentes, dietas extremas e promessas vazias. Por isso, aprofundei meus estudos em bioquímica, fisiologia, doenças metabólicas e composição corporal.</p>
            <p>Hoje minha missão é simples: <strong>ajudar você a emagrecer, ganhar massa magra e sustentar resultados com estratégia, clareza e sem terrorismo nutricional.</strong></p>
            <div className="sobre__creds">
              <span>📋 CRN-10 12284</span>
              <span>🎓 Pós em Metabolismo e Emagrecimento</span>
              <span>📍 Joinville/SC</span>
              <span>@nutrihericles</span>
            </div>
            <div className="sobre__actions">
              <WaBtn href={WA_LINK} variant="primary">Falar com o nutricionista</WaBtn>
              <a className="wa-btn wa-btn--outline" href="/sobre-hericles-ferreira/">Minha trajetória, formação e método</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA URGÊNCIA */}
      <section className="section cta-urgencia">
        <div className="container cta-urgencia__inner">
          <h2>Você não precisa tentar outra dieta da moda.<br /><span className="accent">Precisa de estratégia para o seu corpo.</span></h2>
          <p>Chega de planos genéricos. Agende sua consulta nutricional e receba um caminho personalizado para emagrecer, ganhar massa magra e evoluir com segurança.</p>
          <WaBtn href={WA_LINK} variant="primary" className="cta-big">Agendar consulta nutricional</WaBtn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Dúvidas</p>
            <h2 className="section-title">Perguntas frequentes</h2>
          </div>
          <FAQ />
          <div className="text-center mt-lg">
            <p className="faq-cta-text">Ainda tem dúvida sobre emagrecimento, hipertrofia ou consultoria online? Me manda mensagem.</p>
            <WaBtn href={WA_LINK} variant="outline">Falar no WhatsApp</WaBtn>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section className="section localizacao" id="localizacao" aria-labelledby="localizacao-titulo">
        <div className="container localizacao__inner">
          <div>
            <p className="section-tag">Atendimento presencial em Joinville</p>
            <h2 className="section-title" id="localizacao-titulo">Onde fica o consultório?</h2>
            <img className="localizacao__photo" src="/img/hericles-ferreira-atendimento-nutricional-joinville.webp?v=2" alt="Hericles Ferreira atendendo paciente no consultório de Joinville" loading="lazy" decoding="async" width="220" height="300" />
            <p className="localizacao__address">{ADDRESS}</p>
            <p className="localizacao__description">Atendimento nutricional presencial em Joinville e consultoria online para todo o Brasil. Entre em contato para agendar seu atendimento.</p>
            <div className="localizacao__actions">
              <a className="wa-btn wa-btn--outline" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              <WaBtn href={WA_PRESENCIAL} variant="primary">Agendar atendimento</WaBtn>
            </div>
          </div>
          <div className="localizacao__card">
            <strong>Hericles Ferreira | Nutricionista</strong>
            <span>CRN-10 12284</span>
            <span>Especialização em Metabolismo e Emagrecimento</span>
            <address>{ADDRESS}</address>
            <a href="tel:+5547988602379">(47) 98860-2379</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img src="/img/logo-preta.png" alt="Hericles Nutricionista" width="2000" height="500" decoding="async" />
            <p>Hericles Ferreira | Nutricionista<br />CRN-10 12284<br />Atendimento presencial em Joinville e consultoria online.</p>
            <address className="footer__address">{ADDRESS}</address>
            <a className="footer__maps" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Como chegar ao consultório</a>
          </div>
          <div className="footer__links">
            <h4>Explore</h4>
            <a href="#como-funciona">Atendimentos</a>
            <a href="/nutricionista-emagrecimento-joinville/">Emagrecimento</a>
            <a href="/consultoria-nutricional-online/">Consultoria online</a>
            <a href="/sobre-hericles-ferreira/">Sobre mim</a>
            <a href="/artigos/">Artigos</a>
            <a href="#localizacao">Localização</a>
          </div>
          <div className="footer__social">
            <h4>Redes sociais</h4>
            <a href="https://instagram.com/nutrihericles" target="_blank" rel="noopener noreferrer">Instagram · @nutrihericles</a>
            <a href="https://www.linkedin.com/in/hericlesnutri" target="_blank" rel="noopener noreferrer">LinkedIn · hericlesnutri</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Hericles Ferreira. Nutricionista · CRN-10 12284.</p>
        </div>
      </footer>

      {/* WhatsApp Flutuante */}
      <div className="wa-float">
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-float__btn" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
