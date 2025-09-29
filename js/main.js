import { initModule } from './module.js';
import { initCountdown } from './timer.js';
import { initDeadline } from './deadline.js';

document.addEventListener('DOMContentLoaded', () => {
  initModule();
  initCountdown();
  initDeadline();
});
