import { initModule } from './module.js';
import { initCountdown } from './timer.js';
import { initDeadline } from './deadline.js';
import { initSmoothScroll } from './scrol.js';
import { initPriceCycle } from './price.js';

document.addEventListener('DOMContentLoaded', () => {
  initModule();
  initCountdown();
  initDeadline();
  initSmoothScroll();
  initPriceCycle();
});
