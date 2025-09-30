export function initSmoothScroll() {
  const duration = 2000;

  function smoothScrollTo(target) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY - headerHeight;
    const diff = targetY - startY;
    let start;

    function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);

      const easing =
        percent < 0.5 ? 4 * percent * percent * percent : 1 - Math.pow(-2 * percent + 2, 3) / 2;

      window.scrollTo(0, startY + diff * easing);

      if (time < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

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
