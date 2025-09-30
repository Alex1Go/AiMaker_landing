export function initSmoothScroll() {
  const duration = 1200; // время анимации (мс) — можно менять для плавности

  function smoothScrollTo(target) {
    const header = document.querySelector('header'); // если шапка фиксированная
    const headerHeight = header ? header.offsetHeight : 0;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY - headerHeight;
    const diff = targetY - startY;
    let start;

    function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);

      // плавная функция easeInOutCubic
      const easing =
        percent < 0.5 ? 4 * percent * percent * percent : 1 - Math.pow(-2 * percent + 2, 3) / 2;

      window.scrollTo(0, startY + diff * easing);

      if (time < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // ловим все элементы: ссылки <a> с href и кнопки с data-scroll
  document.querySelectorAll('a[href^="#"], [data-scroll]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();

      const targetId = el.hasAttribute('href')
        ? el.getAttribute('href')
        : el.getAttribute('data-scroll');

      const target = document.querySelector(targetId);
      if (target) smoothScrollTo(target);
    });
  });
}
