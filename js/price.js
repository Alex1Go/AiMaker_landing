export function initPriceCycle() {
  const priceElements = document.querySelectorAll('.price__main-price');

  const basePrices = Array.from(priceElements).map(el =>
    parseInt(el.textContent.replace(/\D/g, ''))
  );

  let raiseCount = 0;
  let nextRaiseTime = null;

  function raisePrices() {
    raiseCount++;

    priceElements.forEach((el, i) => {
      let newPrice = basePrices[i] + raiseCount * 1000;
      el.innerHTML = `${newPrice}<span> грн</span>`;
    });

    if (raiseCount < 4) {
      nextRaiseTime = Date.now() + 2 * 24 * 60 * 60 * 1000;
    } else {
      setTimeout(() => {
        priceElements.forEach((el, i) => {
          el.innerHTML = `${basePrices[i]}<span> грн</span>`;
        });
        raiseCount = 0;
        nextRaiseTime = getNextFridayDeadline().getTime();
      }, 2 * 24 * 60 * 60 * 1000);
    }
  }

  function getNextFridayDeadline() {
    const now = new Date();
    const deadline = new Date(now);
    deadline.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7 || 7));
    deadline.setHours(23, 59, 59, 999);
    return deadline;
  }

  setInterval(() => {
    const now = Date.now();

    if (!nextRaiseTime) {
      nextRaiseTime = getNextFridayDeadline().getTime();
    }

    if (now >= nextRaiseTime) {
      raisePrices();
    }
  }, 60 * 1000);
}
