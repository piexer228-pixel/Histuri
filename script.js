/* script.js
   توابع عمومی و راه‌اندازی منوها و کمک‌کننده‌ها
*/

/* ---------- Drawer init (پشتیبانی از چند صفحه با id های مشابه) ---------- */
function initDrawer(){
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
      // focus for accessibility
      drawer.querySelector('a,button,input')?.focus();
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
  });
}

/* ---------- Helpers ---------- */
function escapeHtml(s){
  if(!s) return '';
  return String(s).replace(/[&<>"']/g, function(m){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
  });
}
function stripHtml(s){
  if(!s) return '';
  return String(s).replace(/<[^>]*>/g,'');
}

/* make helpers global */
window.initDrawer = initDrawer;
window.escapeHtml = escapeHtml;
window.stripHtml = stripHtml;

/* ---------- Accessibility: close drawer with Escape ---------- */
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    document.querySelectorAll('.drawer.open').forEach(d=>{
      d.classList.remove('open');
      const id = d.id || '';
      const backdrop = document.getElementById('backdrop' + id.replace('drawer',''));
      if(backdrop) backdrop.classList.remove('show');
      d.setAttribute('aria-hidden','true');
    });
  }
});
