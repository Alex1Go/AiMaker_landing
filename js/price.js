const STORAGE_KEY = 'lastDeadlineTs_v1';

export function initPriceCycle({ priceSelector = '.price__main-price', step = 1000 } = {}) {
  const priceElements = Array.from(document.querySelectorAll(priceSelector));
  const basePrices = priceElements.map(el => {
    const n = parseInt(String(el.textContent).replace(/\D/g, ''), 10);
    return Number.isFinite(n) ? n : 0;
  });

  function getMultiplier() {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return 0;
    const lastTs = Number(last);
    const now = Date.now();
    const daysElapsed = Math.floor((now - lastTs) / (24 * 60 * 60 * 1000));

    if (daysElapsed <= 3) return daysElapsed + 1;
    localStorage.removeItem(STORAGE_KEY);
    return 0;
  }

  function updatePrices() {
    const mult = getMultiplier();
    priceElements.forEach((el, i) => {
      const newPrice = basePrices[i] + mult * step;
      el.innerHTML = `${newPrice}<span> грн</span>`;
    });
  }

  function startCycle() {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    updatePrices();
  }

  function dailyCheck() {
    const now = new Date();
    const mult = getMultiplier();
    updatePrices();

    const last = localStorage.getItem(STORAGE_KEY);
    if (!last && now.getDay() === 5) {
      startCycle();
    }
  }

  updatePrices();
  setInterval(dailyCheck, 60 * 1000);

  return { updatePrices, startCycle };
}
