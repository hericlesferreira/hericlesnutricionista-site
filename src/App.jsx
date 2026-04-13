import { useState, useEffect } from 'react'
import './App.css'

const WA_LINK = "https://api.whatsapp.com/send?phone=5547988602379&text=Ol%C3%A1%2C%20H%C3%A9ricles!%20Estava%20no%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20acompanhamento%20nutricional"
const WA_ONLINE = "https://api.whatsapp.com/send?phone=5547988602379&text=Ol%C3%A1%2C%20H%C3%A9ricles!%20Tenho%20interesse%20na%20consultoria%20online."
const WA_PRESENCIAL = "https://api.whatsapp.com/send?phone=5547988602379&text=Ol%C3%A1%2C%20H%C3%A9ricles!%20Tenho%20interesse%20na%20consulta%20presencial%20em%20Joinville."

const faqs = [
  { q: "Você faz atendimentos online?", a: "Sim! A consulta online segue o mesmo padrão de qualidade da presencial. A avaliação física é feita por fotos e você recebe um manual ensinando como tirar as medidas." },
  { q: "Em quanto tempo recebo meu plano alimentar?", a: "Em até 72h após a consulta." },
  { q: "Terei acesso a um app para ver o plano?", a: "Sim! Todos os pacientes têm acesso ao Dietitian, app completo para acompanhar o plano alimentar, avaliações e prescrições." },
  { q: "Quanto tempo dura a primeira consulta?", a: "De 1 a 2 horas. Venha preparado para uma boa conversa, ela é o ponto de partida de tudo." },
  { q: "Quais formas de pagamento são aceitas?", a: "Cartão de crédito/débito, PIX, dinheiro ou transferência bancária." },
]

