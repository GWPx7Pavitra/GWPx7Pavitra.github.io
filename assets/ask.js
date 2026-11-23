// "Ask my work": a tiny retrieval-augmented answerer that runs in the browser.
// 1. tokenize the question  2. score every chunk with BM25  3. answer from the best chunk.
(() => {
  const STOP = new Set('a an and are as at be but by can do does for from has have he his how i i\'m in is it its me my of on or so tell than that the their them there this to was what when where which who why will with you your about any much many some'.split(' '));
  // A few words people use for the same thing. Expands the question, never the documents.
  const SYN = {
    people: ['users'], user: ['users'], members: ['users'], big: ['users', 'servers'], popular: ['users', 'servers'],
    reach: ['contact', 'discord', 'email'], talk: ['contact', 'discord'], hire: ['contact', 'email'], mail: ['email'], dm: ['discord'],
    pollution: ['air', 'pm2'], aqi: ['air', 'index'], water: ['groundwater'], delhi: ['delhi', 'air'],
    mac: ['macos'], disk: ['disk', 'storage', 'space'], ssd: ['disk', 'storage'], storage: ['storage', 'disk'],
    learning: ['learn'], studying: ['learn', 'study'], ai: ['rag', 'llm', 'fine'], llm: ['llm', 'rag'], finetuning: ['fine', 'tuning'],
    future: ['sat', 'ielts', 'university'], college: ['university'], abroad: ['university', 'abroad'], plan: ['sat', 'ielts'], next: ['sat', 'ielts'],
    language: ['typescript', 'python', 'swift'], languages: ['typescript', 'python', 'swift'], tech: ['stack'], stack: ['typescript', 'react'],
    bot: ['discord', 'bot'], discord: ['discord'], music: ['music', 'lavalink'], exam: ['boards', 'cbse'], exams: ['boards', 'cbse'],
    screen: ['screen', 'time'], youtube: ['screen', 'time', 'tab'], extension: ['extension', 'browser'],
    night: ['night', 'pm'], sleep: ['asleep', 'night'], age: ['class', 'student'], old: ['class', 'student'], school: ['class', 'student'],
    safe: ['safety', 'guard', 'refuse'], safety: ['guard', 'refuse'], secure: ['safety', 'guard'], delete: ['removal', 'refuse'],
    code: ['work', 'pm', 'night'], coding: ['work', 'pm', 'night'], when: ['pm', 'night'], hours: ['pm', 'night'],
    live: ['delhi', 'india'], from: ['delhi', 'india'], where: ['delhi', 'india'], who: ['pavitra', 'student'],
    contact: ['contact', 'discord', 'email'], instagram: ['instagram'], email: ['email'],
    search: ['search', 'rag', 'bm25'], work: ['work'],
    hackathon: ['orchestrate', 'hackerrank'], hackathons: ['orchestrate', 'hackerrank'], competition: ['orchestrate', 'hackerrank'],
    coconutmc: ['coconutmcbot'], coconut: ['coconutmc', 'coconutmcbot'], minecraft: ['minecraft', 'worldregen'],
    air: ['pollution', 'cigarettes', 'index'], bad: ['pollution', 'cigarettes'], breathe: ['air', 'pollution'], smog: ['air', 'pollution']
  };
  // A question that only names a project ("what is nightshift?") should get its intro chunk.
  const LEAD_BONUS = 0.8;
  const stem = (w) => w.length > 4 ? w.replace(/(ies)$/, 'y').replace(/(ing|ed|es|s)$/, '') : w;
  function tokenize(text, keepDropped) {
    const raw = text.toLowerCase().replace(/[’']/g, "'").replace(/'(s|re|ve|ll|d|m|t)\b/g, '').replace(/([a-z])\.([a-z])/g, '$1 $2').match(/[a-z0-9.+#-]+/g) || [];
    const out = [], dropped = [];
    for (let w of raw) {
      w = w.replace(/^[.-]+|[.-]+$/g, '');
      if (w.length < 2) continue;
      if (STOP.has(w)) { dropped.push(w); continue; }
      out.push(stem(w.replace(/\./g, '')));
    }
    return keepDropped ? { out, dropped } : out;
  }

  let index;
  function build() {
    const docs = window.SITE.corpus.map((c, i) => {
      const toks = tokenize(c.src + ' ' + c.text);
      const tf = new Map(); toks.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
      return { i, ...c, len: toks.length, tf };
    });
    const df = new Map();
    docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1)));
    const avg = docs.reduce((s, d) => s + d.len, 0) / docs.length;
    index = { docs, df, avg, N: docs.length };
  }
  function bm25(qToks) {
    const { docs, df, avg, N } = index; const k1 = 1.2, b = 0.75;
    return docs.map((d) => {
      let s = 0;
      for (const t of new Set(qToks)) {
        const f = d.tf.get(t); if (!f) continue;
        const idf = Math.log(1 + (N - df.get(t) + .5) / (df.get(t) + .5));
        s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / avg));
      }
      if (s > 0 && d.lead) s += LEAD_BONUS;
      return { d, s };
    }).sort((a, z) => z.s - a.s);
  }
  function expand(toks) {
    const extra = [];
    toks.forEach((t) => (SYN[t] || []).forEach((x) => extra.push(stem(x))));
    return { all: [...toks, ...extra], extra };
  }
  function highlight(text, qset) {
    const esc = window.PV.esc;
    return text.split(/(\s+)/).map((w) => {
      const core = w.toLowerCase().replace(/[^a-z0-9.+#]/g, '').replace(/\.$/, '').replace(/\./g, '');
      return core && qset.has(stem(core)) ? `<mark>${esc(w)}</mark>` : esc(w);
    }).join('');
  }

  function run(root, q) {
    const esc = window.PV.esc;
    if (!index) build();
    const { out, dropped } = tokenize(q, true);
    const { all, extra } = expand(out);
    const ranked = bm25(all);
    const top = ranked[0];
    const qset = new Set(all);
    const ans = root.querySelector('.answer');
    const full = root.dataset.full === '1';
    let html;
    if (!top || top.s < 1.6) {
      html = `<p class="said">That's not in my notes yet. Ask me directly: I'm <b>x465</b> on Discord.</p><p class="src">No chunk scored high enough to answer from, so I'm not guessing.</p>`;
    } else {
      const second = ranked[1] && ranked[1].s > top.s * 0.72 && ranked[1].d.src === top.d.src ? ranked[1] : null;
      html = `<p class="said">${highlight(top.d.text, qset)}${second ? ' ' + highlight(second.d.text, qset) : ''}</p>
        <p class="src">Answered from <b>${esc(top.d.src)}</b>${second ? ' (2 chunks)' : ''} · score ${top.s.toFixed(2)}</p>`;
    }
    const max = Math.max(top?.s || 1, 1);
    const shown = ranked.slice(0, full ? 5 : 3);
    const ranks = shown.map((r, k) => `<div class="rank${k === 0 && r.s >= 1.6 ? ' top' : ''}">
        <span class="who">${esc(r.d.src)}</span><span class="track"><i data-w="${Math.max(2, r.s / max * 100).toFixed(1)}"></i></span><span class="sc">${r.s.toFixed(2)}</span>
        ${full ? `<span class="txt">${esc(r.d.text.length > 110 ? r.d.text.slice(0, 108) + '…' : r.d.text)}</span>` : ''}
      </div>`).join('');
    const toks = out.map((t) => `<span>${esc(t)}</span>`).join('') + extra.map((t) => `<span title="added synonym">+${esc(t)}</span>`).join('') + (full ? dropped.map((t) => `<span class="drop">${esc(t)}</span>`).join('') : '');
    const pipe = full
      ? `<div class="pipe">
          <div class="step"><span class="n">1</span><div><h4>Tokenize</h4><p>Lower-case, drop filler words, trim endings, add a few synonyms.</p><div class="toks" style="margin-top:8px">${toks || '<span class="drop">nothing left</span>'}</div></div></div>
          <div class="step"><span class="n">2</span><div><h4>Retrieve with BM25</h4><p>Score all ${index.N} chunks: rare words that appear in a short chunk count most.</p><div class="ranks" style="margin-top:10px">${ranks}</div></div></div>
          <div class="step"><span class="n">3</span><div><h4>Answer</h4><p>Quote the best chunk instead of generating text, so it can't make anything up. Matching words are highlighted.</p></div></div>
        </div>`
      : `<div class="ranks" style="margin-top:14px">${ranks}</div>`;
    ans.innerHTML = html + pipe;
    ans.classList.add('on');
    requestAnimationFrame(() => requestAnimationFrame(() => ans.querySelectorAll('.track i').forEach((i) => (i.style.width = i.dataset.w + '%'))));
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-ask]').forEach((root) => {
      const form = root.querySelector('form'); const input = root.querySelector('input');
      form.addEventListener('submit', (e) => { e.preventDefault(); if (input.value.trim()) run(root, input.value.trim()); });
      root.querySelectorAll('.suggest button').forEach((b) => b.addEventListener('click', () => { input.value = b.textContent; run(root, b.textContent); }));
    });
  });
})();
