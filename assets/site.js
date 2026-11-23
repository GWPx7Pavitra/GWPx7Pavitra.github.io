(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- Delhi time ----------
  function delhiNow() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' })
      .formatToParts(new Date()).reduce((o, p) => (o[p.type] = p.value, o), {});
    return { h: +parts.hour, m: +parts.minute, day: parts.weekday, text: `${parts.hour}:${parts.minute}` };
  }
  function statusFor({ h, day }) {
    const sunday = day === 'Sun';
    if (h < 3) return 'Peak hours. Probably shipping something.';
    if (h < 7) return 'Asleep. Finally.';
    if (h < 14) return sunday ? 'Sunday. A slow start, then code.' : 'In class. Replies after school.';
    if (h < 18) return 'Studying for boards. Mostly.';
    if (h < 23) return 'Building something.';
    return 'Peak hours are starting.';
  }
  const isNight = ({ h }) => h >= 19 || h < 6;

  // ---------- theme: follows night in Delhi until you choose ----------
  const root = document.documentElement;
  const saved = store.get('theme');
  root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function toggleTheme() {
    const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('theme', t); root.dataset.theme = t; drawSky();
    toast(t === 'dark' ? 'Night mode. Delhi approves.' : 'Day mode.');
  }

  // ---------- sky (hero card): sun or moon where it really is over Delhi ----------
  function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function drawSky() {
    const el = $('#sky'); if (!el) return;
    const now = delhiNow();
    const night = isNight(now);
    const t = now.h + now.m / 60;
    const span = night ? ((t >= 19 ? t - 19 : t + 5) / 11) : ((t - 6) / 13);
    const x = 20 + span * 300, y = 120 - Math.sin(span * Math.PI) * 92;
    const rnd = mulberry(7);
    let stars = '';
    if (night) for (let i = 0; i < 38; i++) stars += `<circle cx="${(rnd() * 340).toFixed(1)}" cy="${(rnd() * 90).toFixed(1)}" r="${(rnd() * 1.1 + .3).toFixed(2)}" fill="#f4ecd8" opacity="${(rnd() * .6 + .2).toFixed(2)}"/>`;
    const city = []; const wins = []; const r2 = mulberry(3); let cx = 0;
    while (cx < 340) {
      const w = 18 + r2() * 30, hgt = 18 + r2() * 38;
      city.push(`<rect x="${cx.toFixed(1)}" y="${(150 - hgt).toFixed(1)}" width="${w.toFixed(1)}" height="${hgt.toFixed(1)}"/>`);
      for (let wy = 150 - hgt + 6; wy < 144; wy += 9) for (let wx = cx + 4; wx < cx + w - 5; wx += 8) if (r2() < (night ? .22 : .05)) wins.push(`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="3.5" height="4.5" rx=".6"/>`);
      cx += w + r2() * 3;
    }
    const orb = night
      ? `<g class="orb" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="26" fill="#f4ecd8" opacity=".08"/><circle r="12" fill="#f4ecd8"/><circle cx="5" cy="-4" r="11" fill="var(--sky-top)"/></g>`
      : `<g class="orb" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="30" fill="#ffd27a" opacity=".25"/><circle r="13" fill="#ffc35a"/></g>`;
    el.innerHTML = `<svg viewBox="0 0 340 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${stars}${orb}<g fill="var(--city)">${city.join('')}</g><g fill="#ffb547" opacity="${night ? .85 : .35}">${wins.join('')}</g></svg>`;
  }

  function tickClock() {
    const now = delhiNow();
    $$('[data-clock]').forEach((e) => (e.textContent = now.text));
    $$('[data-status]').forEach((e) => (e.textContent = statusFor(now)));
  }

  // ---------- depth dial ----------
  function setDepth(d, announce) {
    document.body.dataset.depth = d;
    store.set('depth', d);
    $$('.dial button[data-depth]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.depth === d)));
    if (announce) toast(d === '5' ? 'The 5-second version.' : d === '30' ? 'The 30-second version.' : 'Everything. Take your time.');
  }

  // ---------- project ledger ----------
  const chev = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>';
  const kindLabel = { bot: 'Discord bot', app: 'App', web: 'Web', extension: 'Extension', ai: 'AI' };
  const glow = { bot: '#8b9cff', app: '#f0a646', web: '#5fc2a8', extension: '#e07a9a', ai: '#b48cff' };
  const metaOf = (p) => p.stack.slice(0, 3).map((s) => s.toLowerCase()).join(' · ');
  const linksOf = (p) => p.links.map(([l, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)}</a>`).join('') || `<span>${esc(p.note || 'Private')}</span>`;
  function rowHTML(p) {
    const main = p.links[0]?.[1];
    const title = main ? `<a class="title" href="${esc(main)}" target="_blank" rel="noopener">${esc(p.name)}</a>` : `<span class="title">${esc(p.name)}</span>`;
    return `<li class="prow" data-kind="${p.kind}">
      <span class="thumb" style="--glow:${glow[p.kind]}" aria-hidden="true"><span>${esc(p.name)}</span></span>
      <span><span class="meta">${esc(metaOf(p))}</span>${title}<span class="desc" title="${esc(p.fix)}">${esc(p.fix)}</span></span>
      <span class="aside">${linksOf(p)}</span>
    </li>`;
  }
  function featHTML(p) {
    const r = mulberry(p.name.length * 31); let dots = '';
    for (let i = 0; i < 26; i++) dots += `<circle cx="${(r() * 320).toFixed(1)}" cy="${(r() * 180).toFixed(1)}" r="${(r() * 1.4 + .4).toFixed(2)}" fill="#dcdfe5" opacity="${(r() * .5 + .15).toFixed(2)}"/>`;
    const g = glow[p.kind];
    return `<article class="feat">
      <div class="art"><svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="g-${p.id}" cx=".72" cy=".3" r=".6"><stop offset="0" stop-color="${g}" stop-opacity=".55"/><stop offset="1" stop-color="${g}" stop-opacity="0"/></radialGradient></defs><rect width="320" height="180" fill="url(#g-${p.id})"/>${dots}<text x="18" y="160" fill="#dcdfe5" font-family="Satoshi, sans-serif" font-size="20" font-weight="500">${esc(p.name)}</text></svg></div>
      <div class="meta">${esc(metaOf(p))}</div>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.fix)}</p>
    </article>`;
  }
  function cardHTML(p, open) {
    const nums = p.numbers?.length ? `<div class="nums">${p.numbers.map(([n, l]) => `<div>${esc(n)}<span>${esc(l)}</span></div>`).join('')}</div>` : '';
    const links = p.links.map(([l, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join('') + (p.note ? `<span class="note">${esc(p.note)}</span>` : '');
    return `<article class="lcard card${open ? ' open' : ''}" data-kind="${p.kind}">
      <div class="top"><span class="tag">${kindLabel[p.kind]}</span></div>
      <p class="problem">${esc(p.problem)}</p>
      <button class="reveal" type="button" aria-expanded="${open}">${chev}<span>${open ? 'The fix' : 'Show the fix'}</span></button>
      <div class="fix"><div>
        <div class="name">${esc(p.name)}</div>
        <p>${esc(p.fix)}</p>${nums}
        <ul class="chips">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <div class="plinks">${links}</div>
      </div></div>
    </article>`;
  }
  function renderLedger(el) {
    const { limit, skip, open } = el.dataset;
    let list = window.SITE.projects.filter((p) => !(skip && p.id === skip));
    if (limit) list = list.slice(0, +limit);
    el.innerHTML = list.map((p) => (el.tagName === 'UL' ? rowHTML(p) : cardHTML(p, open === 'all'))).join('');
  }
  function renderStart(el) {
    const ids = el.dataset.start.split(',');
    el.innerHTML = ids.map((id) => window.SITE.projects.find((p) => p.id === id)).filter(Boolean).map(featHTML).join('');
  }
  function setCard(card, on) {
    card.classList.toggle('open', on);
    const b = card.querySelector('.reveal');
    b.setAttribute('aria-expanded', String(on)); b.lastElementChild.textContent = on ? 'The fix' : 'Show the fix';
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.reveal'); if (!b) return;
    const card = b.closest('.lcard'); setCard(card, !card.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open-all]'); if (!b) return;
    const cards = $$('.lcard', $(b.dataset.openAll));
    const anyClosed = cards.some((c) => !c.classList.contains('open'));
    cards.forEach((c) => setCard(c, anyClosed));
    b.textContent = anyClosed ? 'Hide all fixes' : 'Show all fixes';
  });

  // ---------- toast + copy ----------
  let tt;
  function toast(msg) {
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
    t.textContent = msg; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.toggle('on', false), 1800);
  }
  document.addEventListener('click', async (e) => {
    const c = e.target.closest('[data-copy]'); if (!c) return;
    e.preventDefault();
    try { await navigator.clipboard.writeText(c.dataset.copy); toast(`Copied ${c.dataset.copy}. Find me on Discord.`); }
    catch { toast(`Discord: ${c.dataset.copy}`); }
  });

  // ---------- keyboard ----------
  const depthKeys = { 1: '5', 2: '30', 3: '180' };
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
    if (typing) { if (e.key === 'Escape') document.activeElement.blur(); return; }
    if (e.key === '/') { const i = $('#ask-q'); if (i) { e.preventDefault(); if (document.body.dataset.depth !== '180' && i.closest('[data-min="180"]')) setDepth('180'); i.focus(); i.scrollIntoView({ block: 'center', behavior: 'smooth' }); } }
    else if (e.key === 't') toggleTheme();
    else if ($('.dial button[data-depth]') && depthKeys[e.key]) setDepth(depthKeys[e.key], true);
  });

  // ---------- boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    $$('[data-ledger]').forEach(renderLedger);
    $$('[data-start]').forEach(renderStart);
    $$('[data-count="projects"]').forEach((e) => (e.textContent = window.SITE.projects.length));
    $$('[data-count="moments"]').forEach((e) => (e.textContent = window.SITE.timeline.length));
    const d = store.get('depth');
    setDepth(['5', '30', '180'].includes(d) ? d : '30');
    $$('.dial button[data-depth]').forEach((b) => b.addEventListener('click', () => setDepth(b.dataset.depth, true)));
    $$('[data-theme-toggle]').forEach((b) => b.addEventListener('click', toggleTheme));
    drawSky(); tickClock();
    setInterval(tickClock, 20000); setInterval(drawSky, 300000);
    const nav = $('.nav'); const onScroll = () => nav && nav.classList.toggle('scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  });

  window.PV = { $, $$, esc, toast, setDepth };
})();