const transformacoes = [
  { antes: '/img/antes1.png', depois: '/img/depois1.png' },
  { antes: '/img/antes22.png', depois: '/img/depois22.png' },
  { antes: '/img/antes2.png', depois: '/img/depois2.png' },
  { antes: '/img/antes11.png', depois: '/img/depois11.png' },
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
  const [open, setOpen] = useState(null)
  return (
    <div className="faq-list">
      {faqs.map((item, i) => (
        <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faq-chevron">{open === i ? '▲' : '▼'}</span>
          </button>
          {open === i && <div className="faq-a">{item.a}</div>}
        </div>
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
          <img src="/img/logo-light.png" alt="Hericles Nutricionista" height="38" />
        </a>
        <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#resultados" onClick={() => setMenuOpen(false)}>Resultados</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <WaBtn href={WA_LINK} variant="nav" className="nav-cta">Agendar Consulta</WaBtn>
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
  const [waBubble, setWaBubble] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setWaBubble(true), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="app">
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero__bg-gradient" />
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">Nutricionista · CRN-10 12284 · Joinville/SC</p>
            <h1 className="hero__title">
              Emagreça de vez.<br />
              <span className="accent">Sem terrorismo.</span><br />
            </h1>
            <p className="hero__desc">
              Emagrecimento, hipertrofia e performance com nutrição estratégica, baseada em ciência e adaptada à sua vida real.
            </p>
            <ul className="hero__bullets">
              <li><span>📈</span> Acompanhamento 100% personalizado</li>
              <li><span>🧠</span> Prática baseada em evidências</li>
              <li><span>🍕</span> Flexibilidade, sem restrições desnecessárias</li>
            </ul>
            <div className="hero__ctas">
              <WaBtn href={WA_LINK} variant="primary">Quero começar agora</WaBtn>
              <a href="#como-funciona" className="btn-ghost">Ver como funciona →</a>
            </div>
          </div>
          <div className="hero__img-wrap">
            <div className="hero__img-frame">
              <img src="/img/hericlesnutri1.png" alt="Hericles Nutricionista" className="hero__photo" />
            </div>
          </div>
        </div>
        <div className="hero__stats-bar">
          <div className="container hero__stats-inner">
            <div className="stat"><strong>Online & Presencial</strong><span>Joinville/SC</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>72h</strong><span>Plano alimentar pronto</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>Acompanhamento semanal</strong><span>Para garantir sua evolução</span></div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section como-funciona" id="como-funciona">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Modalidades</p>
            <h2 className="section-title">A sua jornada começa aqui</h2>
            <p className="section-sub">Escolha a modalidade que encaixa na sua rotina — o resultado é o mesmo.</p>
          </div>
          <div className="cards-row">
            <div className="service-card featured">
              <div className="featured-badge">⭐ Mais popular</div>
              <div className="service-card__img-wrap">
                <img src="/img/passo1.jpeg" alt="Consulta Presencial" />
                <span className="service-card__badge">📍 Joinville/SC</span>
              </div>
              <div className="service-card__body">
                <h3>Consulta Presencial</h3>
                <p>Atendimento exclusivo no consultório. Avaliação física completa, estratégia traçada pra você.</p>
                <ul className="check-list">
                  <li>Questionário pré-consulta detalhado</li>
                  <li>Avaliação física completa</li>
                  <li>Plano alimentar 100% personalizado</li>
                  <li>Suporte contínuo via WhatsApp com feedback semanal</li>
                  <li>Acesso ao Dietitian</li>
                </ul>
                <WaBtn href={WA_PRESENCIAL} variant="outline">Agendar consulta presencial</WaBtn>
              </div>
            </div>
            <div className="service-card">
              
              <div className="service-card__img-wrap">
                <img src="/img/passo3.jpeg" alt="Consultoria Online" />
                <span className="service-card__badge">🌐 Online</span>
              </div>
              <div className="service-card__body">
                <h3>Atendimento ou Consultoria Online</h3>
                <p>Praticidade e resultado onde você estiver. Sem deslocamento, sem enrolação.</p>
                <ul className="check-list">
                  <li>Questionário inicial completo</li>
                  <li>Planejamento alimentar personalizado</li>
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

      {/* BENEFÍCIOS */}
      <section className="section benefits">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Para quem é?</p>
            <h2 className="section-title">Você está preparado para:</h2>
          </div>
          <div className="benefits-grid">
            {[
              { icon: '⚖️', title: 'Emagrecer de verdade', desc: 'Sem dietas malucas, sem efeito sanfona, sem passar fome.' },
              { icon: '📊', title: 'Resultados sólidos', desc: 'Estratégia validada, baseada em evidência, sem invencionismo.' },
              { icon: '🍽️', title: 'Plano feito pra você', desc: 'Adaptado às suas preferências, rotina e objetivos. 100% personalizado.' },
              { icon: '🧠', title: 'Comportamento duradouro', desc: 'Estratégias que mudam hábitos, pra você não depender de dieta pra sempre.' },
            ].map((b, i) => (
              <div className="benefit-card" key={i}>
                <span className="benefit-icon">{b.icon}</span>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-lg">
            <WaBtn href={WA_LINK} variant="primary">Quero esses resultados</WaBtn>
          </div>
        </div>
      </section>

      {/* TRANSFORMAÇÕES */}
      <section className="section resultados" id="resultados">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Provas reais</p>
            <h2 className="section-title">Transformações Reais</h2>
            <p className="section-sub">Resultados de pacientes reais, com rotinas reais.</p>
          </div>
          <div className="transf-grid">
            {transformacoes.map((t, i) => (
              <div className="transf-card" key={i}>
                <div className="transf-pair">
                  <div className="transf-side">
                    <span className="transf-label">Antes</span>
                    <img src={t.antes} alt="Antes" loading="lazy" />
                  </div>
                  <div className="transf-side">
                    <span className="transf-label after">Depois</span>
                    <img src={t.depois} alt="Depois" loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-lg">
            <WaBtn href={WA_LINK} variant="primary">Quero ser o próximo</WaBtn>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="section sobre bg-dark-section" id="sobre">
        <div className="container sobre__inner">
          <div className="sobre__img-wrap">
            <img src="/img/hericlesnutri3.JPG" alt="Hericles Ferreira Nutricionista" />
          </div>
          <div className="sobre__text">
            <p className="section-tag">Quem sou eu</p>
            <h2 className="section-title light">Atuação em<br /><span className="accent">Metabolismo e Emagrecimento</span></h2>
            <p>Nutricionista formado pela Católica-SC, pós-graduado em Metabolismo e Emagrecimento pela Faculdade Uniguaçú.</p>
            <p>Minha jornada começou de dentro: passei pelo processo de emagrecimento sem orientação e na pele entendi o caos de informações divergentes, dietas extremistas e promessas vazias. Isso me fez mergulhar de cabeça em bioquímica, fisiologia e doenças metabólicas.</p>
            <p>Hoje minha missão é simples: <strong>resultado real, com estratégia e sem terrorismo nutricional.</strong></p>
            <div className="sobre__creds">
              <span>📋 CRN-10 12284</span>
              <span>🎓 Pós em Metabolismo</span>
              <span>📍 Joinville/SC</span>
              <span>📸 @hericlesnutri</span>
            </div>
            <WaBtn href={WA_LINK} variant="primary">Falar com o Hericles</WaBtn>
          </div>
        </div>
      </section>

      {/* CTA URGÊNCIA */}
      <section className="section cta-urgencia">
        <div className="container cta-urgencia__inner">
          <h2>Você já tentou de tudo.<br /><span className="accent">Agora vamos fazer do jeito certo.</span></h2>
          <p>Chega de estratégias genéricas que não funcionam. Agende agora e receba um plano feito exclusivamente pra você.</p>
          <WaBtn href={WA_LINK} variant="primary" className="cta-big">Agendar minha consulta agora</WaBtn>
          <p className="cta-note">💬 Resposta em até 1h no horário comercial.</p>
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
            <p className="faq-cta-text">Ainda tem dúvida? Me manda mensagem.</p>
            <WaBtn href={WA_LINK} variant="outline">Falar no WhatsApp</WaBtn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img src="/img/logo-light.png" alt="Hericles Nutricionista" height="48" />
            <p>Nutrição real para pessoas reais.<br />CRN-10 12284 | Joinville/SC</p>
          </div>
          <div className="footer__links">
            <h4>Navegação</h4>
            <a href="#home">Início</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#resultados">Resultados</a>
            <a href="#sobre">Sobre</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer__social">
            <h4>Redes sociais</h4>
            <a href="https://instagram.com/hericlesnutri" target="_blank" rel="noopener noreferrer">📸 @hericlesnutri</a>
            <a href="https://www.facebook.com/hericles.nutri" target="_blank" rel="noopener noreferrer">📘 hericles.nutri</a>
            <a href="https://www.linkedin.com/in/hericlesnutri" target="_blank" rel="noopener noreferrer">💼 hericlesnutri</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2024 Hericles Ferreira Nutricionista LTDA. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* WhatsApp Flutuante */}
      <div className="wa-float">
        {waBubble && (
          <div className="wa-float__bubble">
            Dúvidas? Fale comigo agora! 👋
            <button onClick={() => setWaBubble(false)} className="wa-float__close">×</button>
          </div>
        )}
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-float__btn" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
