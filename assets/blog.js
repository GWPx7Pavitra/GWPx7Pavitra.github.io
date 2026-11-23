// Writing: posts are Markdown files in /posts, listed in /posts/posts.json.
// Each file starts with front matter between --- lines (title, date, summary, featured, draft, cover).
(() => {
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function frontMatter(text) {
    const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!m) return { meta: {}, body: text };
    const meta = {};
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
      if (!kv) continue;
      let v = kv[2].trim();
      if (/^["'].*["']$/.test(v)) v = v.slice(1, -1);
      else if (v === 'true' || v === 'false') v = v === 'true';
      else if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      meta[kv[1]] = v;
    }
    return { meta, body: text.slice(m[0].length) };
  }
  const parseDate = (s) => { const d = new Date(String(s) + 'T00:00:00'); return isNaN(d) ? null : d; };
  const shortDate = (d) => (d ? `${MONTHS[d.getMonth()]} ${d.getDate()}` : '');
  const longDate = (d) => (d ? `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : '');
  const minutes = (body) => Math.max(1, Math.round(body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length / 220));

  async function fetchText(url) {
    const r = await fetch(url, { cache: 'no-cache' });
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.text();
  }
  let cache;
  async function loadAll() {
    if (cache) return cache;
    const slugs = JSON.parse(await fetchText('posts/posts.json'));
    const posts = await Promise.all(slugs.map(async (slug) => {
      try {
        const { meta, body } = frontMatter(await fetchText(`posts/${slug}.md`));
        return { slug, ...meta, dateObj: parseDate(meta.date), mins: minutes(body) };
      } catch { return null; }
    }));
    cache = posts.filter((p) => p && !p.draft).sort((a, b) => (b.dateObj || 0) - (a.dateObj || 0));
    return cache;
  }

  // ---------- list page ----------
  function art(p) {
    if (p.cover) return `<img src="${esc(p.cover)}" alt="" loading="lazy">`;
    let a = p.slug.length * 97 + 7; const r = () => { a = (a * 16807) % 2147483647; return a / 2147483647; };
    let dots = '';
    for (let i = 0; i < 24; i++) dots += `<circle cx="${(r() * 320).toFixed(1)}" cy="${(r() * 180).toFixed(1)}" r="${(r() * 1.3 + .4).toFixed(2)}" fill="#dcdfe5" opacity="${(r() * .5 + .15).toFixed(2)}"/>`;
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="w-${esc(p.slug)}" cx=".7" cy=".3" r=".65"><stop offset="0" stop-color="#f0a646" stop-opacity=".45"/><stop offset="1" stop-color="#f0a646" stop-opacity="0"/></radialGradient></defs><rect width="320" height="180" fill="url(#w-${esc(p.slug)})"/>${dots}</svg>`;
  }
  function renderList(root, posts) {
    if (!posts.length) {
      root.innerHTML = '<p class="empty">Nothing published yet. The first post is on its way.</p>';
      return;
    }
    const featured = posts.filter((p) => p.featured).slice(0, 2);
    let html = '';
    if (featured.length) {
      html += '<div class="label">Start here</div><div class="start">' + featured.map((p) => `
        <a class="feat" href="post.html?p=${encodeURIComponent(p.slug)}">
          <div class="art">${art(p)}</div>
          <div class="meta">${esc(shortDate(p.dateObj))} · ${p.mins} min read</div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
        </a>`).join('') + '</div>';
    }
    let year = null;
    html += '<ul class="wlist">';
    for (const p of posts) {
      const y = p.dateObj ? p.dateObj.getFullYear() : '';
      if (y !== year) { html += `<li class="wyear">${y}</li>`; year = y; }
      html += `<li class="wrow"><span class="wdate">${esc(shortDate(p.dateObj))}</span>
        <span><a class="wtitle" href="post.html?p=${encodeURIComponent(p.slug)}">${esc(p.title)}</a><span class="wsum">${esc(p.summary)}</span></span>
        <span class="wmin">${p.mins} min</span></li>`;
    }
    root.innerHTML = html + '</ul>';
  }

  // ---------- post page ----------
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const notFound = () => '<div class="post-head"><h1>Post not found</h1><p class="post-sum">It may have moved. <a class="u" href="writing.html">See all writing</a>.</p></div>';
  async function renderPost(root) {
    const slug = new URLSearchParams(location.search).get('p') || '';
    if (!/^[a-z0-9-]+$/.test(slug)) { root.innerHTML = notFound(); return; }
    let text;
    try { text = await fetchText(`posts/${slug}.md`); } catch { root.innerHTML = notFound(); return; }
    const { meta, body } = frontMatter(text);
    const d = parseDate(meta.date);
    document.title = `${meta.title || slug} — Pavitra`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && meta.summary) desc.setAttribute('content', meta.summary);
    const raw = window.marked ? window.marked.parse(body, { gfm: true }) : `<pre>${esc(body)}</pre>`;
    const safe = window.DOMPurify ? window.DOMPurify.sanitize(raw) : esc(body);
    root.innerHTML = `
      <header class="post-head">
        <div class="meta">${meta.draft ? '<span class="draft">Draft</span> · ' : ''}${esc(longDate(d))} · ${minutes(body)} min read</div>
        <h1>${esc(meta.title || slug)}</h1>
        ${meta.summary ? `<p class="post-sum">${esc(meta.summary)}</p>` : ''}
        <div class="byline"><a href="index.html">Pavitra</a> · <a href="posts/${esc(slug)}.md" target="_blank" rel="noopener">Markdown</a></div>
      </header>
      <div class="prose">${safe}</div>
      <div class="post-foot"><a class="u" href="writing.html">← All writing</a></div>`;
    const heads = [...root.querySelectorAll('.prose h2, .prose h3')];
    heads.forEach((h) => { h.id = h.id || slugify(h.textContent); });
    root.querySelectorAll('.prose a[href^="http"]').forEach((a) => { a.target = '_blank'; a.rel = 'noopener'; });
    if (heads.length > 1) {
      const btn = document.createElement('button');
      btn.className = 'toc-btn'; btn.type = 'button'; btn.textContent = 'Contents'; btn.setAttribute('aria-expanded', 'false');
      const panel = document.createElement('nav');
      panel.className = 'toc'; panel.setAttribute('aria-label', 'Contents');
      panel.innerHTML = heads.map((h) => `<a href="#${esc(h.id)}" class="${h.tagName === 'H3' ? 'sub' : ''}">${esc(h.textContent)}</a>`).join('');
      btn.addEventListener('click', () => { const on = panel.classList.toggle('on'); btn.setAttribute('aria-expanded', String(on)); });
      panel.addEventListener('click', (e) => { if (e.target.closest('a')) { panel.classList.toggle('on', false); btn.setAttribute('aria-expanded', 'false'); } });
      document.body.append(panel, btn);
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const list = document.querySelector('[data-writing]');
    if (list) {
      try {
        const posts = await loadAll();
        renderList(list, posts);
        document.querySelectorAll('[data-count="posts"]').forEach((e) => { e.textContent = posts.length ? `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}` : 'No posts yet'; });
      } catch { list.innerHTML = '<p class="empty">Could not load posts right now.</p>'; }
    }
    const post = document.querySelector('[data-post]');
    if (post) renderPost(post);
  });
})();
