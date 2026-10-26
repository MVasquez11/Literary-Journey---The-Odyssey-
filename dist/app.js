(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const main = document.getElementById('main');
  const nav = document.getElementById('navigation');
  const menu = document.querySelector('.menu-toggle');
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const chapters = [
    { id: 'profile', name: 'The reader behind the pages', short: 'Student Profile', description: 'An introduction to the student, the reader, and the person behind this portfolio.' },
    { id: 'analyses', name: 'Reading between the lines', short: 'Literary Analyses', description: 'Seven course analyses, each with a different work and a way of looking deeper.' },
    { id: 'favorite', name: 'A story that stays', short: 'Favorite Masterpiece', description: 'The Odyssey by Homer, and the meaning found along the way.' },
    { id: 'learning', name: 'What the pages taught me', short: 'Summary of Learning', description: 'Knowledge, perspectives, and skills gathered throughout Great Books.' },
    { id: 'reflection', name: 'Beyond the final page', short: 'Personal Reflection', description: 'A space to look back on the journey and carry its lessons forward.' }
  ];
  const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = n => String(n).padStart(2, '0');
  const paragraphs = text => text.split(/\n\s*\n/).map(p => `<p>${esc(p)}</p>`).join('');
  const textOrPlaceholder = (text, prompt) => text.trim() ? `<div class="prose">${paragraphs(text)}</div>` : `<div class="placeholder"><p>${esc(prompt)}</p></div>`;
  const analysisText = a => a.sections?.length ? a.sections.map(s => s.text).join('\n\n') : (a.text || '');
  const referencesList = references => `<ol class="reference-list">${(references || []).filter(r => /^https:\/\//.test(r.url)).map(r => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.label)} ↗</a>${r.note ? `<p>${esc(r.note)}</p>` : ''}</li>`).join('')}</ol>`;
  const bookPreview = a => a.cover ? `<span class="book-preview" aria-hidden="true"><img src="${esc(a.cover.src)}" alt="${esc(a.cover.alt)}" width="156" height="204" loading="eager" decoding="async"><span class="preview-title">${esc(a.title)}</span><span class="preview-action">Read analysis ↗</span></span>` : '';
  const bookCredit = a => a.cover ? `<div class="book-credit"><h3>Book image</h3><p>${esc(a.cover.label)}. ${esc(a.cover.credit)}</p>${a.cover.note ? `<p>${esc(a.cover.note)}</p>` : ''}<a href="${esc(a.cover.sourceUrl)}" target="_blank" rel="noopener noreferrer">View book image source ↗</a></div>` : '';
  const artworkCredit = 'John William Waterhouse, Ulysses and the Sirens, 1891. National Gallery of Victoria, Melbourne. Public domain. Photo: NGV.';
  const artwork = (extra = '') => `<figure class="hero-art ${extra}"><div class="art-mat"><img src="assets/ulysses-and-the-sirens.jpg" alt="Waterhouse’s painting of Odysseus bound to the mast while his crew row past the Sirens." width="1920" height="965"></div><figcaption class="art-caption">John William Waterhouse · <em>Ulysses and the Sirens</em>, 1891<br>National Gallery of Victoria, Melbourne · Public domain · <a href="#sources">Artwork credit ↗</a></figcaption></figure>`;
  const breadcrumb = (label, parent = '') => `<div class="breadcrumb"><a href="#home">THE JOURNEY</a><span aria-hidden="true">/</span>${parent ? `<a href="#analyses">LITERARY ANALYSES</a><span aria-hidden="true">/</span>` : ''}<span>${esc(label)}</span></div>`;
  const pageHead = (chapter, title, description) => `<header class="page-head">${breadcrumb(chapter.short.toUpperCase())}<span class="eyebrow rust">${chapters.includes(chapter) ? 'CHAPTER '+number(chapters.indexOf(chapter) + 1)+' · ' : ''}${esc(chapter.short)}</span><h1>${title}</h1><p class="lede">${description}</p></header>`;
  const pageTurn = index => {
    const previous = chapters[index - 1];
    const next = chapters[index + 1];
    return `<div class="page-turn"><a href="#${previous?.id || 'home'}"><span>PREVIOUS CHAPTER</span>← ${previous?.short || 'The beginning'}</a><a href="#${next?.id || 'home'}"><span>${next ? 'CONTINUE THE JOURNEY' : 'RETURN TO THE BEGINNING'}</span>${next?.short || 'Home'} →</a></div>`;
  };
  const writingSection = (title, text, prompt, kicker = '') => `<section class="writing-section">${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}<h2>${esc(title)}</h2>${textOrPlaceholder(text, prompt)}</section>`;

  function home() {
    return `<div class="wrap">
      <section class="hero" aria-labelledby="home-title">
        <div><span class="eyebrow rust">WORDS. WORLDS. WAYS OF SEEING.</span><h1 id="home-title">My Literary<br><em>Journey.</em></h1><p class="lede">Through great books, across new perspectives.<br>A collection of literary analyses, discoveries, and reflections — inspired by the journey home.</p><a class="button" href="#chapters">Explore the portfolio ${arrow}</a></div>
        <div class="hero-art"><span class="art-index">A VOYAGE THROUGH LITERATURE / VOL. I</span>${artwork()}<div class="feature-label"><div><small>MY FAVORITE LITERARY MASTERPIECE</small><h2><a href="#favorite">The Odyssey</a></h2><small>HOMER · ANCIENT GREEK EPIC</small></div><a class="circle-link" href="#favorite" aria-label="Explore The Odyssey">${arrow}</a></div></div>
      </section>
      <nav class="journey-strip" aria-label="Portfolio chapters">${chapters.map((c,i) => `<a href="#${c.id}"><span class="tiny-number">${number(i+1)}</span>${c.short}</a>`).join('')}</nav>
      <section id="chapters" class="chapter-list" aria-labelledby="contents-title"><div class="section-head"><div><span class="eyebrow rust">THE TABLE OF CONTENTS</span><h2 id="contents-title">Five chapters.<br>One literary journey.</h2></div><p>From first impressions to lasting insights, explore the pages of this Great Books portfolio.</p></div>${chapters.map((c,i) => `<a class="chapter-row" href="#${c.id}"><span class="chapter-num">${number(i+1)}</span><h3>${c.short}</h3><p>${c.description}</p>${arrow}</a>`).join('')}</section>
    </div>
    <section class="spotlight"><div class="wrap spotlight-inner"><img src="assets/compass.svg" alt="" width="110" height="110"><div><span class="eyebrow">THE STORY AT THE HEART OF IT ALL</span><h2>Across the sea.<br>Toward <em>home.</em></h2></div><div><p class="lede">A voyage of resilience, identity, and belonging. Discover the epic at the center of this portfolio: Homer's <em>The Odyssey</em>.</p><a class="text-link" href="#favorite">Explore the favorite masterpiece ${arrow}</a></div></div></section>
    <div class="wrap closing"><h2>Every great story invites<br>a closer <em>look.</em></h2><a class="button secondary" href="#analyses">Browse the seven analyses ${arrow}</a></div>`;
  }

  function profile() {
    const s = data.student;
    const photo = /^(assets\/)[a-zA-Z0-9_./ -]+$/.test(s.photo) ? `<img class="portrait-image" src="${esc(s.photo)}" alt="Portrait of ${esc(s.name || 'the student')}">` : `<div class="portrait-placeholder" role="img" aria-label="Space reserved for your recent student photograph"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="32" r="17"/><path d="M17 91V79c0-21 15-30 33-30s33 9 33 30v12"/></svg><span>YOUR PHOTOGRAPH</span></div>`;
    return `<div class="wrap">${pageHead(chapters[0], 'The reader behind<br>the <em>pages.</em>', 'Every literary journey begins with a reader. This chapter is an introduction to the person behind the portfolio.')}<div class="profile-layout"><aside class="profile-sidebar">${photo}<dl class="profile-meta">${[['Name',s.name],['Course',s.course],['Year',s.year],['Section',s.section]].map(([k,v])=>`<div class="meta-row"><dt>${k}</dt><dd>${v ? esc(v) : 'To be added'}</dd></div>`).join('')}</dl></aside><div>${writingSection('A little about me',s.introduction,'Introduce yourself as a student and as a reader. What would you like others to know about you?','01 / INTRODUCTION')}${writingSection('The things I read for',s.interests,'Share your interests, favorite kinds of stories, and experiences connected to reading and literature.','02 / READING & LITERATURE')}${writingSection('Entering Great Books',s.expectations,'Describe your expectations for Great Books or the learning experiences that have mattered to you.','03 / EXPECTATIONS & EXPERIENCES')}</div></div>${pageTurn(0)}</div>`;
  }

  function analyses() {
    return `<div class="wrap">${pageHead(chapters[1], 'Reading between<br>the <em>lines.</em>', 'Seven readings across cultures and centuries. Explore an argument, a literary lens, and a closer look at the text in each analysis.')}<div class="analysis-grid">${data.analyses.map((a,i) => `<a class="analysis-card" href="#analysis-${i+1}" aria-label="Open analysis ${i+1}${a.title ? ': '+esc(a.title) : ''}"><div class="card-top"><span class="roman">${roman[i]}</span></div>${bookPreview(a)}<h2>${esc(a.title || 'Literary analysis '+number(i+1))}</h2><p class="analysis-author">${esc(a.author || 'Author to be added')}</p>${a.summary ? `<p class="analysis-summary">${esc(a.summary)}</p>` : ''}<div class="card-bottom"><span>${esc(a.lens || 'Literary lens to be added')}</span>${arrow}</div></a>`).join('')}</div>${pageTurn(1)}</div>`;
  }

  function analysis(index) {
    const a = data.analyses[index];
    const body = a.sections?.length ? a.sections.map((s,i) => `<section class="analysis-section"><span class="kicker">${number(i+1)} / CLOSE READING</span><h2>${esc(s.heading)}</h2><div class="prose">${paragraphs(s.text)}</div></section>`).join('') : (analysisText(a).trim() ? `<div class="prose">${paragraphs(analysisText(a))}</div>` : writingSection('The complete analysis','','Your full analysis will appear here, including the central argument, textual evidence, interpretation through your chosen literary lens, and conclusion.'));
    return `<div class="wrap"><article class="analysis-detail"><header class="page-head">${breadcrumb('ANALYSIS '+number(index+1),true)}<span class="eyebrow rust">THE COLLECTION · ${number(index+1)} / 07</span><h1>${esc(a.title || 'Literary analysis '+number(index+1))}</h1>${a.subtitle ? `<p class="lede analysis-subtitle">${esc(a.subtitle)}</p>` : ''}</header><dl class="analysis-metadata"><div><dt>Author / attribution</dt><dd>${esc(a.author || 'To be added')}</dd></div><div><dt>Literary lens</dt><dd>${esc(a.lens || 'To be added')}</dd></div></dl>${body}${a.references?.length ? `<section class="analysis-references" aria-labelledby="references-heading"><h2 id="references-heading">Sources & editions</h2>${referencesList(a.references)}</section>` : ''}<nav class="analysis-navigation" aria-label="Analysis navigation"><a href="${index > 0 ? '#analysis-'+index : '#analyses'}">← ${index > 0 ? 'Analysis '+number(index) : 'All seven analyses'}</a><a href="#analyses">Collection</a><a href="${index < 6 ? '#analysis-'+(index+2) : '#favorite'}">${index < 6 ? 'Analysis '+number(index+2) : 'Favorite masterpiece'} →</a></nav></article></div>`;
  }

  function favorite() {
    const f = data.favorite;
    const themes = [
      ['Homecoming','Odysseus longs for Ithaca; his reunion with Penelope gives the return home its personal meaning.','BOOKS V & XXIII'],
      ['Intelligence & pride','The “Nobody” deception helps Odysseus escape the Cyclops, but revealing his name brings consequences.','BOOK IX'],
      ['Hospitality','Nausicaa and the Phaeacians receive a vulnerable stranger and help him find his way home.','BOOKS VI–VIII'],
      ['Temptation & restraint','Bound to the mast, Odysseus hears the Sirens while his crew protect themselves with wax.','BOOK XII']
    ];
    return `<div class="wrap"><header class="page-head" style="padding-bottom:0">${breadcrumb('FAVORITE MASTERPIECE')}<span class="eyebrow rust">CHAPTER 03 · MY FAVORITE LITERARY MASTERPIECE</span></header><section class="favorite-hero"><div><h1>The <em>Odyssey.</em></h1><p class="author">by Homer</p><p class="lede">A long voyage. A distant home.<br>A story about what it means to return.</p><div class="book-tags"><span>Ancient Greece</span><span>Epic poetry</span><span>Homecoming</span></div></div>${artwork()}</section><section class="two-columns"><div><span class="eyebrow rust">THE WORK AT A GLANCE</span><h2>A journey<br>toward <em>Ithaca.</em></h2></div><div class="prose"><p>Homer's <em>The Odyssey</em> follows Odysseus as he struggles to return to Ithaca after the Trojan War. His voyage brings encounters with the Cyclops, Circe, the Sirens, and other dangers, while Penelope and Telemachus confront the suitors occupying his household.</p><p>The epic moves between the journey abroad and the troubled home awaiting him. Through disguise, storytelling, recognition, and reunion, it explores the demands of survival and the meaning of belonging. Returning home requires endurance, intelligence, and the recovery of relationships tested by years of separation.</p><a class="source-link" href="https://www.gutenberg.org/files/1727/1727-h/1727-h.htm" target="_blank" rel="noopener noreferrer">Read the primary text · Samuel Butler translation ↗</a></div></section><div class="section-head"><div><span class="eyebrow rust">THREADS THROUGH THE EPIC</span><h2>Themes worth exploring.</h2></div></div><div class="themes">${themes.map((t,i)=>`<section class="theme"><span class="theme-num">${number(i+1)}</span><h3>${t[0]}</h3><p>${t[1]}</p><span class="book-ref">${t[2]}</span></section>`).join('')}</div><div class="personal-favorite">${writingSection('Why this is my favorite',f.reasons,'Explain why The Odyssey is the most meaningful or memorable literary masterpiece for you.','01 / MY CHOICE')}${writingSection('What stayed with me',f.influences,'Discuss the significant themes, characters, or lessons that influenced your appreciation of the epic.','02 / THEMES & CHARACTERS')}${writingSection('Where the story meets my life',f.connections,'Connect the work to your own experiences, values, or realizations. What did this story help you see?','03 / PERSONAL CONNECTIONS')}<p class="section-note">Homer, <em>The Odyssey</em>, translated by Samuel Butler. Personal discussion refers to Books IX, XII, and XXIII. <a class="source-link" href="#sources">View sources & artwork credits ↗</a></p></div>${pageTurn(2)}</div>`;
  }

  function learning() {
    const l = data.learning;
    const prompts = [
      ['Across times and cultures','Historical & cultural understanding',l.historical,'Describe what you learned from masterpieces from different historical periods and cultures. How did context deepen your reading?'],
      ['Through different lenses','Literary approaches',l.lenses,'Explain the literary lenses you learned and how you applied them to interpret specific works.'],
      ['Literature and being human','Human experiences & societies',l.human,'Explore how literature reflects people’s experiences, beliefs, and societies. Include connections you discovered across works.'],
      ['Learning to look deeper','Critical & analytical skills',l.skills,'Summarize how your critical thinking, interpretation, and analysis developed. Include examples of the skills you gained.']
    ];
    return `<div class="wrap">${pageHead(chapters[3], 'What the pages<br><em>taught me.</em>', 'Perspectives and skills I carry forward from Great Books.')}<div class="prompt-layout"><aside class="aside-note"><span class="big-number">04</span><h2>Ways of seeing.</h2></aside><div>${prompts.map((p,i)=>`<section class="prompt-item"><span class="question-number">${number(i+1)} / ${p[1].toUpperCase()}</span><h2>${p[0]}</h2>${textOrPlaceholder(p[2],p[3])}</section>`).join('')}</div></div>${pageTurn(3)}</div>`;
  }

  function reflection() {
    const r = data.reflection;
    const prompts = [
      ['A changing relationship with literature','How has your understanding and appreciation of literature changed throughout the course?',r.appreciation,'Reflect on the reader you were at the beginning and the reader you are becoming.'],
      ['The difficult parts of the journey','What challenges did you encounter when reading and analyzing literary masterpieces, and how did you overcome them?',r.challenges,'Describe a real challenge and the strategies that helped you move through it.'],
      ['The lens that changed my view','Which literary lens or approach influenced your interpretation of literature the most? Why?',r.approach,'Name the approach, explain its influence, and connect it to a work you studied.'],
      ['What stories reveal about us','What important realizations about life, society, culture, or human nature have you gained?',r.realizations,'Share the realizations that matter to you and explain how the readings helped shape them.'],
      ['Carrying the lessons forward','How can you apply the lessons and values learned from Great Books in your personal, academic, or future professional life?',r.application,'Describe concrete ways these lessons may guide your choices beyond the course.']
    ];
    return `<div class="wrap">${pageHead(chapters[4], 'Beyond the<br>final <em>page.</em>', 'A personal reflection on growth, challenges, and the ideas that travel with us beyond the classroom.')}<div class="prompt-layout"><aside class="aside-note"><span class="big-number">05</span><h2>Pause. Look back.</h2></aside><div>${prompts.map((p,i)=>`<section class="prompt-item"><span class="question-number">REFLECTION ${number(i+1)}</span><h2>${p[0]}</h2>${textOrPlaceholder(p[2],p[3])}</section>`).join('')}</div></div>${pageTurn(4)}</div>`;
  }

  function sources() {
    const readingSources = data.analyses.filter(a => a.references?.length).map(a => `<section class="source-item"><h2>${esc(a.title)}</h2>${referencesList(a.references)}${bookCredit(a)}</section>`).join('');
    return `<div class="wrap">${pageHead({short:'Sources & artwork'},'Words and images,<br><em>acknowledged.</em>','Primary texts, supporting scholarship, and visual materials used throughout this portfolio.')}<div class="sources-list">
      <section class="source-item"><h2>Reading the references</h2><p>Each analysis identifies its literary lens and refers to specific books, chapters, cantos, or verses. The links below identify the editions used. Historical translations can differ in names, wording, and numbering from editions assigned in class.</p></section>
      ${readingSources}
      <section class="source-item"><h2>The favorite masterpiece</h2><p>Homer. <em>The Odyssey.</em> Translated into English prose by Samuel Butler. Project Gutenberg, eBook no. 1727. This edition also supports the overview and book references on the favorite masterpiece page.</p><a href="https://www.gutenberg.org/files/1727/1727-h/1727-h.htm" target="_blank" rel="noopener noreferrer">Read The Odyssey at Project Gutenberg ↗</a></section>
      <section class="source-item"><h2>The artwork</h2><figure class="sources-art"><img src="assets/ulysses-and-the-sirens.jpg" alt="The full uncropped painting Ulysses and the Sirens by John William Waterhouse." width="1920" height="965" loading="lazy"><figcaption>${artworkCredit}</figcaption></figure><p>Oil on canvas. National Gallery of Victoria, Melbourne. Purchased 1891. The museum record identifies the artwork as public domain. Used as a visual interpretation of the Sirens episode in Book XII.</p><a href="https://www.ngv.vic.gov.au/explore/collection/work/4457/" target="_blank" rel="noopener noreferrer">View the National Gallery of Victoria collection record ↗</a></section>
      <section class="source-item"><h2>Writing & design</h2><p>The student profile uses details and a photograph supplied by Marnel Rufo Vasquez. The literary analyses, favorite masterpiece discussion, learning summary, and personal reflection were developed with AI writing assistance using the primary texts, background sources, and personal interests provided.</p><p>Display type: Libre Caslon Display. Body type: DM Sans. Font licenses are included with the local files. Compass illustration created for this portfolio.</p></section>
      <a class="text-link" href="#home">Return to the beginning ${arrow}</a>
    </div></div>`;
  }

  const views = { home, profile, analyses, favorite, learning, reflection, sources };
  const titles = { home: 'My Literary Journey', profile: 'Student Profile', analyses: 'Seven Literary Analyses', favorite: 'The Odyssey by Homer', learning: 'Summary of Learning', reflection: 'Personal Reflection', sources: 'Sources & Artwork' };
  let currentView = '';
  function render() {
    let route;
    try { route = decodeURIComponent(location.hash.slice(1) || 'home'); } catch { route = 'not-found'; }
    if (route === 'main') { main.focus({preventScroll:true}); return; }
    if (route === 'chapters') {
      if (currentView !== 'home') show('home',home());
      requestAnimationFrame(() => document.getElementById('chapters')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
      return;
    }
    const match = /^analysis-([1-7])$/.exec(route);
    const active = match ? 'analyses' : route;
    if (match) show(active,analysis(Number(match[1])-1),'Analysis '+number(Number(match[1])));
    else if (views[route]) show(active,views[route]());
    else show('',`<div class="wrap not-found"><span class="eyebrow rust">A TURN IN THE JOURNEY</span><h1>Page not found.</h1><a class="button" href="#home">Return home ${arrow}</a></div>`,'Page not found');
  }
  function show(active,html,title) {
    main.innerHTML = `<div class="reveal">${html}</div>`;
    currentView = active;
    document.title = active === 'home' ? 'My Literary Journey · The Odyssey' : (title || titles[active] || 'Portfolio')+' · My Literary Journey';
    document.querySelectorAll('[data-nav]').forEach(link=>{
      if(link.dataset.nav===active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    });
    nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
    window.scrollTo({top:0,behavior:'instant'});
    main.focus({preventScroll:true});
  }
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));
  });
  nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
  document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();main.focus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menu.contains(e.target)){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
  window.addEventListener('hashchange',render);
  render();
})();
