export function initMobileNav() {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');

  if (!burger || !mobileNav) {
    return;
  }
  if (burger.dataset.mobileNavInited === '1') return;
  burger.dataset.mobileNavInited = '1';

  const desktopList = document.querySelector('.nav__list');
  const desktopBtn = document.querySelector('.nav__btn');

  function buildMobileMenu() {
    if (mobileNav.querySelector('.mobile-nav__list')) return;

    if (desktopList) {
      const listClone = desktopList.cloneNode(true);
      listClone.className = 'mobile-nav__list';
      listClone.querySelectorAll('a').forEach(a => {
        a.classList.remove('nav__link');
        a.classList.add('mobile-nav__link');
      });
      mobileNav.appendChild(listClone);
    } else {
      const ul = document.createElement('ul');
      ul.className = 'mobile-nav__list';
      [
        { href: '#speakers', text: 'Спікери' },
        { href: '#program', text: 'Програма' },
        { href: '#reviews', text: 'Відгуки' },
        { href: '#signup', text: 'Записатись' },
      ].forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.text;
        a.className = 'mobile-nav__link';
        li.appendChild(a);
        ul.appendChild(li);
      });
      mobileNav.appendChild(ul);
    }

    if (desktopBtn) {
      const btnClone = desktopBtn.cloneNode(true);
      btnClone.classList.remove('nav__btn');
      btnClone.classList.add('mobile-nav__btn');
      mobileNav.appendChild(btnClone);
    }
  }

  buildMobileMenu();

  const mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
  const mobileBtn = mobileNav.querySelector('.mobile-nav__btn');

  function openMenu() {
    burger.classList.add('active');
    mobileNav.classList.add('active');
    document.body.classList.add('lock');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    burger.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.classList.remove('lock');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', () => {
    if (mobileNav.classList.contains('active')) closeMenu();
    else openMenu();
  });

  mobileLinks.forEach(link =>
    link.addEventListener('click', () => {
      closeMenu();
    })
  );
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      closeMenu();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) closeMenu();
  });
  burger.setAttribute('aria-controls', 'mobileNav');
  burger.setAttribute('aria-expanded', mobileNav.classList.contains('active') ? 'true' : 'false');
}
