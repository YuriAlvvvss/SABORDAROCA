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
  const secoes = document.querySelectorAll('main > section[id]');
  let ultimoElementoFocado = null;

  /* ---------- Utilitários ---------- */
  function debounce(fn, atraso) {
    let timer;
    return function () {
      var contexto = this;
      var argumentos = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(contexto, argumentos);
      }, atraso);
    };
  }

  document.querySelectorAll('img').forEach(function (imagem) {
    imagem.addEventListener('error', function () {
      imagem.classList.add('imagem--indisponivel');
      imagem.alt = 'Imagem indisponível';
    });
  });

  function atualizarEstadoMenu(aberto) {
    hamburgerBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    const menuMobile = window.innerWidth < 768;
    mainNav.setAttribute('aria-hidden', String(menuMobile && !aberto));
    mainNav.inert = menuMobile && !aberto;
  }

  /* ---------- Menu Mobile ---------- */
  function abrirMenu() {
    ultimoElementoFocado = document.activeElement;
    hamburgerBtn.classList.add('header__hamburger--ativo');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('header__nav--aberto');
    atualizarEstadoMenu(true);
    document.body.style.overflow = 'hidden';
    const primeiroLink = mainNav.querySelector('.header__link');
    if (primeiroLink) {
      primeiroLink.focus();
    }
  }

  function fecharMenu() {
    hamburgerBtn.classList.remove('header__hamburger--ativo');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('header__nav--aberto');
    atualizarEstadoMenu(false);
    document.body.style.overflow = '';
    if (ultimoElementoFocado && typeof ultimoElementoFocado.focus === 'function') {
      ultimoElementoFocado.focus();
    }
    ultimoElementoFocado = null;
  }

  function toggleMenu() {
    const aberto = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    aberto ? fecharMenu() : abrirMenu();
  }

  if (hamburgerBtn && mainNav) {
    atualizarEstadoMenu(false);
    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(function (link) {
      link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburgerBtn.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (hamburgerBtn.getAttribute('aria-expanded') !== 'true') {
        return;
      }

      if (!mainNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        fecharMenu();
      }
    });

    window.addEventListener('resize', debounce(function () {
      if (window.innerWidth >= 768 && hamburgerBtn.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
        return;
      }

      atualizarEstadoMenu(hamburgerBtn.getAttribute('aria-expanded') === 'true');
    }, 150));
  }

  /* ---------- Entrada suave e seção ativa ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elementosRevelados = document.querySelectorAll('.hero__texto, .diferencial-card, .carrossel, .sobre__imagem, .sobre__texto, .depoimento-card, .faq__item, .info-card, .contato__divisor, .contato__botoes');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    elementosRevelados.forEach(function (elemento) {
      elemento.classList.add('js-reveal');
    });

    const observadorEntrada = new IntersectionObserver(function (entradas, observer) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('js-reveal--visivel');
          observer.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosRevelados.forEach(function (elemento) {
      observadorEntrada.observe(elemento);
    });
  }

  if ('IntersectionObserver' in window && secoes.length && navLinks.length) {
    const observadorSecoes = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) {
          return;
        }

        navLinks.forEach(function (link) {
          const ativo = link.getAttribute('href') === '#' + entrada.target.id;
          if (ativo) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    secoes.forEach(function (secao) {
      observadorSecoes.observe(secao);
    });
  }

  /* ---------- Ano automático no rodapé ---------- */
  if (footerAno) {
    footerAno.textContent = new Date().getFullYear();
  }

  /* ---------- Service Worker ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (registro) {
          /* SW registrado com sucesso */
        })
        .catch(function (erro) {
          /* Falha silenciosa — site funciona sem SW */
        });
    });
  }

  /* ---------- Carrossel de imagens ---------- */
  const carrossel = document.querySelector('.carrossel');
  if (carrossel) {
    const pista = carrossel.querySelector('.carrossel__slides');
    const slides = carrossel.querySelectorAll('.carrossel__slide');
    const btnAnterior = carrossel.querySelector('.carrossel__btn--anterior');
    const btnProximo = carrossel.querySelector('.carrossel__btn--proximo');
    const pontos = carrossel.querySelectorAll('.carrossel__ponto');
    const totalSlides = slides.length;
    let indiceAtual = 0;
    let arrastando = false;
    let inicioX = 0;
    let deslocamentoX = 0;

    function irParaSlide(indice) {
      if (indice < 0) indice = totalSlides - 1;
      if (indice >= totalSlides) indice = 0;
      indiceAtual = indice;
      pista.style.transform = 'translateX(-' + (indiceAtual * 100) + '%)';
      atualizarPontos();
    }

    function atualizarPontos() {
      pontos.forEach(function (ponto, i) {
        const ativo = i === indiceAtual;
        ponto.classList.toggle('carrossel__ponto--ativo', ativo);
        ponto.setAttribute('aria-selected', String(ativo));
      });
    }

    if (btnAnterior && btnProximo) {
      btnAnterior.addEventListener('click', function () {
        irParaSlide(indiceAtual - 1);
      });
      btnProximo.addEventListener('click', function () {
        irParaSlide(indiceAtual + 1);
      });
    }

    pontos.forEach(function (ponto) {
      ponto.addEventListener('click', function () {
        var indice = parseInt(ponto.getAttribute('data-indice'), 10);
        irParaSlide(indice);
      });
    });

    /* Navegação por teclado */
    carrossel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        irParaSlide(indiceAtual - 1);
      } else if (e.key === 'ArrowRight') {
        irParaSlide(indiceAtual + 1);
      }
    });

    /* Swipe em touch */
    pista.addEventListener('touchstart', function (e) {
      arrastando = true;
      inicioX = e.touches[0].clientX;
      pista.style.transition = 'none';
    }, { passive: true });

    pista.addEventListener('touchmove', function (e) {
      if (!arrastando) return;
      deslocamentoX = e.touches[0].clientX - inicioX;
      var deslocamentoAtual = -(indiceAtual * 100) + (deslocamentoX / pista.offsetWidth * 100);
      pista.style.transform = 'translateX(' + deslocamentoAtual + '%)';
    }, { passive: true });

    pista.addEventListener('touchend', function () {
      arrastando = false;
      pista.style.transition = '';
      var limiar = pista.offsetWidth * 0.2;
      if (deslocamentoX < -limiar) {
        irParaSlide(indiceAtual + 1);
      } else if (deslocamentoX > limiar) {
        irParaSlide(indiceAtual - 1);
      } else {
        irParaSlide(indiceAtual);
      }
      deslocamentoX = 0;
    });

    /* Pausar autoplay em hover/foco */
    var intervaloAutoPlay;
    function iniciarAutoPlay() {
      intervaloAutoPlay = setInterval(function () {
        irParaSlide(indiceAtual + 1);
      }, 5000);
    }
    function pararAutoPlay() {
      clearInterval(intervaloAutoPlay);
    }

    if (!prefersReducedMotion) {
      iniciarAutoPlay();
      carrossel.addEventListener('mouseenter', pararAutoPlay);
      carrossel.addEventListener('mouseleave', iniciarAutoPlay);
      carrossel.addEventListener('focusin', pararAutoPlay);
      carrossel.addEventListener('focusout', function (e) {
        if (!carrossel.contains(e.relatedTarget)) {
          iniciarAutoPlay();
        }
      });
    }
  }

})();
