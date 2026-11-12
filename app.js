'use strict';
(() => {
  const SOURCE = `https://github.com/BrunoPessoa22/special-project/blob/${YUTAI_DATA.ref}/docs/DESIGN.md`;
  const CHAPTERS = [
    ['start', 'Start here', 'home'], ['colour', 'Colour', 'colour'], ['type', 'Typography', 'type'],
    ['components', 'Components', 'parts'], ['holder', 'Holder experience', 'holder'],
    ['admin', 'Operator experience', 'admin'], ['rules', 'Layout & rules', 'rules'], ['review', 'Try changes', 'edit']
  ];
  const paths = {
    home:'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
    colour:'M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z',
    voice:'M4 4h16v12H9l-5 4ZM8 8h8m-8 4h5',
    spend:'M3 5h18v14H3ZM3 10h18m-13 5h3',
    type:'M4 5h16M12 5v15M8 20h8M4 5v3m16-3v3',
    parts:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    holder:'M5 3h14v5a3 3 0 0 0 0 6v7H5v-7a3 3 0 0 0 0-6ZM12 6v2m0 3v2m0 3v2',
    admin:'M3 4h18v16H3ZM8 4v16m0-11h13m-9 5h5',
    rules:'M4 4h16v16H4ZM4 9h16M9 9v11',
    edit:'m4 16 12-12 4 4-12 12H4ZM14 6l4 4'
  };
  const icon = key => `<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[key]}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state = {adminSeen:false,chapter:'start',look:'light',zone:'holder',ticket:'ready',days:452,scenario:'standard',mode:'Live',uiState:'normal'};
  const KEY = 'yutai-design-review-v1';
  const DEFAULT = {ink:'#15245A',green:'#2BF59A',surface:'#FFFFFF',body:'Source Sans 3',display:'Sora',radius:999,size:16,notes:''};
  let proposal = {...DEFAULT};
  let storageAvailable = true;
  let toastTimer;
  try { const stored = localStorage.getItem(KEY); if (stored) proposal = validateProposal(JSON.parse(stored)); } catch { storageAvailable = false; }
  function validateProposal(input) {
    const p = input?.proposal || input;
    if (!p || typeof p !== 'object' || Array.isArray(p)) throw Error('Choose a Yutai review JSON file.');
    const out = {};
    for (const key of ['ink','green','surface']) {
      if (typeof p[key] !== 'string' || !/^#[0-9a-f]{6}$/i.test(p[key])) throw Error(`The ${key} colour needs a six-digit hex value.`);
      out[key] = p[key].toUpperCase();
    }
    for (const key of ['body','display']) {
      if (!['Source Sans 3','Sora','DM Mono'].includes(p[key])) throw Error('Choose one of the supplied typefaces.');
      out[key] = p[key];
    }
    for (const [key,min,max] of [['radius',0,999],['size',14,20]]) {
      if (typeof p[key] !== 'number' || !Number.isFinite(p[key]) || p[key] < min || p[key] > max) throw Error(`The ${key} value is outside its supported range.`);
      out[key] = p[key];
    }
    if (typeof p.notes !== 'string' || p.notes.length > 8000) throw Error('Review notes must be text of 8,000 characters or fewer.');
    out.notes = p.notes;
    return out;
  }
  function saveProposal() {
    try { localStorage.setItem(KEY, JSON.stringify(proposal)); storageAvailable = true; return true; }
    catch { storageAvailable = false; return false; }
  }
  function announce(message) {
    const node = document.querySelector('#announcement'); node.textContent = message; node.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { node.hidden = true; }, 3800);
  }
  function source(id, anchor) { return `<a href="${SOURCE}#${anchor}" target="_blank" rel="noopener"><code>${id}</code> ↗</a>`; }
  const anchors = {holder:'holder-zone-app-version-2-d-457',admin:'backoffice-zone-admin-version-2-d-457',docs:'docs-zone-docs-v1',colour:'colour',type:'type',shape:'shape-and-density'};
  function refs(...pairs) { return `<div class="source-line">Source rules · ${pairs.map(([id,group])=>source(id,anchors[group] || group)).join(' ')}</div>`; }
  function head(title, intro, references='') { return `<header class="chapter-head"><h1>${title}</h1><p class="intro">${intro}</p>${references}</header>`; }
  function note(title,text,id,group) { return `<section class="rule-note"><h3>${title}</h3><p>${text}</p><a class="rule-link" href="${SOURCE}#${anchors[group] || group}" target="_blank" rel="noopener">${id} · Read the rule ↗</a></section>`; }
  const logo = () => `assets/yutai-logo-${state.look === 'dark' ? 'dark':'light'}.svg`;
  function pass(name='EX') { return `<span class="company-pass" aria-hidden="true">${name}</span>`; }
  function company(name='Example Co',meta='Illustrative holding',initials='EX') { return `<div class="company">${pass(initials)}<div><strong>${name}</strong><p>${meta}</p></div></div>`; }
  function ticket(status = 'ready') {
    const map = {
      ready:['A place at the next preview','Ready to claim','Tier 2 · 365 days','Claim benefit'],
      locked:['A place at the next preview','Still unlocking','Tier 2 · 365 days','Unlocks at Tier 2'],
      claimed:['A place at the next preview','Already claimed','Your claim is recorded','Claimed'],
      paused:['This programme is paused. Your time held keeps counting.','Programme paused','Your holding time still counts','Paused for now'],
      expired:['A place at the next preview','Offer ended','This benefit has expired','Expired']
    };
    const item=map[status];
    return `<article class="ticket" data-state="${status}" aria-label="${item[1]} benefit specimen"><div class="ticket-main"><div class="ticket-brand"><span>Example Co</span>${pass()}</div><h3 class="ticket-title">${item[0]}</h3><span class="ticket-state">${status==='ready'?'<span class="ready-dot" aria-hidden="true"></span>':''}${item[1]}</span></div><div class="ticket-stub"><span>${item[2].replace(/(\d+) days/g,'$1&nbsp;days')}</span>${status==='ready'?`<button type="button" data-demo="claim">${item[3]}</button>`:`<span>${item[3]}</span>`}</div></article>`;
  }
  function track(days=452,max=1095,thresholds=[365,1095]) {
    return `<div class="day-track" role="img" aria-label="${days} days held. ${thresholds.length ? 'Programme milestones: '+thresholds.join(' and ')+' days.':state.scenario==='none'?'No programme yet.':'This programme has one tier.'}"><span class="day-fill" style="width:${Math.min(days/max*100,100)}%"></span>${thresholds.map((n,i)=>`<span class="day-marker ${days>=n?'reached':''} ${n===max?'last':''}" style="left:${n/max*100}%"><span>Tier ${i+2}</span></span>`).join('')}</div>`;
  }
  function holderMini() {
    return `<div class="specimen" data-theme="${state.look}"><div class="sample-head"><img src="${logo()}" alt="Yutai" class="sample-logo"><span>Holder specimen</span></div><div class="sample-body">${company()}<div class="held"><strong>452</strong><span>days</span></div>${track()}<h3 class="sample-section-title">Ready to claim</h3>${ticket()}</div><div class="sample-foot"><span>Time held becomes something tangible.</span><span class="status-word"><i class="ready-dot" aria-hidden="true"></i>Earned</span></div></div>`;
  }
  function start() {
    return head('Yutai, made visible.','A walkthrough of the design contract. See how the identity becomes an experience, then try changes beside the original.',refs(['H2','holder'],['A2','admin'],['DV1','docs']))+
    `<div class="lead-split"><div>${holderMini()}<div class="spec-caption"><span>Source-based specimen · fictional company and data</span><span>Holder · version 2</span></div></div><div class="notes-stack">${note('A shared identity. Different jobs.','Holders see time, progress and benefits. Operators see evidence and the work that needs a decision. The documentation keeps its linen and Patina palette.','H2 · A2 · DV1','docs')}${note('Green carries meaning.','Earned in the holder app. Live in the operator desk. Primary actions are ink; green is not the general button colour.','H2-04 · A2-05','holder')}${note('Review before we standardise.','These are design specimens, not screenshots of the live product. Try ideas in a separate draft; the original rules stay intact.','Source baseline','holder')}</div></div>
    <section class="section-block"><h2>One source. Clear precedence.</h2><div class="mini-diagram"><div class="diagram-step"><strong>Shared foundations</strong><p>Colour roles, density, plain language and accessible states.</p></div><div class="diagram-step"><strong>Zone-specific rules</strong><p>Holder V2 and Admin V2 supersede the older rules they name.</p></div><div class="diagram-step"><strong>Separate proposals</strong><p>Experiment here. Export a draft for discussion and a later commit.</p></div></div></section><p class="public-note">A working visual review of the supplied design contract. It does not establish product readiness, active partnerships or available benefits. The private source link requires repository access.</p>`;
  }
  const rootPalette = {ground:{light:'#F4F1E7',dark:'#0E1C1D',use:'Canvas. The documentation retains the shared linen / Patina palette.'},surface:{light:'#FBFAF5',dark:'#152A2B',use:'A raised reading or component surface.'},ink:{light:'#172A2B',dark:'#F4F1E7',use:'Primary text.'},'ink-2':{light:'#56655F',dark:'#A3B2AC',use:'Secondary text.'},primary:{light:'#245E61',dark:'#6FB3AE',use:'Patina: primary action and selection in the root theme.'},field:{light:'#8E8674',dark:'#6A8584',use:'Interactive field boundaries.'},line:{light:'#D9D2C1',dark:'#2C4748',use:'Decorative separators.'},focus:{light:'#245E61',dark:'#6FB3AE',use:'Keyboard focus.'},'status-positive':{light:'#235E3F',dark:'#6CC08F',use:'Positive status text, separate from status fill.'}};
  function palette() { return ['docs','shared','studio'].includes(state.zone) ? rootPalette : YUTAI_DATA.tokens; }
  function previewProperties(p,look=state.look) {
    const map={ground:'ground',surface:'surface',ink:'ink','ink-2':'ink2',line:'line',primary:'primary',field:'field',focus:'focus',active:'active'};
    return Object.entries(map).filter(([key])=>p[key]).map(([key,name])=>`--s-${name}:${p[key][look]}`).join(';') + (p.primary ? `;--s-on:${look==='dark'?'#050B1E':'#FFFFFF'}`:'');
  }
  function roleDescription(key,fallback){
    if(state.zone!=='holder')return fallback;
    const roles={ground:'The holder page ground.',surface:'Benefits, fields and floating layers.',ink:'Primary text, icons and the days-held figure.', 'ink-2':'Secondary text and evidence lines.', active:'Selected navigation pills and day-axis tracks.',line:'Borders and separators.',primary:'The primary pill action, filled in ink.',green:'Earned: days held and a benefit ready. Never a button or navigation fill.',field:'The boundary of a field or default pill.',focus:'Keyboard focus, except for the ticket-specific ring.'};return roles[key]||fallback;
  }
  function colour() {
    const p=palette(),keys=state.zone==='docs'||state.zone==='shared'||state.zone==='studio'?Object.keys(rootPalette):['ground','surface','ink','ink-2','active','line','primary','green','field','focus','warn','bad'];
    return head('Colour has a job.','Review the colour roles in context. The shared theme and the two V2 product zones are deliberately different.',refs(['Y-06–12','colour'],['H2-04–05','holder'],['A2-04–06','admin']))+
    `<div class="view-controls"><label class="control-label">Design zone<select id="zone-select"><option value="holder">Holder · V2</option><option value="admin">Operator · V2</option><option value="docs">Documentation · V1</option><option value="studio">Studio · shared foundation</option><option value="shared">Shared foundation</option></select></label><span class="help" id="zone-note">${state.zone==='holder'?'Green means earned. Ink means action.':state.zone==='admin'?'Green means live. Ink means action.':'Linen and Patina remain the root design language.'}</span></div>
    <div class="colour-layout"><div class="role-grid">${keys.map(key=>`<div class="swatch"><div class="swatch-colour" style="background:${p[key][state.look]}"></div><strong>${key}</strong> <code>${p[key][state.look].toUpperCase()}</code><small>${esc(roleDescription(key,p[key].use))}</small></div>`).join('')}</div><div class="colour-preview"><div class="specimen" data-theme="${state.look}" style="${previewProperties(p)}"><div class="role-message"><h3>Clarity before decoration.</h3><p>Colour tells you what you can do, what has been earned, and what needs attention.</p>${['holder','admin'].includes(state.zone)?`<p class="status-word"><i class="status-mark live" aria-hidden="true"></i>${state.zone==='admin'?'Live · specimen':'Ready to claim'}</p>`:''}<button class="sample-button ${state.zone==='holder'?'holder-action':''}" data-demo="action" type="button">${state.zone==='admin'?'Review evidence':'View details'}</button></div></div><p class="state-description">Preview controls belong to this review tool. They do not add appearance controls to the holder product.</p></div></div>`;
  }
  function type() {
    return head('Three faces. Distinct roles.','The hierarchy comes from a precise division of work—not from giving every line a louder treatment.',refs(['H2-02','holder'],['A2-01–02','admin']))+
    `<div class="type-faces"><section class="type-face"><div><p class="face-name">Sora</p><p class="face-detail">Titles, figures and holder actions<br>400 · 600 · 700</p></div><p class="sora-sample">A relationship worth holding.</p></section><section class="type-face"><div><p class="face-name">Source Sans 3</p><p class="face-detail">Body, labels and navigation<br>400 · 600</p></div><p class="body-sample">Your time held keeps counting. See what you have earned and what comes next.</p></section><section class="type-face"><div><p class="face-name">DM Mono</p><p class="face-detail">Amounts, IDs and data<br>400 · 500</p></div><p class="mono-sample">452 days · 4 shares<br>0x1234…abcd · 12 Nov 2026</p></section></div>
    <section class="section-block"><div class="section-heading"><h2>See the scale</h2><label class="control-label">Type scale<select id="type-zone"><option value="holder">Holder V2</option><option value="admin">Operator V2</option><option value="shared">Shared foundation</option></select></label></div><div id="type-scale">${typeScale('holder')}</div></section>
    <section class="rule-note section-block"><h3>Use the actual weights.</h3><p>Admin body copy uses 400 or 600. DM Mono uses 400 or 500. The outlined Yutai wordmark is artwork, never a typed approximation. All typefaces on this page are self-hosted.</p></section>`;
  }
  function typeScale(zone) {
    const rows=zone==='holder'?[['Hero figure','Days held','144 / 116','Sora 700'],['Page title','Your holdings','32 / 38','Sora 700'],['Section','Ready to claim','20 / 26','Sora 600'],['Body','Your time held keeps counting.','16 / 24','Source Sans 3'],['Data','452 days','13 / 20','DM Mono']]:zone==='admin'?[['Statement','Three decisions need you.','28 / 34','Sora 700'],['Section','Decisions waiting','16 / 22','Sora 600'],['Body','Evidence is ready to review.','15 / 22','Source Sans 3'],['Label','Programme name','13 / 18','Source Sans 3 600'],['Data','2,480','13 / 18','DM Mono']]:[['Hero','A new connection.','48 / 52','Shared display'],['Page title','Your overview','36 / 44','Shared title 1'],['Section','A clearer picture','22 / 28','Shared title 3'],['Body','Clear language, useful context.','16 / 24','Comfortable body'],['Meta','12 Nov 2026','12 / 16','Metadata']];
    return `<table class="scale-table"><caption class="help" style="text-align:left">Source sizes, in pixels. Samples fit this review table; use the holder screen to see the full hero size.</caption><thead><tr><th scope="col">Role</th><th scope="col">Specimen</th><th scope="col">Size / line</th></tr></thead><tbody>${rows.map(([role,text,size,font],i)=>`<tr><td><span class="type-role">${role}</span></td><td><span class="sample-text" style="font-size:${i===0?32:i===1?26:i===2?20:16}px;${font.startsWith('DM')?'font-family:DM Mono;font-weight:400':font.startsWith('Source')?'font-family:Source Sans 3;font-weight:400':''}">${text}</span><p class="help">${font}</p></td><td><code>${size}</code></td></tr>`).join('')}</tbody></table>`;
  }
  function components() {
    const stateDescriptions={ready:'A ready ticket uses the company’s full colour. The action sits in its bottom stub.',locked:'A benefit that is still unlocking stays neutral. Colour is earned, not decoration.',claimed:'A claimed ticket stays neutral and tells the holder what has happened.',paused:'A paused programme explains that time still counts. A benefit that is itself paused would be hidden.',expired:'An expired benefit stays neutral. It does not contribute to a ready-benefit count.'};
    return head('The benefit becomes a ticket.','A recognisable object with a meaningful state, clear action and the same structure at every size.',refs(['H2-06','holder'],['A2-06 · 12','admin']))+
    `<div class="state-strip" role="group" aria-label="Benefit ticket state">${['ready','locked','claimed','paused','expired'].map(key=>`<button type="button" data-ticket="${key}" aria-pressed="${key===state.ticket}">${{ready:'Ready',locked:'Unlocking',claimed:'Claimed',paused:'Paused',expired:'Expired'}[key]}</button>`).join('')}</div><div class="lead-split"><div><div class="specimen component-stage" data-theme="${state.look}">${ticket(state.ticket)}</div><p class="state-description">${stateDescriptions[state.ticket]}</p></div><div class="notes-stack">${note('Body, perforation, stub.','The holder ticket’s stub is a bottom strip, 60px high on desktop and 68px on phone. It is not the operator worklist’s side stub.','H2-06','holder')}${note('Shape is consistent.','A 20px radius, 9px half-circle notches and a minimum height of 196px. The ready company ink must clear 4.5:1 on its fill.','H2-06 · 10','holder')}</div></div>
    <section class="section-block"><div class="section-heading"><h2>The quieter pieces matter.</h2><label class="control-label">Interface state<select id="ui-state"><option value="normal">Normal</option><option value="loading">Loading</option><option value="error">Error</option><option value="empty">Empty</option></select></label></div><div id="interface-parts">${interfaceParts()}</div></section>`;
  }
  function interfaceParts() {
    const look=`data-theme="${state.look}"`;
    if(state.uiState==='empty') return `<div class="specimen empty-sample" ${look}><h3>No source connected yet.</h3><p>Connect a source to start building your holder record.</p><div><button class="sample-button" type="button" data-demo="connect">Connect a source</button></div></div>`;
    if(state.uiState==='loading') return `<div class="specimen part-sample" ${look} role="status" aria-label="Loading specimen"><h3>Holder record</h3><div class="skeleton"></div><div class="skeleton" style="width:65%"></div><div class="skeleton" style="width:82%"></div><p class="help" style="color:var(--s-ink2)">Flat bars keep the final layout in place.</p></div>`;
    return `<div class="component-library"><div class="specimen part-sample" ${look}><h3>Actions</h3><div class="button-stack"><button class="sample-button" type="button" data-demo="review">Review</button><button class="sample-button default" type="button" data-demo="cancel">Cancel</button><button class="sample-button ghost" type="button" data-demo="details">Details</button><button class="sample-button" type="button" disabled>Unavailable</button></div><p class="sample-meta" style="margin-top:24px">One primary action. Other actions stay quiet.</p></div><div class="specimen part-sample" ${look}><h3>Fields & feedback</h3><label class="sample-field">Programme name<input aria-label="Programme name specimen" value="${state.uiState==='error'?'':'Example programme'}" ${state.uiState==='error'?'aria-invalid="true" aria-describedby="field-feedback"':''}><span id="field-feedback" class="${state.uiState==='error'?'field-error':'field-help'}">${state.uiState==='error'?'Add a programme name to continue.':'A clear label, useful help and a visible boundary.'}</span></label></div></div>`;
  }
  function holder() {
    const max=state.days>1095 ? (Math.floor(state.days/365)+1)*365 :1095;
    const marks=state.scenario==='one'||state.scenario==='none'?[]:[365,1095];
    const current=state.days>=1095?3:state.days>=365?2:1;
    const next=state.scenario==='one'?'Its programme has one tier':state.scenario==='none'?'No programme yet':state.scenario==='unknown'?'No date for the next tier yet':current===3?'Top tier reached':`Tier ${current+1} in ${(current===1?365:1095)-state.days} days`;
    const summary=state.scenario==='none'?'No benefits yet':state.days>=365?'1 ready':'1 unlocking';
    return head('Time held is the main event.','A holder sees where they stand, what they have earned and the next milestone within each programme.',refs(['H2-01–03 · 07','holder']))+
    `<div class="view-controls"><div class="timeline-control"><label for="held-days">Try a different holding duration</label><output for="held-days" id="days-output">${state.days} days</output><input id="held-days" type="range" min="1" max="1460" step="1" value="${state.days}"></div><label class="control-label">Programme scenario<select id="axis-scenario"><option value="standard">Multiple tiers</option><option value="one">One tier only</option><option value="none">No programme</option><option value="unknown">Next tier date unknown</option></select></label></div>
    <div class="specimen holder-full" data-theme="${state.look}"><div class="sample-head"><img class="sample-logo" src="${logo()}" alt="Yutai"><span>Illustrative holder screen</span></div><div class="sample-body"><div class="holder-nav" aria-label="Specimen destinations"><span class="selected">Overview</span><span>Holdings</span><span>Benefits</span><span>Voice</span><span>Spend</span></div><div class="held" role="img" aria-label="${state.days} days held"><strong id="hero-days">${state.days}</strong><span>days</span></div><p style="color:var(--s-ink2)">Your Example Co holding</p><div class="axis-heading" style="margin-top:28px"><span>Day 1</span><span id="scale-end">${max} days</span></div><div id="hero-track">${track(state.days,max,marks)}</div><p class="sample-meta" id="next-tier">${next}</p><h3 class="sample-section-title">Your holdings</h3><div class="axis-row">${company('Example Co',summary)}<div id="first-row-track">${track(state.days,max,marks)}</div><p class="sample-meta" id="first-row-next">${next}</p></div><div class="axis-row">${company('Field Studio','1 unlocking','FS')}<div id="second-row-track">${track(146,max,[180,730])}</div><p class="sample-meta">146 days · Tier 2 in 34 days</p></div><p style="color:var(--s-ink2);font-size:14px;margin-top:24px">Illustrative sources · these values are fixtures.</p></div><div class="holder-mobile-tabs" aria-label="Illustrative phone destinations">${[['home','Overview'],['parts','Holdings'],['holder','Benefits'],['voice','Voice'],['spend','Spend']].map(([key,label],i)=>`<span class="${i===0?'selected':''}"><i>${icon(key)}</i><b>${label}</b></span>`).join('')}</div></div><div class="spec-caption"><span>Each row has its own programme thresholds.</span><span>The shared scale labels days, never universal tiers.</span></div>
    <div class="notes-stack section-block">${note('Past the highest tier.','The scale extends to the next whole year beyond the holding. A long-term holder still has somewhere to stand.','H2-07','holder')}${note('No invented calendar date.','A next-tier label uses days to go. Gaps in holding mean a projected calendar date would mislead.','H2-03','holder')}${note('Unknown is not top tier.','If the next threshold cannot be dated, the screen says so. A missing programme draws no tier marks.','H2-07','holder')}</div>`;
  }
  function admin() {
    const live=state.mode==='Live';
    return head('The operator sees the work.','A quiet desk for evidence, decisions and exceptions. Green signals live operation; the words always carry the mode.',refs(['A2-05–09','admin']))+
    `<div class="view-controls"><label class="control-label">Data mode specimen<select id="admin-mode"><option>Live</option><option>Simulated</option><option>Test data</option></select></label><span class="help">The source specifies dark by default, with light and system alternatives.</span></div>
    <div class="specimen" data-mode="${state.mode}" data-theme="${state.look}"><div class="admin-shell"><div class="admin-sidebar" aria-hidden="true"><img class="sample-logo" src="${logo()}" alt=""><span class="selected">Overview</span><span>Companies</span><span>Programmes</span><span>Holders</span><span>Claims</span></div><div class="admin-main"><div class="admin-top"><h3>Overview</h3><div class="mode-control"><i class="status-mark ${live?'live':'warn'}" aria-hidden="true"></i><span>${state.mode}</span></div></div><p class="admin-statement">Three decisions need you.</p><p class="admin-evidence">The work is grouped by what needs a person, with evidence beside the action.</p><h4 style="font-size:15px;font-weight:600;margin-bottom:12px">Decisions waiting · 3</h4><div class="worklist" role="group" aria-label="Specimen decisions waiting">${[['Programme needs review','Example Co · a new benefit is ready for a decision.','Review'],['Holding needs evidence','Field Studio · source evidence needs a closer look.','Open'],['Claim needs attention','Example Co · delivery confirmation is missing.','Open']].map(([title,detail,action],i)=>`<div class="work-row" tabindex="${i===0?'0':'-1'}" data-work-row="${i}"><div class="work-body"><strong>${title}</strong><p>${detail}</p></div><div class="work-stub"><button type="button" data-work="${i}" tabindex="-1" aria-label="${action}: ${title}">${action}</button></div></div>`).join('')}</div><div class="admin-bottom"><span>Illustrative worklist · no real operations</span><span class="mono">3 items</span></div></div></div></div><p class="state-description">${live?'Live is a specimen mode label here. This page is not connected to Yutai operations.':state.mode==='Simulated'?'Simulated means all domains use simulated data. A real simulated desk also retains its warning frame.':'Test data identifies a sandbox domain among the test data; it is distinct from simulated.'}</p>
    <div class="notes-stack section-block">${note('The action has its own place.','A 112px right-hand stub, 76px on phone. Perforation is a named exception, not a decorative border added everywhere.','A2-09','admin')}${note('Keyboard review.','Arrow keys move through the worklist. Enter opens the row action. Tab reaches its action, then leaves the book.','A2-09','admin')}${note('Some parts are targets.','The source distinguishes the design contract from components still being adopted. This specimen shows the intended rule, not verified production coverage.','A2-07–11','admin')}</div>`;
  }
  function rules() {
    return head('Consistency you can recognise.','Spacing, shape and language make the system coherent. Each zone keeps the density appropriate to its task.',refs(['Y-13–19','shape'],['Y-27–30','icons-and-motion'],['A2-11–12','admin']))+
    `<section class="geometry-row"><div><h3>Shape follows the zone.</h3><p>Shared controls 6px, admin controls 8px, holder actions pill-shaped.</p></div><div class="shape-samples">${[[6,'Shared control'],[8,'Admin control'],[12,'Admin panel'],[20,'Holder ticket'],[999,'Holder pill']].map(([radius,label])=>`<div class="shape-item"><div class="shape" style="border-radius:${radius}px"></div><span>${label}</span><code>${radius===999?'full':radius+'px'}</code></div>`).join('')}</div></section>
    <section class="geometry-row"><div><h3>Space has a rhythm.</h3><p>Shared foundations use a 4px base. The holder zone adds its named steps.</p></div><div class="spacing-samples">${[4,8,16,24,32,48,64,96].map(n=>`<div class="spacing-item"><div class="spacing-bar" style="width:${n}px"></div><code>${n}px</code></div>`).join('')}</div></section>
    <section class="geometry-row"><div><h3>Feedback, not performance.</h3><p>The V2 rules retire shimmer, tilt, count-up and breathing seals.</p></div><div><div class="small-actions"><button class="primary" id="motion-example" type="button">Try press feedback</button><span id="motion-result" class="help">120ms press · 180ms control · 240ms reveal</span></div><p class="help" style="margin-top:16px">Reduced motion makes feedback instant. No entrance animation runs on this page.</p></div></section>
    <section class="section-block"><h2>Rules worth keeping visible</h2><div class="rules-list">${[['Y-15','Cards hold things.','One holding, credential or benefit. Prose does not need a grid of decorative containers.'],['Y-19','Plain words.','Sentence case, British English and no letter-spaced labels.'],['Y-20','Numbers line up.','Tabular figures for amounts, counts, days and percentages.'],['Y-25','Every state is designed.','Loading preserves layout. Empty states explain the next action. Errors explain the recovery.'],['Y-29','Focus stays visible.','A two-pixel focus ring, offset from the target, with no sticky chrome covering it.'],['Y-30','Both widths matter.','No horizontal scroll at 360px. Contrast and keyboard access apply to both themes.']].map(([id,title,text])=>`<div class="rule-item"><code>${id}</code><div><strong>${title}</strong><p>${text}</p></div></div>`).join('')}</div></section>
    <section class="rule-note section-block"><h3>Where does the presentation system live?</h3><p>DESIGN.md governs product screens. A presentation system still needs agreed composition, imagery and story rules. This walkthrough gives us a concrete baseline to review before we create that separate extension.</p></section>`;
  }
  function review() {
    return head('Try a change. Keep the original.','Use a small specimen to compare choices. Your draft stays in this browser; export it when you want to share or commit it.',refs(['Source baseline','holder']))+
    `<div class="review-layout"><div class="editor" id="review-controls"><a class="mobile-preview-link" href="#proposal-anchor" data-review-jump="proposal-anchor">Preview your proposal ↓</a><div class="editor-fields">${[['ink','Primary ink'],['green','Earned green'],['surface','Surface']].map(([key,label])=>`<label class="control-label">${label}<span class="colour-input"><input type="color" id="edit-${key}" data-proposal="${key}" value="${proposal[key]}" aria-label="Draft ${label.toLowerCase()}"><code id="value-${key}">${proposal[key]}</code></span></label>`).join('')}<label class="control-label">Body typeface<select id="edit-body" data-proposal="body">${fontOptions(proposal.body)}</select></label><label class="control-label">Heading typeface<select id="edit-display" data-proposal="display">${fontOptions(proposal.display)}</select></label><label class="control-label">Control radius<input type="number" id="edit-radius" data-proposal="radius" min="0" max="999" step="1" value="${proposal.radius}"><span class="help">999px is a pill · draft only</span></label><label class="control-label">Body size<input type="number" id="edit-size" data-proposal="size" min="14" max="20" step="1" value="${proposal.size}"><span class="help">14–20px</span></label><label class="control-label wide">Review notes<textarea id="review-notes" data-proposal="notes" maxlength="8000" placeholder="What should we keep, change or test?">${esc(proposal.notes)}</textarea></label></div><p class="editor-message" id="editor-message" role="status">${storageAvailable?'Draft saves locally on this device.':'Browser storage is unavailable. Export your draft to keep it.'}</p><div class="export-actions"><button class="primary" type="button" id="export-json">Export review</button><button class="secondary" type="button" id="export-css">Export CSS</button><label class="secondary file-label">Import review<input class="file-input" type="file" accept=".json,application/json" id="import-review"></label><button class="quiet" type="button" id="reset-proposal">Reset draft</button></div><p class="help" style="margin-top:16px">Exported proposals do not update GitHub or the product. Share the review file to discuss the next commit.</p></div><div class="review-comparison"><section><div class="compare-title"><span>Source baseline</span><span class="draft-tag">Holder V2 roles · light</span></div><div class="specimen" data-theme="light">${reviewSample()}</div></section><section id="proposal-anchor"><div class="compare-title"><span>Your proposal</span><span class="draft-tag">Local draft · not approved</span></div><div class="specimen proposal" id="proposal-preview" data-theme="light">${reviewSample(true)}</div><div class="contrast-result" id="contrast-result"></div><div id="change-list" class="change-list"></div><a class="mobile-preview-link" href="#review-controls" data-review-jump="review-controls">Back to controls ↑</a></section></div></div>`;
  }
  function fontOptions(value) { return ['Source Sans 3','Sora','DM Mono'].map(name=>`<option ${value===name?'selected':''}>${name}</option>`).join(''); }
  function reviewSample(draft=false) { return `<div class="role-message"><h3>Your time held keeps counting.</h3><p>A quieter interface makes the benefit and the relationship easier to see.</p><p class="status-word"><i class="status-mark live" aria-hidden="true"></i>One benefit ready</p><button type="button" class="sample-button" data-demo="${draft?'proposal':'baseline'}">View your benefits</button></div>`; }
  function ratio(a,b) {
    const lum=hex=>{const v=hex.match(/[a-f0-9]{2}/gi).map(c=>parseInt(c,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722;};
    const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
  }
  function updateProposal() {
    const node=document.querySelector('#proposal-preview'); if(!node)return;
    const on=ratio(proposal.ink,'#FFFFFF')>=ratio(proposal.ink,'#050B1E')?'#FFFFFF':'#050B1E';
    const vars={'--s-ink':proposal.ink,'--s-ink2':'#46558C','--s-primary':proposal.ink,'--s-on':on,'--s-surface':proposal.surface,'--s-ground':proposal.surface,'--s-green':proposal.green,'--s-edge':proposal.ink,'--proposal-body':`'${proposal.body}'`,'--proposal-display':`'${proposal.display}'`,'--proposal-radius':proposal.radius+'px','--proposal-size':proposal.size+'px'};
    Object.entries(vars).forEach(([key,val])=>node.style.setProperty(key,val));
    const contrast=ratio(proposal.ink,proposal.surface),secondary=ratio('#46558C',proposal.surface);document.querySelector('#contrast-result').innerHTML=`Primary text <strong>${contrast.toFixed(2)}:1</strong> · body text <strong>${secondary.toFixed(2)}:1</strong><br>${Math.min(contrast,secondary)>=4.5?'Both meet the 4.5:1 body-text floor.':'A text pair is below 4.5:1. Revise this surface or ink.'}`;
    const diffs=Object.keys(DEFAULT).filter(k=>k!=='notes'&&proposal[k]!==DEFAULT[k]);
    document.querySelector('#change-list').innerHTML=diffs.length?`<strong>${diffs.length} proposed change${diffs.length===1?'':'s'}</strong><ul>${diffs.map(k=>`<li>${esc(k)}: ${esc(DEFAULT[k])} → ${esc(proposal[k])}</li>`).join('')}</ul>`:'No visual changes yet. The proposal currently matches this baseline specimen.';
    for(const key of ['ink','green','surface']){const field=document.querySelector('#value-'+key);if(field)field.textContent=proposal[key];}
  }
  function download(filename,body,type) {
    const blob=new Blob([body],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function exportReview() {
    download('Yutai-design-review.json',JSON.stringify({schema:'yutai-design-review/v1',source:{repository:'BrunoPessoa22/special-project',ref:YUTAI_DATA.ref,path:'docs/DESIGN.md'},status:'proposal-not-approved',proposal},null,2)+'\n','application/json');announce('Review exported. The source baseline has not changed.');
  }
  function exportCss() {
    download('Yutai-design-proposal.css',`/* Review proposal only. Not an approved product theme.\nSource: ${YUTAI_DATA.ref}\nApply after review, within the chosen zone. */\n.yutai-design-proposal {\n  --proposal-ink: ${proposal.ink};\n  --proposal-earned: ${proposal.green};\n  --proposal-surface: ${proposal.surface};\n  --proposal-body: '${proposal.body}';\n  --proposal-display: '${proposal.display}';\n  --proposal-control-radius: ${proposal.radius}px;\n  --proposal-body-size: ${proposal.size}px;\n}\n`,'text/css');announce('Draft CSS exported for review.');
  }
  function openDetail(title,body) {
    document.querySelector('#detail-title').textContent=title;
    document.querySelector('#detail-body').innerHTML=body;
    document.querySelector('#detail-dialog').showModal();
  }
  function render() {
    const renderers={start,colour,type,components,holder,admin,rules,review};
    document.querySelector('#chapter').innerHTML=renderers[state.chapter]();
    document.querySelectorAll('[data-look]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.look===state.look));
    document.querySelectorAll('#desktop-nav a').forEach(a=>a.getAttribute('href')==='#'+state.chapter?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
    document.querySelector('#chapter-select').value=state.chapter;
    document.querySelector('#chapter-context').textContent=state.chapter==='review'?'Baseline & proposal':'Source baseline';
    const i=CHAPTERS.findIndex(c=>c[0]===state.chapter),next=CHAPTERS[(i+1)%CHAPTERS.length];
    document.querySelector('#next-chapter').innerHTML=`${next[0]==='start'?'Back to start':'Explore '+next[1].toLowerCase()} <span aria-hidden="true">→</span>`;
    document.title='Yutai · '+CHAPTERS[i][1]+' · Design review';
    for(const [id,value] of [['zone-select',state.zone],['ui-state',state.uiState],['axis-scenario',state.scenario],['admin-mode',state.mode]]){const n=document.getElementById(id);if(n)n.value=value;}
    if(state.chapter==='review')updateProposal();
    bindChapter();
  }
  function updateHolding() {
    const max=state.days>1095?(Math.floor(state.days/365)+1)*365:1095;
    const marks=['one','none'].includes(state.scenario)?[]:[365,1095];
    const tier=state.days>=1095?3:state.days>=365?2:1;
    const next=state.scenario==='one'?'Its programme has one tier':state.scenario==='none'?'No programme yet':state.scenario==='unknown'?'No date for the next tier yet':tier===3?'Top tier reached':`Tier ${tier+1} in ${(tier===1?365:1095)-state.days} days`;
    document.querySelector('#hero-days').textContent=state.days;
    document.querySelector('#hero-days').parentElement.setAttribute('aria-label',`${state.days} days held`);
    document.querySelector('#days-output').textContent=state.days+' days';
    document.querySelector('#scale-end').textContent=max+' days';
    for(const id of ['hero-track','first-row-track'])document.getElementById(id).innerHTML=track(state.days,max,marks);
    document.querySelector('#second-row-track').innerHTML=track(146,max,[180,730]);
    document.querySelector('#next-tier').textContent=next;
    document.querySelector('#first-row-next').textContent=next;
    document.querySelector('.axis-row .company p').textContent=state.scenario==='none'?'No benefits yet':state.days>=365?'1 ready':'1 unlocking';
  }
  function bindChapter() {
    document.querySelectorAll('[data-review-jump]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const target=document.getElementById(a.dataset.reviewJump);target.scrollIntoView({block:'start'});target.tabIndex=-1;target.focus({preventScroll:true});}));
    document.querySelectorAll('[data-ticket]').forEach(b=>b.addEventListener('click',()=>{state.ticket=b.dataset.ticket;render();document.querySelector(`[data-ticket="${state.ticket}"]`).focus();}));
    document.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>openDetail(b.dataset.demo==='claim'?'Benefit claim specimen':'Design interaction specimen','<p>This is a local design demonstration with fictional data. No account, claim, purchase or source connection is created.</p><p>Use the component state controls to review how this object changes.</p>')));
    document.querySelector('#zone-select')?.addEventListener('change',e=>{state.zone=e.target.value;render();document.querySelector('#zone-select').focus();});
    document.querySelector('#type-zone')?.addEventListener('change',e=>{document.querySelector('#type-scale').innerHTML=typeScale(e.target.value);});
    document.querySelector('#ui-state')?.addEventListener('change',e=>{state.uiState=e.target.value;document.querySelector('#interface-parts').innerHTML=interfaceParts();bindParts();});
    document.querySelector('#held-days')?.addEventListener('input',e=>{state.days=Number(e.target.value);updateHolding();});
    document.querySelector('#axis-scenario')?.addEventListener('change',e=>{state.scenario=e.target.value;render();document.querySelector('#axis-scenario').focus();});
    document.querySelector('#admin-mode')?.addEventListener('change',e=>{state.mode=e.target.value;render();document.querySelector('#admin-mode').focus();});
    document.querySelectorAll('[data-work]').forEach(b=>b.addEventListener('click',()=>openDetail('Review evidence','<p>Fictional worklist evidence appears here. The operator drawer is a focused space for reviewing one item.</p><p>This review tool performs no operational action.</p>')));
    document.querySelectorAll('[data-work-row]').forEach(row=>row.addEventListener('keydown',e=>{
      const rows=[...document.querySelectorAll('[data-work-row]')],i=rows.indexOf(row);
      if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();rows.forEach(r=>{r.tabIndex=-1;r.querySelector('button').tabIndex=-1;});const next=rows[(i+(e.key==='ArrowDown'?1:-1)+rows.length)%rows.length];next.tabIndex=0;next.focus();}
      if(e.key==='Enter'&&e.target===row){e.preventDefault();row.querySelector('button').click();}
      if(e.key==='Tab'&&!e.shiftKey&&e.target===row){e.preventDefault();row.querySelector('button').tabIndex=0;row.querySelector('button').focus();}
    }));
    document.querySelector('#motion-example')?.addEventListener('click',()=>{document.querySelector('#motion-result').textContent='Feedback received. No size change or entrance effect.';});
    document.querySelectorAll('[data-proposal]').forEach(input=>input.addEventListener('input',e=>{
      const key=e.target.dataset.proposal,value=['radius','size'].includes(key)?Number(e.target.value):e.target.value;
      try{const next=validateProposal({...proposal,[key]:value});proposal=next;const saved=saveProposal();updateProposal();const msg=document.querySelector('#editor-message');msg.classList.remove('error');msg.textContent=saved?'Draft saved locally. Export to share it.':'Browser storage is unavailable. Export your draft to keep it.';}
      catch(error){const msg=document.querySelector('#editor-message');msg.textContent=error.message;msg.classList.add('error');}
    }));
    document.querySelector('#export-json')?.addEventListener('click',exportReview);
    document.querySelector('#export-css')?.addEventListener('click',exportCss);
    document.querySelector('#reset-proposal')?.addEventListener('click',()=>{proposal={...DEFAULT};saveProposal();render();announce('Local draft reset to the source specimen.');});
    document.querySelector('#import-review')?.addEventListener('change',async e=>{
      const file=e.target.files[0];if(!file)return;
      try{if(file.size>100000)throw Error('This file is too large. Choose a review JSON under 100 KB.');const data=JSON.parse(await file.text());if(data.schema!=='yutai-design-review/v1')throw Error('Choose a JSON file exported from this review tool.');if(data.source?.ref!==YUTAI_DATA.ref)throw Error('This review uses a different source baseline. Compare it before importing.');proposal=validateProposal(data);saveProposal();render();announce('Review imported as a local proposal.');}
      catch(error){const msg=document.querySelector('#editor-message');msg.textContent=error instanceof SyntaxError?'This file is not valid JSON. Choose an exported review file.':error.message;msg.classList.add('error');e.target.value='';}
    });
  }
  function bindParts(){document.querySelectorAll('#interface-parts [data-demo]').forEach(b=>b.addEventListener('click',()=>openDetail('Interface state specimen','<p>This is a visual demonstration. No connection or product action is performed.</p>')));}
  function navigate() {
    const key=location.hash.slice(1);state.chapter=CHAPTERS.some(c=>c[0]===key)?key:'start';if(state.chapter==='admin'&&!state.adminSeen){state.look='dark';state.adminSeen=true;}render();window.scrollTo({top:0});
  }
  document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();document.querySelector('#main').focus();window.scrollTo({top:0});});
  document.querySelector('#desktop-nav').innerHTML=CHAPTERS.map(([key,title,symbol])=>`<a href="#${key}">${icon(symbol)}<span>${title}</span></a>`).join('');
  document.querySelector('#chapter-select').innerHTML=CHAPTERS.map(([key,title])=>`<option value="${key}">${title}</option>`).join('');
  document.querySelector('#chapter-select').addEventListener('change',e=>{location.hash=e.target.value;});
  document.querySelectorAll('[data-look]').forEach(b=>b.addEventListener('click',()=>{state.look=b.dataset.look;render();}));
  document.querySelector('#next-chapter').addEventListener('click',()=>{const i=CHAPTERS.findIndex(c=>c[0]===state.chapter);location.hash=CHAPTERS[(i+1)%CHAPTERS.length][0];});
  document.querySelector('#close-detail').addEventListener('click',()=>document.querySelector('#detail-dialog').close());
  document.querySelector('#detail-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget&&e.offsetX<0)e.currentTarget.close();});
  window.addEventListener('hashchange',navigate);
  navigate();
})();
