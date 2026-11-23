// Renders window.SITE.timeline into any <ol data-timeline>. data-key-only="1" keeps the highlights.
document.addEventListener('DOMContentLoaded', () => {
  const esc = window.PV.esc;
  document.querySelectorAll('[data-timeline]').forEach((ol) => {
    const keyOnly = ol.dataset.keyOnly === '1';
    const items = window.SITE.timeline.filter((t) => !keyOnly || t.key).slice().reverse();
    let year = null; let html = '';
    for (const t of items) {
      const y = t.next ? 'Next' : String(t.y);
      if (!keyOnly && y !== year) { html += `<li class="year" aria-hidden="true"><span>${y}</span></li>`; year = y; }
      const title = t.link ? `<a href="${esc(t.link)}"${t.link.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(t.title)}</a>` : esc(t.title);
      html += `<li class="${t.key ? 'key' : 'minor'}${t.next ? ' next' : ''}"><div class="when">${esc(t.when)}</div><div><h3>${title}</h3><p>${esc(t.body)}</p></div></li>`;
    }
    ol.innerHTML = html;
  });
});
