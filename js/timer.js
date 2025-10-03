export function initCountdown(onDeadlineReached) {
  const daysEl = [document.getElementById('days'), document.getElementById('days-1')].filter(
    Boolean
  );
  const hoursEl = [document.getElementById('hours'), document.getElementById('hours-1')].filter(
    Boolean
  );
  const minutesEl = [
    document.getElementById('minutes'),
    document.getElementById('minutes-1'),
  ].filter(Boolean);
  const secondsEl = [
    document.getElementById('seconds'),
    document.getElementById('seconds-1'),
  ].filter(Boolean);

  function getNextFridayDeadline() {
    const now = new Date();
    const deadline = new Date(now);

    let daysToFriday = (5 - now.getDay() + 7) % 7;
    if (daysToFriday === 0 && now.getHours() >= 0 && now.getMinutes() > 0) {
      daysToFriday = 7;
    }
    deadline.setDate(now.getDate() + daysToFriday);
    deadline.setHours(0, 0, 0, 0);

    return deadline;
  }

  let deadline = getNextFridayDeadline();

  function setText(elArr, value, pad = false) {
    if (!elArr || elArr.length === 0) return;
    const txt = pad ? String(value).padStart(2, '0') : String(value);
    elArr.forEach(el => {
      if (el) el.textContent = txt;
    });
  }

  function updateTimer() {
    const now = new Date();
    let diff = deadline - now;

    if (diff <= 0) {
      try {
        if (typeof onDeadlineReached === 'function') onDeadlineReached();
      } catch (e) {
        console.error('onDeadlineReached error', e);
      }
      deadline = getNextFridayDeadline();
      diff = deadline - now;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setText(daysEl, days, false);
    setText(hoursEl, hours, true);
    setText(minutesEl, minutes, true);
    setText(secondsEl, seconds, true);
  }

  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);

  return {
    stop: () => clearInterval(intervalId),
    _getDeadline: () => deadline,
  };
}
