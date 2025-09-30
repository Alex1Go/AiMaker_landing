export function initCountdown() {
  const daysEl = [document.getElementById('days'), document.getElementById('days-1')];
  const hoursEl = [document.getElementById('hours'), document.getElementById('hours-1')];
  const minutesEl = [document.getElementById('minutes'), document.getElementById('minutes-1')];
  const secondsEl = [document.getElementById('seconds'), document.getElementById('seconds-1')];

  function getNextFridayDeadline() {
    const now = new Date();
    const deadline = new Date(now);

    deadline.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7 || 7));
    deadline.setHours(23, 59, 59, 999);

    return deadline;
  }

  function updateTimer() {
    const now = new Date();
    let deadline = getNextFridayDeadline();
    let diff = deadline - now;

    if (diff <= 0) {
      deadline = getNextFridayDeadline();
      diff = deadline - now;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.forEach(el => (el.textContent = days));
    hoursEl.forEach(el => (el.textContent = hours.toString().padStart(2, '0')));
    minutesEl.forEach(el => (el.textContent = minutes.toString().padStart(2, '0')));
    secondsEl.forEach(el => (el.textContent = seconds.toString().padStart(2, '0')));
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
