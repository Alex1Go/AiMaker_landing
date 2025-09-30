export function initModuleToggle() {
  const infos = document.querySelectorAll('.info');

  infos.forEach(info => {
    const box = info.querySelector('.info__box');
    const btnItem = info.querySelector('.info__btn-item');

    box.addEventListener('click', () => {
      infos.forEach(el => {
        if (el !== info) {
          el.classList.remove('open');
          const elBtn = el.querySelector('.info__btn-item');
          if (elBtn) elBtn.textContent = 'Більше';
        }
      });

      info.classList.toggle('open');

      if (info.classList.contains('open')) {
        btnItem.textContent = 'Менше';

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

export function initLessonHover() {
  document.querySelectorAll('.info__content-list li').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const parent = item.closest('.info');
      setActiveLesson(item, parent);
    });
  });
}

function setActiveLesson(item, parent) {
  const id = item.getAttribute('data-id');

  parent.querySelectorAll('.info__content-list li').forEach(li => li.classList.remove('active'));

  item.classList.add('active');

  parent
    .querySelectorAll('.info__detail-list')
    .forEach(detail => detail.classList.remove('active'));

  const activeDetail = parent.querySelector(`.info__detail-list[data-id="${id}"]`);
  if (activeDetail) {
    activeDetail.classList.add('active');
  }
}

export function initModule() {
  initModuleToggle();
  initLessonHover();
}
