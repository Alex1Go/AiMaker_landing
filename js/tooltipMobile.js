export function initMobileTooltip() {
  if (window.innerWidth >= 768) return; // Только для мобильных

  const titleBoxes = document.querySelectorAll('.table__tittle-box');

  titleBoxes.forEach(box => {
    const infoIcon = box.querySelector('.table__tittle-svg');
    const tooltip = box.querySelector('.table__tooltip');

    if (!infoIcon || !tooltip) return;

    infoIcon.addEventListener('click', e => {
      e.stopPropagation();

      // Закрываем другие тултипы, если открыты
      document.querySelectorAll('.table__tooltip.active').forEach(activeTooltip => {
        if (activeTooltip !== tooltip) {
          activeTooltip.classList.remove('active');
          activeTooltip.style.opacity = '0';
          activeTooltip.style.visibility = 'hidden';
        }
      });

      // Переключаем текущий тултип
      const isActive = tooltip.classList.toggle('active');
      tooltip.style.opacity = isActive ? '1' : '0';
      tooltip.style.visibility = isActive ? 'visible' : 'hidden';
    });
  });

  // Клик вне тултипа — закрывает всё
  document.addEventListener('click', e => {
    if (!e.target.closest('.table__tittle-box')) {
      document.querySelectorAll('.table__tooltip.active').forEach(tooltip => {
        tooltip.classList.remove('active');
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      });
    }
  });
}
