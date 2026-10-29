/* 실험실 소식 — 내용은 news.js 에서 관리합니다. */
(function(){
  var PER_PAGE = 12, DIR = 'images/news/';
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function byDate(a, b){ return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }

  // 공지사항: 제목을 누르면 펼쳐짐, 가장 최근 공지는 처음부터 펼쳐둠
  var notices = (window.NOTICES || []).slice().sort(byDate);
  $('notice-list').innerHTML = notices.length ? notices.map(function(n, i){
    return '<details class="notice-item"'+(i === 0 ? ' open' : '')+'><summary><span class="badge">공지</span><b>'+esc(n.title)+'</b><span class="date">'+esc(n.date)+'</span></summary><div class="notice-body">'+esc(n.body)+'</div></details>';
  }).join('') : '<p class="empty-note">등록된 공지가 없습니다.</p>';

  // 사진 갤러리
  var photos = (window.PHOTOS || []).filter(function(p){ return p.images && p.images.length; }).sort(byDate);
  var shown = 0;
  function renderMore(){
    var html = photos.slice(shown, shown + PER_PAGE).map(function(p, i){
      var idx = shown + i;
      return '<button type="button" class="photo-card" data-idx="'+idx+'">'
        + '<span class="thumb"><img src="'+esc(DIR + p.images[0])+'" alt="'+esc(p.title)+'" loading="lazy">'
        + (p.images.length > 1 ? '<span class="count">+'+(p.images.length - 1)+'</span>' : '')+'</span>'
        + '<span class="pc-title">'+esc(p.title)+'</span><span class="pc-date">'+esc(p.date)+'</span></button>';
    }).join('');
    $('gallery').insertAdjacentHTML('beforeend', html);
    shown = Math.min(photos.length, shown + PER_PAGE);
    $('gallery-more').hidden = shown >= photos.length;
  }
  if (photos.length) renderMore();
  else $('gallery').outerHTML = '<p class="empty-note">곧 연구실 사진이 올라옵니다.</p>';
  $('gallery-more').addEventListener('click', renderMore);

  // 라이트박스: 한 소식 안의 사진들을 넘겨봄
  var lb = $('lightbox'), cur = null, k = 0;
  function draw(){
    $('lb-img').src = DIR + cur.images[k];
    $('lb-img').alt = cur.title;
    $('lb-title').textContent = cur.title;
    $('lb-date').textContent = cur.date;
    $('lb-count').textContent = cur.images.length > 1 ? (k + 1) + ' / ' + cur.images.length : '';
    $('lb-caption').textContent = cur.caption || '';
    lb.querySelectorAll('.lb-nav').forEach(function(b){ b.hidden = cur.images.length < 2; });
  }
  function step(d){ k = (k + d + cur.images.length) % cur.images.length; draw(); }
  function close(){ lb.hidden = true; document.body.style.overflow = ''; }

  document.addEventListener('click', function(e){
    var card = e.target.closest('.photo-card');
    if (card) { cur = photos[+card.dataset.idx]; k = 0; draw(); lb.hidden = false; document.body.style.overflow = 'hidden'; return; }
    var act = e.target.dataset && e.target.dataset.lb;
    if (act === 'close' || e.target === lb) close();
    else if (act === 'prev') step(-1);
    else if (act === 'next') step(1);
  });
  document.addEventListener('keydown', function(e){
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && cur.images.length > 1) step(-1);
    else if (e.key === 'ArrowRight' && cur.images.length > 1) step(1);
  });
})();
