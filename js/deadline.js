export function initDeadline() {
  const daysEl = document.querySelector('.dedline__days');
  const monthEl = document.querySelector('.dedline__mounth');

  if (!daysEl || !monthEl) return;

  // Отримуємо сьогоднішню дату + 2 дні
  const today = new Date();
  today.setDate(today.getDate() + 2);

  const day = today.getDate();
  const month = today.toLocaleString('uk-UA', { month: 'long' });

  // Записуємо в HTML
  daysEl.textContent = day;
  monthEl.textContent = month;
}
