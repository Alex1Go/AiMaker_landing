export function initPriceCycle() {
  const priceElements = document.querySelectorAll('.price__main-price');

  const basePrices = Array.from(priceElements).map(el =>
    parseInt(el.textContent.replace(/\D/g, ''))
  );

  function updatePrices() {
    const now = new Date();
    let day = now.getDay();
    let multiplier = 0;

    if (day === 5) multiplier = 1;
    if (day === 6) multiplier = 2;
    if (day === 0) multiplier = 3;
    if (day === 1) multiplier = 4;
    if (day >= 2 && day <= 4) multiplier = 0;

    priceElements.forEach((el, i) => {
      const newPrice = basePrices[i] + multiplier * 1000;
      el.innerHTML = `${newPrice}<span> грн</span>`;
    });
  }

  updatePrices();
  setInterval(updatePrices, 60 * 1000);
}
