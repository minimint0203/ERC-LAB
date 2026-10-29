/* 연구 성과 — data/papers.json, projects.json, patents.json 을 읽어 그림 */
(function(){
  var D = window.SiteData, esc = D.esc;
  var $ = function(id){ return document.getElementById(id); };
  var ME = /Jong[\s\-‐]?Hwan Park/i;   // 교수님 이름은 굵은 검정으로

  D.load('papers').then(function(papers){
    $('n-papers').textContent = papers.length;
    var years = {};
    papers.forEach(function(p){ (years[p.year] = years[p.year] || []).push(p); });
    $('paper-list').innerHTML = Object.keys(years).sort(function(a, b){ return b - a; }).map(function(y){
      return '<h3 class="pub-year">'+esc(y)+'</h3><ul class="pubs">' + years[y].map(function(p){
        var title = p.doi
          ? '<a href="https://doi.org/'+esc(p.doi)+'" target="_blank" rel="noopener">'+esc(p.title)+'</a>'
          : esc(p.title);
        var authors = String(p.authors || '').split(/\s*,\s*/).map(function(a){
          return ME.test(a) ? '<b>'+esc(a)+'</b>' : esc(a);
        }).join(', ');
        return '<li><div class="pub-body">'
          + (p.category ? '<div class="meta"><span class="badge">'+esc(p.category)+'</span></div>' : '')
          + '<div class="ptitle">'+title+'</div>'
          + '<div class="meta authors">'+authors+'</div>'
          + '<div class="meta journal"><i>'+esc(p.journal)+'</i></div></div></li>';
      }).join('') + '</ul>';
    }).join('') || '<p class="empty-note">등록된 논문이 없습니다.</p>';
  });

  D.load('projects').then(function(rows){
    $('n-projects').textContent = rows.length;
    rows.sort(function(a, b){ return String(b.start).localeCompare(String(a.start)); });
    $('project-rows').innerHTML = rows.map(function(r){
      return '<tr><td>'+esc(r.start)+'–'+esc(r.end || '현재')+'</td><td>'+esc(r.title)
        + (r.lead ? ' <span class="badge">주관</span>' : '')
        + (r.agency ? '<span class="agency">'+esc(r.agency)+'</span>' : '')+'</td></tr>';
    }).join('');
  });

  D.load('patents').then(function(rows){
    $('n-patents').textContent = rows.length;
    rows.sort(function(a, b){ return b.year - a.year; });
    $('patent-rows').innerHTML = rows.map(function(r){
      return '<tr><td>'+esc(r.year)+'</td><td>'+esc(r.title)+'</td></tr>';
    }).join('');
  });
})();
