/* ========================================
   SABOR DA ROÇA — Script Principal
   ======================================== */

(function () {
  'use strict';

  /* ---------- Elementos ---------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = mainNav ? mainNav.querySelectorAll('.header__link') : [];
  const footerAno = document.getElementById('footer-ano');

  /* ---------- Menu Mobile ---------- */
  function abrirMenu() {
    hamburgerBtn.classList.add('header__hamburger--ativo');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('header__nav--aberto');
    document.body.style.overflow = 'hidden';
  }

  function fecharMenu() {
    hamburgerBtn.classList.remove('header__hamburger--ativo');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('header__nav--aberto');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const aberto = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    aberto ? fecharMenu() : abrirMenu();
  }

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(function (link) {
      link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburgerBtn.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
        hamburgerBtn.focus();
      }
    });
  }

  /* ---------- Ano automático no rodapé ---------- */
  if (footerAno) {
    footerAno.textContent = new Date().getFullYear();
  }

})();
