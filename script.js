/* helper functions used across pages */
function initDrawer(){
  // supports multiple sets (openDrawer, openDrawer2...)
  document.querySelectorAll('[id^="openDrawer"]').forEach(btn=>{
    const suffix = btn.id.replace('openDrawer','');
    const drawer = document.getElementById('drawer'+(suffix||''));
    const backdrop = document.getElementById('backdrop'+(suffix||''));
    const close = document.getElementById('closeDrawer'+(suffix||''));
    if(!drawer || !backdrop) return;
    btn.addEventListener('click', ()=> {
      drawer.classList.add('open');
      backdrop.classList.add('show');
      drawer.setAttribute('aria-hidden','false');
    });
    backdrop.addEventListener('click', ()=> {
      drawer.classList.remove('open');
      backdrop.classList.remove('show');
      drawer.setAttribute('aria-hidden','true');
    });
    if(close) close.addEventListener('click', ()=> {
      drawer.classList.remove('open');
      backdrop.classList.remove('show');
      drawer.setAttribute('aria-hidden','true');
    });
    // ensure when closed pointer-events none on backdrop (handled by CSS)
  });
}

/* small HTML helpers */
function escapeHtml(s){
  if(!s) return '';
  return s.replace(/[&<>"']/g, function(m){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
  });
}
function stripHtml(s){
  if(!s) return '';
  return s.replace(/<[^>]*>/g,'');
}

/* make helpers global so inline scripts can use them */
window.initDrawer = initDrawer;
window.escapeHtml = escapeHtml;
window.stripHtml = stripHtml;
