import { initModule } from './module.js';
import { initCountdown } from './timer.js';
import { initDeadline } from './deadline.js';
import { initSmoothScroll } from './scrol.js';
import { initPriceCycle } from './price.js';
import { initMobileNav } from './burger.js';

document.addEventListener('DOMContentLoaded', () => {
  initModule();
  const priceModule = initPriceCycle();

  initCountdown(() => {
    priceModule.startCycle();
  });
  initDeadline();
  initSmoothScroll();
  initMobileNav();
});
