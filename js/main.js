document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. SMOOTH SCROLL =====
  const scrollLinks = document.querySelectorAll(".smooth-scroll");
  for (let link of scrollLinks) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  // ===== 2. ACCORDION =====
  const accordionItems = document.querySelectorAll(".accordion__item");
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion__header");
    header.addEventListener("click", () => {
      // Close other items
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // ===== 3. COUNTDOWN TIMER =====
  function startTimer() {
    const timerDisplay = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
    };

    // Calculate next Friday 23:59:59
    const now = new Date();
    const nextFriday = new Date();
    nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
    nextFriday.setHours(23, 59, 59, 0);

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextFriday - now;

      if (distance < 0) {
        clearInterval(countdown);
        // Handle timer end if needed
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerDisplay.days.textContent = String(days).padStart(2, "0");
      timerDisplay.hours.textContent = String(hours).padStart(2, "0");
      timerDisplay.minutes.textContent = String(minutes).padStart(2, "0");
      timerDisplay.seconds.textContent = String(seconds).padStart(2, "0");
    }, 1000);
  }

  // ===== 4. DYNAMIC PRICING =====
  function updatePrices() {
    const priceElements = document.querySelectorAll(".price");

    // Define price increase dates (Year, Month-1, Day)
    const priceTiers = [
      { date: new Date(2025, 8, 26), increase: 0 }, // Base price until Sept 26
      { date: new Date(2025, 9, 3), increase: 1000 }, // +1000 after Oct 3
      { date: new Date(2025, 9, 10), increase: 2000 }, // +2000 after Oct 10
      { date: new Date(2025, 9, 17), increase: 3000 }, // +3000 after Oct 17
      { date: new Date(2025, 9, 24), increase: 4000 }, // +4000 after Oct 24
    ];

    const now = new Date();
    let currentIncrease = 0;

    for (const tier of priceTiers) {
      if (now > tier.date) {
        currentIncrease = tier.increase;
      }
    }

    priceElements.forEach((el) => {
      const basePrice = parseInt(el.dataset.basePrice);
      const newPrice = basePrice + currentIncrease;
      el.textContent = `${newPrice.toLocaleString("ru-RU")} грн`;
    });
  }

  // ===== 5. INSTALLMENT DEADLINE (+2 days) =====
  function setInstallmentDeadline() {
    const deadlineEl = document.getElementById("deadline-date");
    const today = new Date();
    today.setDate(today.getDate() + 2);

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = today.getFullYear();

    deadlineEl.textContent = `${day}.${month}.${year}`;
  }

  // ===== INITIALIZE ALL FUNCTIONS =====
  startTimer();
  updatePrices();
  setInstallmentDeadline();
});
