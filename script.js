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


/* ============================================================
   🔥 سیستم حرفه‌ای مدیریت مقالات (ویرایش + حذف)
   ذخیره‌سازی: LocalStorage
   کل بخش بدون دست‌زدن به سیستم‌های قبلی اضافه شده
============================================================ */

/* ---- گرفتن مقالات ---- */
function getPosts(){
  return JSON.parse(localStorage.getItem("posts") || "[]");
}

/* ---- ذخیره مقالات ---- */
function savePosts(arr){
  localStorage.setItem("posts", JSON.stringify(arr));
}

/* ---- حذف مقاله ---- */
function deletePost(id){
  if(!confirm("آیا از حذف این مقاله مطمئن هستید؟")) return;

  let posts = getPosts();
  posts = posts.filter(p => p.id !== id);
  savePosts(posts);

  alert("مقاله حذف شد ✔");
  location.reload();
}

/* ---- انتقال مقاله برای ویرایش ---- */
function editPost(id){
  let posts = getPosts();
  let post = posts.find(p => p.id === id);
  if(!post) return alert("مقاله‌ای یافت نشد!");

  localStorage.setItem("editPostID", id);
  localStorage.setItem("editPostData", JSON.stringify(post));

  location.href = "edit.html";   // صفحه ویرایش
}

/* ---- ذخیره تغییرات مقاله ---- */
function saveEditedPost(){
  const id = localStorage.getItem("editPostID");
  if(!id) return alert("خطا: مقاله‌ای برای ویرایش انتخاب نشده");

  let posts = getPosts();
  let post = posts.find(p => p.id == id);

  if(!post) return alert("مقاله پیدا نشد!");

  // مقدارها از فرم edit.html گرفته می‌شود
  post.title = document.getElementById("title").value;
  post.text  = document.getElementById("text").value;
  post.thumb = document.getElementById("thumb").value;

  savePosts(posts);

  alert("مقاله با موفقیت ویرایش شد ✔");
  localStorage.removeItem("editPostID");
  localStorage.removeItem("editPostData");

  location.href = "index.html";
}

/* ---- نمایش مقاله در فرم ویرایش ---- */
function loadEditForm(){
  let data = localStorage.getItem("editPostData");
  if(!data) return;

  let post = JSON.parse(data);

  document.getElementById("title").value = post.title;
  document.getElementById("text").value  = post.text;
  document.getElementById("thumb").value = post.thumb;
}
