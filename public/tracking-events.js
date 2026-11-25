(function(){
  let lastMapInteraction = 0;

  function pushMapInteraction(iframe) {
    const now = Date.now();
    if (now - lastMapInteraction < 1200) return;
    lastMapInteraction = now;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'map_interaction',
      map_type: 'embedded_google_maps',
      map_src: iframe && iframe.src ? iframe.src : undefined,
      page_location: window.location.href
    });
  }

  window.addEventListener('blur', function(){
    setTimeout(function(){
      const active = document.activeElement;
      if (
        active &&
        active.tagName === 'IFRAME' &&
        typeof active.src === 'string' &&
        active.src.includes('google.com/maps/embed')
      ) {
        pushMapInteraction(active);
      }
    }, 0);
  });
})();