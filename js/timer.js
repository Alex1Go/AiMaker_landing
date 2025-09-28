export function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

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

    daysEl.textContent = days;
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
