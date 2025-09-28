import { initModule } from './module.js';
import { initCountdown } from './timer.js';

document.addEventListener('DOMContentLoaded', () => {
  initModule();
  initCountdown();
});
