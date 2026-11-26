(function(){
  const KEY='nh_cookie_consent';
  const VERSION=1;

  function read(){
    try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}
  }

  function save(value){
    const payload={version:VERSION,analytics:!!value.analytics,marketing:!!value.marketing,updatedAt:new Date().toISOString()};
    localStorage.setItem(KEY,JSON.stringify(payload));
    window.__NH_CONSENT__=payload;
    return payload;
  }

  function updateConsent(value){
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){dataLayer.push(arguments)};
    gtag('consent','update',{
      analytics_storage:value.analytics?'granted':'denied',
      ad_storage:value.marketing?'granted':'denied',
      ad_user_data:value.marketing?'granted':'denied',
      ad_personalization:value.marketing?'granted':'denied'
    });
    dataLayer.push({
      event:'consent_updated',
      consent_analytics:value.analytics?'granted':'denied',
      consent_marketing:value.marketing?'granted':'denied'
    });
    if(value.analytics) dataLayer.push({event:'analytics_consent_granted'});
    if(value.marketing) dataLayer.push({event:'marketing_consent_granted'});
  }

  function currentMarketingSignal(){
    const c=read();
    if(c&&c.marketing===true){
      window.dataLayer=window.dataLayer||[];
      dataLayer.push({event:'marketing_consent_granted'});
    }
  }

  function closePanel(){
    document.documentElement.classList.remove('nh-consent-open');
    const el=document.getElementById('nh-consent');
    if(el) el.hidden=true;
  }

  function openPanel(customize){
    const el=document.getElementById('nh-consent');
    if(!el) return;
    el.hidden=false;
    document.documentElement.classList.add('nh-consent-open');
    const details=el.querySelector('[data-consent-details]');
    if(details) details.hidden=!customize;
    if(customize){
      const c=read()||{};
      const a=el.querySelector('[name="consent-analytics"]');
      const m=el.querySelector('[name="consent-marketing"]');
      if(a) a.checked=c.analytics!==false;
      if(m) m.checked=c.marketing===true;
    }
  }

  function choose(value){
    const c=save(value);
    updateConsent(c);
    closePanel();
  }

  function mount(){
    if(document.getElementById('nh-consent')) return;
    const wrap=document.createElement('div');
    wrap.id='nh-consent';
    wrap.className='nh-consent';
    wrap.hidden=true;
    wrap.innerHTML=`
      <div class="nh-consent__card" role="dialog" aria-modal="true" aria-labelledby="nh-consent-title">
        <div class="nh-consent__copy">
          <p class="nh-consent__eyebrow">Privacidade</p>
          <h2 id="nh-consent-title">Você escolhe como seus dados são usados</h2>
          <p>Usamos cookies necessários para o site funcionar. Com sua permissão, também usamos cookies de análise para entender o uso do site e de marketing para medir campanhas.</p>
        </div>
        <div class="nh-consent__actions">
          <button type="button" class="nh-consent__btn nh-consent__btn--primary" data-consent-all>Aceitar tudo</button>
          <button type="button" class="nh-consent__btn" data-consent-essential>Somente necessários</button>
          <button type="button" class="nh-consent__link" data-consent-customize>Personalizar</button>
        </div>
        <div class="nh-consent__details" data-consent-details hidden>
          <label class="nh-consent__row"><span><strong>Necessários</strong><small>Essenciais para segurança e funcionamento do site.</small></span><input type="checkbox" checked disabled></label>
          <label class="nh-consent__row"><span><strong>Análise</strong><small>Ajuda a entender visitas, páginas e interações.</small></span><input name="consent-analytics" type="checkbox" checked></label>
          <label class="nh-consent__row"><span><strong>Marketing</strong><small>Permite medir campanhas e anúncios, incluindo Meta Pixel.</small></span><input name="consent-marketing" type="checkbox"></label>
          <button type="button" class="nh-consent__btn nh-consent__btn--primary nh-consent__save" data-consent-save>Salvar preferências</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    const manage=document.createElement('button');
    manage.type='button';
    manage.className='nh-consent-manage';
    manage.textContent='Cookies';
    manage.setAttribute('aria-label','Gerenciar preferências de cookies');
    manage.addEventListener('click',()=>openPanel(true));
    document.body.appendChild(manage);

    wrap.querySelector('[data-consent-all]').addEventListener('click',()=>choose({analytics:true,marketing:true}));
    wrap.querySelector('[data-consent-essential]').addEventListener('click',()=>choose({analytics:false,marketing:false}));
    wrap.querySelector('[data-consent-customize]').addEventListener('click',()=>openPanel(true));
    wrap.querySelector('[data-consent-save]').addEventListener('click',()=>{
      choose({
        analytics:!!wrap.querySelector('[name="consent-analytics"]').checked,
        marketing:!!wrap.querySelector('[name="consent-marketing"]').checked
      });
    });

    const existing=read();
    if(!existing) openPanel(false);
    else currentMarketingSignal();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();