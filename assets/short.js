// Timeline page: Everything / Highlights switch.
document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('[data-short]');
  btns.forEach((b) => b.addEventListener('click', () => {
    const short = b.dataset.short === '1';
    document.body.dataset.short = short ? '1' : '0';
    btns.forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    document.querySelectorAll('.tl .year').forEach((y) => { y.style.display = short ? 'none' : ''; });
  }));
});
