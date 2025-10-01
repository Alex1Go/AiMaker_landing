// mobileNav.js
export function initMobileNav() {
  console.log('initMobileNav called'); // Отладка

  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const body = document.body;

  console.log('burger:', burger); // Отладка
  console.log('mobileNav:', mobileNav); // Отладка

  // Проверяем наличие элементов
  if (!burger || !mobileNav) {
    console.error('Burger or mobileNav element not found');
    console.error('burger exists:', !!burger);
    console.error('mobileNav exists:', !!mobileNav);
    return;
  }

  console.log('Elements found, initializing menu'); // Отладка

  // Создаем содержимое мобильного меню
  const navContent = `
    <button class="mobile-nav__close" aria-label="Закрыть меню"></button>
    <ul class="mobile-nav__list">
      <li><a href="#speakers" class="mobile-nav__link">Спікери</a></li>
      <li><a href="#program" class="mobile-nav__link">Програма</a></li>
      <li><a href="#reviews" class="mobile-nav__link">Відгуки</a></li>
      <li><a href="#signup" class="mobile-nav__link">Записатись</a></li>
    </ul>
    <button data-scroll="#format" class="mobile-nav__btn">Записатися на курс</button>
  `;

  mobileNav.innerHTML = navContent;

  const closeBtn = mobileNav.querySelector('.mobile-nav__close');
  const navLinks = mobileNav.querySelectorAll('.mobile-nav__link');
  const navBtn = mobileNav.querySelector('.mobile-nav__btn');

  // Функция открытия меню
  function openMenu() {
    mobileNav.classList.add('active');
    burger.classList.add('active');
    body.style.overflow = 'hidden';
  }

  // Функция закрытия меню
  function closeMenu() {
    mobileNav.classList.remove('active');
    burger.classList.remove('active');
    body.style.overflow = '';
  }

  // Обработчик клика на бургер
  burger.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    if (mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Обработчик клика на кнопку закрытия
  if (closeBtn) {
    closeBtn.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Закрытие меню при клике на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');

      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        closeMenu();

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 400);
        }
      }
    });
  });

  // Закрытие меню при клике на кнопку
  if (navBtn) {
    navBtn.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();

      const targetId = navBtn.getAttribute('data-scroll');
      if (targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 400);
        }
      }
    });
  }

  // Закрытие меню при клике на оверлей (фон меню)
  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) {
      closeMenu();
    }
  });

  // Закрытие меню при изменении размера окна
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    }, 250);
  });

  // Закрытие меню при нажатии ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });
}
