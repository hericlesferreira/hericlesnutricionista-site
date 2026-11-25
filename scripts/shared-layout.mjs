export const trackingHead = '<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);})(window,document,\'script\',\'dataLayer\',\'GTM-WQ6SFV7L\');</script><!-- End Google Tag Manager -->'
export const trackingBody = '<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQ6SFV7L" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) --><script src="/tracking-events.js" defer></script>'

export const siteContact = 'https://api.whatsapp.com/send?phone=5547988602379&text=' + encodeURIComponent('Olá, Hericles! Estava no seu site e quero saber mais sobre acompanhamento nutricional.')

export function sharedHeader(contact = siteContact) {
  return '<header class="site-navbar" data-site-navbar>'+
    '<div class="site-navbar__inner">'+
      '<a class="site-navbar__logo" href="/" aria-label="Hericles Nutri, página inicial"><img src="/img/logo-preta.png" alt="Hericles Nutricionista" width="2000" height="500" decoding="async"></a>'+
      '<nav class="site-navbar__links" data-site-nav>'+
        '<a href="#como-funciona" data-local-section="como-funciona">Como funciona</a>'+
        '<a href="#resultados" data-local-section="resultados">Resultados</a>'+
        '<a href="#sobre" data-local-section="sobre">Sobre mim</a>'+
        '<a href="#artigos" data-local-section="artigos">Artigos</a>'+
        '<a class="site-navbar__cta track-agendar" href="'+contact+'">Agendar</a>'+
      '</nav>'+
      '<button class="site-navbar__menu" type="button" aria-label="Abrir menu" aria-expanded="false" data-site-menu><span></span><span></span><span></span></button>'+
    '</div>'+
  '</header>'+
  '<script>(function(){const b=document.querySelector("[data-site-menu]"),n=document.querySelector("[data-site-nav]");if(!n)return;n.querySelectorAll("[data-local-section]").forEach(function(a){const id=a.getAttribute("data-local-section");if(!document.getElementById(id))a.setAttribute("href","/#"+id);});if(!b)return;b.addEventListener("click",function(){const o=n.classList.toggle("is-open");b.classList.toggle("is-open",o);b.setAttribute("aria-expanded",String(o));});n.addEventListener("click",function(e){if(e.target.closest("a")){n.classList.remove("is-open");b.classList.remove("is-open");b.setAttribute("aria-expanded","false");}});})();</script>'
}

export function sharedFooter() {
  return '<footer class="site-footer">'+
    '<div class="site-footer__inner">'+
      '<div class="site-footer__brand">'+
        '<img src="/img/logo-preta.png" alt="Hericles Nutricionista" width="2000" height="500" decoding="async">'+
        '<p>Hericles Ferreira | Nutricionista<br>CRN-10 12284<br>Atendimento presencial em Joinville e consultoria online.</p>'+
        '<address>Rua Areia Branca, 1035, Jardim Iririú, Joinville/SC, CEP 89224-090</address>'+
        '<a class="track-maps" href="https://www.google.com/maps/search/?api=1&query=Rua+Areia+Branca%2C+1035%2C+Jardim+Iririu%2C+Joinville%2C+SC" target="_blank" rel="noopener noreferrer">Como chegar ao consultório</a>'+
      '</div>'+
      '<div class="site-footer__links">'+
        '<h4>Explore</h4>'+
        '<a href="/#como-funciona">Atendimentos</a>'+
        '<a href="/nutricionista-emagrecimento-joinville/">Emagrecimento</a>'+
        '<a href="/nutricionista-esportivo-joinville/">Nutrição esportiva</a><a href="/acompanhamento-nutricional/">Acompanhamento</a><a href="/consultoria-nutricional-online/">Consultoria online</a>'+
        '<a href="/sobre-hericles-ferreira/">Sobre mim</a>'+
        '<a href="/artigos/">Artigos</a>'+
        '<a href="/sobre-hericles-ferreira/#localizacao">Localização</a>'+
      '</div>'+
      '<div class="site-footer__social">'+
        '<h4>Redes sociais</h4>'+
        '<a href="https://instagram.com/nutrihericles" target="_blank" rel="noopener noreferrer">Instagram · @nutrihericles</a>'+
        '<a href="https://www.linkedin.com/in/hericlesnutri" target="_blank" rel="noopener noreferrer">LinkedIn · hericlesnutri</a>'+
      '</div>'+
    '</div>'+
    '<div class="site-footer__bottom"><p>© 2026 Hericles Ferreira. Nutricionista · CRN-10 12284.</p></div>'+
  '</footer>'
}
