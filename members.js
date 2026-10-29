/* 구성원 — data/members.json 을 읽어 과정별로 그림 */
(function(){
  var D = window.SiteData, esc = D.esc;
  var GROUPS = [
    { name: '박사과정',   en: 'Ph.D. Students' },
    { name: '석사과정',   en: "Master's Students" },
    { name: '학부연구생', en: 'Undergraduate Researchers' }
  ];

  function member(m){
    var ach = (m.achievements || []).filter(Boolean);
    var intro = '<div class="member-intro-col"><h3>'+esc(m.name)+'<small>'+esc(m.name_en)+'</small></h3>'
      + (m.dept ? '<p class="member-affil">'+esc(m.dept)+'</p>' : '')
      + (m.dept_en ? '<p class="member-affil-en">'+esc(m.dept_en)+'</p>' : '')
      + (m.research ? '<p>'+esc(m.research)+'</p>' : '') + '</div>';
    var right = ach.length
      ? '<div class="member-divider"></div><div class="member-achieve-col">'
        + ach.map(function(a){ return '<span class="badge">'+esc(a)+'</span>'; }).join(' ') + '</div>'
      : '';
    return '<div class="member">'
      + (m.photo ? '<img class="member-photo" src="'+esc(D.img(m.photo))+'" alt="'+esc(m.name)+'">' : '')
      + '<div class="member-body">'+intro+right+'</div></div>';
  }

  D.load('members').then(function(list){
    // 정해진 과정 순서대로, 그 외 과정(예: 졸업생)은 뒤에 이어서
    var names = GROUPS.map(function(g){ return g.name; });
    list.forEach(function(m){ if (m.group && names.indexOf(m.group) < 0) { names.push(m.group); GROUPS.push({ name: m.group, en: '' }); } });
    document.getElementById('member-groups').innerHTML = GROUPS.map(function(g){
      var ms = list.filter(function(m){ return m.group === g.name; });
      if (!ms.length) return '';
      return '<div class="member-group"><h3 class="member-group-title">'+esc(g.name)
        + (g.en ? '<span class="member-group-en">'+esc(g.en)+'</span>' : '')+'</h3>'
        + '<div class="members">'+ms.map(member).join('')+'</div></div>';
    }).join('');
  });
})();
