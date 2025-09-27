// Открытие/закрытие модулей
export function initModuleToggle() {
  const infos = document.querySelectorAll('.info');

  infos.forEach(info => {
    const box = info.querySelector('.info__box');
    const btnItem = info.querySelector('.info__btn-item');

    box.addEventListener('click', () => {
      // закрыть все остальные
      infos.forEach(el => {
        if (el !== info) {
          el.classList.remove('open');
          const elBtn = el.querySelector('.info__btn-item');
          if (elBtn) elBtn.textContent = 'Більше';
        }
      });

      // переключение текущего
      info.classList.toggle('open');

      // смена текста кнопки
      if (info.classList.contains('open')) {
        btnItem.textContent = 'Менше';

        // активировать первую li
        const firstLi = info.querySelector('.info__content-list li');
        if (firstLi) {
          setActiveLesson(firstLi, info);
        }
      } else {
        btnItem.textContent = 'Більше';
      }
    });
  });
}

// Смена описания по наведению/клику
export function initLessonHover() {
  document.querySelectorAll('.info__content-list li').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const parent = item.closest('.info');
      setActiveLesson(item, parent);
    });
  });
}

// Хелпер: активирует li и соответствующий текст
function setActiveLesson(item, parent) {
  const id = item.getAttribute('data-id');

  // сброс активных li
  parent.querySelectorAll('.info__content-list li').forEach(li => li.classList.remove('active'));

  // выделяем текущую
  item.classList.add('active');

  // скрыть все detail
  parent
    .querySelectorAll('.info__detail-list')
    .forEach(detail => detail.classList.remove('active'));

  // показать выбранный detail
  const activeDetail = parent.querySelector(`.info__detail-list[data-id="${id}"]`);
  if (activeDetail) {
    activeDetail.classList.add('active');
  }
}

// Общая инициализация
export function initModule() {
  initModuleToggle();
  initLessonHover();
}
