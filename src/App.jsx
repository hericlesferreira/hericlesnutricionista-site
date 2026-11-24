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

const transformacoes = [
  { antes: '/img/antes1.png', depois: '/img/depois1.png' },
  { antes: '/img/antes11.png', depois: '/img/depois11.png' },
  { antes: '/img/antes2.png', depois: '/img/depois2.png' },
  { antes: '/img/antes22.png', depois: '/img/depois22.png' },
  { antes: '/img/antes3.png', depois: '/img/depois3.png' },
  { antes: '/img/antes33.png', depois: '/img/depois33.png' },
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
          <img src="/img/logo-hericles-oficial.png" alt="Hericles Nutricionista" height="38" decoding="async" />
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
        <div className="hero__bg-gradient" />
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">Nutricionista em Joinville · CRN-10 12284 · Online e presencial</p>
            <h1 className="hero__title">
              Uma alimentação que funciona na sua vida.
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
              <WaBtn href={WA_LINK} variant="primary">Agendar acompanhamento</WaBtn>
              <a href="#como-funciona" className="btn-ghost">Conhecer o atendimento →</a>
            </div>
          </div>
          <div className="hero__img-wrap">
            <div className="hero__img-frame">
              <img src="/img/hericles-ferreira-retrato-institucional.webp?v=2" alt="Hericles Ferreira, nutricionista em Joinville, em retrato profissional" className="hero__photo" width="500" height="468" fetchPriority="high" decoding="async" />
            </div>
          </div>
        </div>
        <div className="hero__stats-bar">
          <div className="container hero__stats-inner">
            <div className="stat"><strong>Online & Presencial</strong><span>Joinville/SC</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>72h</strong><span>Plano alimentar personalizado</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>Acompanhamento semanal</strong><span>Para ajustar dieta, treino e evolução</span></div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section como-funciona" id="como-funciona">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Consulta nutricional</p>
            <h2 className="section-title">Sua jornada para emagrecer e evoluir começa aqui</h2>
            <p className="section-sub">Escolha atendimento presencial em Joinville ou consultoria online para receber uma estratégia nutricional personalizada.</p>
          </div>
          <div className="cards-row">
            <div className="service-card">
              <div className="service-card__img-wrap">
                <img src="/img/hericles-ferreira-atendimento-nutricional-joinville.webp?v=2" alt="Hericles Ferreira durante atendimento nutricional presencial em Joinville" loading="lazy" decoding="async" width="220" height="300" />
                <span className="service-card__badge">📍 Joinville/SC</span>
              </div>
              <div className="service-card__body">
                <h3>Consulta nutricional presencial em Joinville</h3>
                <p>Atendimento individual no consultório, com avaliação física completa e estratégia alimentar para perda de gordura, ganho de massa magra e melhora da performance.</p>
                <ul className="check-list">
                  <li>Questionário pré-consulta detalhado</li>
                  <li>Avaliação física completa</li>
                  <li>Plano alimentar personalizado para emagrecimento ou hipertrofia</li>
                  <li>Suporte contínuo via WhatsApp com feedback semanal</li>
                  <li>Acesso ao Dietitian</li>
                </ul>
                <WaBtn href={WA_PRESENCIAL} variant="outline">Agendar consulta presencial</WaBtn>
              </div>
            </div>
            <div className="service-card">
              
              <div className="service-card__img-wrap">
                <img src="/img/hericles-ferreira-consultoria-online.webp?v=2" alt="Hericles Ferreira utilizando o notebook para planejamento nutricional" loading="lazy" decoding="async" width="220" height="300" />
                <span className="service-card__badge">🌐 Online</span>
              </div>
              <div className="service-card__body">
                <h3>Consultoria nutricional online</h3>
                <p>Praticidade para evoluir onde você estiver, com plano alimentar, ajustes semanais e acompanhamento focado em composição corporal.</p>
                <ul className="check-list">
                  <li>Questionário inicial completo</li>
                  <li>Planejamento alimentar para emagrecer, definir ou ganhar massa magra</li>
                  <li>Avaliações periódicas por fotos e feedback</li>
                  <li>Suporte semanal por ferramenta exclusiva</li>
                  <li>Acesso ao Dietitian</li>
                </ul>
                <WaBtn href={WA_ONLINE} variant="primary">Quero a consultoria online</WaBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS ESPECIALIZADOS */}
      <section className="section services-seo" id="servicos">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Áreas de atuação</p>
            <h2 className="section-title">Encontre o acompanhamento ideal para seu objetivo</h2>
            <p className="section-sub">Conheça os serviços de nutrição em Joinville e as modalidades de atendimento online.</p>
          </div>
          <div className="services-seo__grid">
            <a className="services-seo__card" href="/nutricionista-emagrecimento-joinville/"><h3>Emagrecimento em Joinville</h3><p>Estratégias para reduzir gordura corporal com alimentação adaptada à rotina.</p><span>Conhecer o atendimento →</span></a>
            <a className="services-seo__card" href="/nutricionista-esportivo-joinville/"><h3>Nutrição esportiva</h3><p>Planejamento alimentar para hipertrofia, musculação e composição corporal.</p><span>Saiba como funciona →</span></a>
            <a className="services-seo__card" href="/consultoria-nutricional-online/"><h3>Consultoria online</h3><p>Questionário inicial, plano alimentar individualizado e acompanhamento digital.</p><span>Explorar consultoria →</span></a>
            <a className="services-seo__card" href="/acompanhamento-nutricional/"><h3>Acompanhamento nutricional</h3><p>Check-ins semanais, suporte e ajustes conforme sua evolução.</p><span>Conhecer o acompanhamento →</span></a>
          </div>
        </div>
      </section>

      {/* BIBLIOTECA EDUCATIVA */}
      <section className="section services-seo" id="artigos" aria-labelledby="artigos-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Conteúdo educativo</p>
            <h2 className="section-title" id="artigos-heading">Emagrecimento sem achismo</h2>
            <p className="section-sub">Artigos assinados por Hericles Ferreira, nutricionista, com explicações claras e fontes científicas.</p>
          </div>
          <div className="services-seo__grid">
            <a className="services-seo__card" href="/artigos/como-emagrecer-sem-passar-fome/"><h3>Como emagrecer sem passar fome?</h3><p>Volume, saciedade e flexibilidade alimentar para uma rotina possível.</p><span>Ler artigo →</span></a>
            <a className="services-seo__card" href="/artigos/como-perder-gordura-sem-perder-massa-muscular/"><h3>Como perder gordura e preservar músculos?</h3><p>O papel das proteínas, do treino e da avaliação da composição corporal.</p><span>Ler artigo →</span></a>
            <a className="services-seo__card" href="/artigos/porque-parei-de-emagrecer-mesmo-fazendo-dieta/"><h3>Por que parei de emagrecer?</h3><p>O que observar antes de cortar ainda mais comida.</p><span>Ler artigo →</span></a>
            <a className="services-seo__card" href="/artigos/"><h3>Biblioteca de artigos</h3><p>Conteúdo educativo sobre emagrecimento, metabolismo e hábitos realistas.</p><span>Conhecer artigos →</span></a>
          </div>
          <div className="services-seo__feature">
            <div>
              <p className="section-tag">Orientação nutricional</p>
              <h3>Alimentação durante o uso de Mounjaro, Ozempic e tirzepatida</h3>
              <p>Um artigo sobre alimentação, composição corporal e cuidado sem julgamento durante o tratamento.</p>
            </div>
            <a href="/alimentacao-mounjaro-ozempic-tirzepatida/">Ler orientações →</a>
          </div>
        </div>
      </section>

      {/* TRANSFORMAÇÕES */}
      <section className="section resultados" id="resultados">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Resultados</p>
            <h2 className="section-title">Transformações reais</h2>
            <p className="section-sub">Registros de evolução corporal de pacientes acompanhados. Cada trajetória é individual e os resultados não são garantidos.</p>
          </div>
          <div className="transf-grid">
            {transformacoes.map((t, i) => (
              <div className="transf-card" key={i}>
                <div className="transf-pair">
                  <div className="transf-side">
                    <span className="transf-label">Antes</span>
                    <img src={t.antes} alt="Registro antes do acompanhamento nutricional, em comparação de evolução corporal" loading="lazy" decoding="async" fetchPriority="low" width="300" height="375" />
                  </div>
                  <div className="transf-side">
                    <span className="transf-label after">Depois</span>
                    <img src={t.depois} alt="Registro depois do acompanhamento nutricional, em comparação de evolução corporal" loading="lazy" decoding="async" fetchPriority="low" width="300" height="375" />
                  </div>
                </div>
              </div>
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
            <img src="/img/logo-hericles-oficial.png" alt="Hericles Nutricionista" height="48" decoding="async" />
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
