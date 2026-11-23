// Work page: filter chips, and a small network drawing for the RAVEN card.
document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('[data-f]');
  chips.forEach((b) => b.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    document.querySelectorAll('#all-work .prow').forEach((card) => {
      card.style.display = b.dataset.f === 'all' || card.dataset.kind === b.dataset.f ? '' : 'none';
    });
  }));

  // RAVEN art: one bot in the middle, servers around it, a few links lighting up at a time.
  const g = document.getElementById('net'); if (!g) return;
  let a = 11; const rnd = () => { a = (a * 16807) % 2147483647; return a / 2147483647; };
  const NS = 'http://www.w3.org/2000/svg'; const lines = [];
  for (let i = 0; i < 46; i++) {
    const ang = rnd() * Math.PI * 2, r = 70 + rnd() * 150;
    const x = 200 + Math.cos(ang) * r * 1.25, y = 150 + Math.sin(ang) * r * 0.8;
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', 200); l.setAttribute('y1', 150); l.setAttribute('x2', x.toFixed(1)); l.setAttribute('y2', y.toFixed(1));
    l.setAttribute('stroke', '#ffb547'); l.setAttribute('stroke-width', '.6'); l.setAttribute('opacity', '.12');
    l.style.transition = 'opacity .8s'; g.append(l); lines.push(l);
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('r', (1.4 + rnd() * 2.2).toFixed(1));
    c.setAttribute('fill', '#f4ecd8'); c.setAttribute('opacity', (0.35 + rnd() * 0.5).toFixed(2)); g.append(c);
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(() => {
    const l = lines[Math.floor(Math.random() * lines.length)];
    l.setAttribute('opacity', '.8'); setTimeout(() => l.setAttribute('opacity', '.12'), 700);
  }, 220);
});
