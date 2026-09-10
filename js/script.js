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
      const contexto = this;
      const argumentos = arguments;
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

  /* Ponto de quebra do menu mobile — deve acompanhar o CSS (max-width: 1023px). */
  var BREAKPOINT_MENU_MOBILE = 1024;

  function atualizarEstadoMenu(aberto) {
    if (!hamburgerBtn || !mainNav) {
      return;
    }

    hamburgerBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    const menuMobile = window.innerWidth < BREAKPOINT_MENU_MOBILE;
    mainNav.setAttribute('aria-hidden', String(menuMobile && !aberto));

    if ('inert' in mainNav) {
      mainNav.inert = menuMobile && !aberto;
    }
  }

  /* ---------- Menu Mobile ---------- */
  function abrirMenu() {
    ultimoElementoFocado = document.activeElement;
    hamburgerBtn.classList.add('header__hamburger--ativo');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('header__nav--aberto');
    atualizarEstadoMenu(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const primeiroLink = mainNav.querySelector('.header__link');
    if (primeiroLink) {
      primeiroLink.focus();
    }
  }

  function fecharMenu(restaurarFoco) {
    var deveRestaurarFoco = restaurarFoco !== false;
    hamburgerBtn.classList.remove('header__hamburger--ativo');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('header__nav--aberto');
    atualizarEstadoMenu(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (deveRestaurarFoco && ultimoElementoFocado && typeof ultimoElementoFocado.focus === 'function') {
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

    /* Fecha o menu ao clicar em QUALQUER link do nav (inclui o CTA do WhatsApp,
       que abre em nova aba e antes mantinha a página travada com overflow hidden). */
    mainNav.querySelectorAll('a').forEach(function (link) {
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
      if (window.innerWidth >= BREAKPOINT_MENU_MOBILE && hamburgerBtn.getAttribute('aria-expanded') === 'true') {
        /* Fecha sem roubar o foco durante o redimensionamento. */
        fecharMenu(false);
        return;
      }

      atualizarEstadoMenu(hamburgerBtn.getAttribute('aria-expanded') === 'true');
    }, 150));
  }

  /* ---------- Entrada suave e seção ativa ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elementosRevelados = document.querySelectorAll('.hero__texto, .hero__imagem, .diferencial-card, .carrossel, .sobre__imagem, .sobre__texto, .depoimento-card, .faq__item, .info-card, .contato__divisor, .contato__botoes');

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

  /* ---------- Status "Aberto agora" (fuso America/Sao_Paulo) ---------- */
  (function atualizarStatusAberto() {
    var el = document.getElementById('status-aberto');
    var texto = document.getElementById('status-aberto-texto');
    if (!el || !texto) {
      return;
    }

    /* Usa o horário da loja, não do visitante (turista em outro fuso via status errado). */
    function partesEmSP(data) {
      try {
        var fmt = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        });
        var partes = fmt.formatToParts(data);
        var out = { diaSemana: '', hora: 0, minuto: 0 };
        partes.forEach(function (p) {
          if (p.type === 'weekday') out.diaSemana = p.value;
          if (p.type === 'hour') out.hora = parseInt(p.value, 10);
          if (p.type === 'minute') out.minuto = parseInt(p.value, 10);
        });
        return out;
      } catch (e) {
        return { diaSemana: '', hora: data.getHours(), minuto: data.getMinutes(), fallback: true, dia: data.getDay() };
      }
    }

    var agora = new Date();
    var sp = partesEmSP(agora);
    var ehDomingo;
    if (sp.fallback) {
      ehDomingo = sp.dia === 0;
    } else {
      ehDomingo = sp.diaSemana.toLowerCase().indexOf('dom') === 0;
    }
    var hora = sp.hora + sp.minuto / 60;
    var abre = 9;
    var fecha = ehDomingo ? 14 : 21;
    var aberto = hora >= abre && hora < fecha;

    function fmt(h) {
      return String(h).padStart(2, '0') + 'h';
    }

    el.setAttribute('data-estado', aberto ? 'aberto' : 'fechado');
    texto.textContent = aberto
      ? 'Aberto agora · fecha às ' + fmt(fecha)
      : 'Fechado agora · abre às ' + fmt(abre);
  })();

  /* ---------- Ano automático no rodapé ---------- */
  if (footerAno) {
    footerAno.textContent = new Date().getFullYear();
  }

  /* ---------- Service Worker ---------- */
  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(new URL('./sw.js', window.location.href), { scope: '/' })
        .catch(function () {
          // Ignora falha de registro em ambientes restritivos ou em páginas sem suporte.
        });
    });
  }

  /* ---------- Carrossel de imagens ---------- */
  (function initCarrossel() {
    const carrossel = document.querySelector('.carrossel');
    if (!carrossel) {
      return;
    }
    const pista = carrossel.querySelector('.carrossel__slides');
    const slides = carrossel.querySelectorAll('.carrossel__slide');
    const btnAnterior = carrossel.querySelector('.carrossel__btn--anterior');
    const btnProximo = carrossel.querySelector('.carrossel__btn--proximo');
    const btnPausa = carrossel.querySelector('.carrossel__btn--pausa');
    const pontos = carrossel.querySelectorAll('.carrossel__ponto');
    const status = document.getElementById('carrossel-status');
    const totalSlides = slides.length;

    if (!pista || !totalSlides) {
      return;
    }

    let indiceAtual = 0;
    let arrastando = false;
    let inicioX = 0;
    let deslocamentoX = 0;
    let pausadoManual = false;

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
        ponto.setAttribute('aria-current', String(ativo));
      });
      slides.forEach(function (slide, i) {
        const ativo = i === indiceAtual;
        if (ativo) {
          slide.removeAttribute('aria-hidden');
          if ('inert' in slide) slide.inert = false;
        } else {
          slide.setAttribute('aria-hidden', 'true');
          if ('inert' in slide) slide.inert = true;
        }
      });
      if (status) {
        status.textContent = 'Slide ' + (indiceAtual + 1) + ' de ' + totalSlides;
      }
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
        const indice = parseInt(ponto.getAttribute('data-indice'), 10);
        irParaSlide(indice);
      });
    });

    /* Navegação por teclado (o carrossel recebe foco via tabindex="0") */
    carrossel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        irParaSlide(indiceAtual - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
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
      const deslocamentoAtual = -(indiceAtual * 100) + (deslocamentoX / pista.offsetWidth * 100);
      pista.style.transform = 'translateX(' + deslocamentoAtual + '%)';
    }, { passive: true });

    pista.addEventListener('touchend', function () {
      arrastando = false;
      pista.style.transition = '';
      const limiar = pista.offsetWidth * 0.2;
      if (deslocamentoX < -limiar) {
        irParaSlide(indiceAtual + 1);
      } else if (deslocamentoX > limiar) {
        irParaSlide(indiceAtual - 1);
      } else {
        irParaSlide(indiceAtual);
      }
      deslocamentoX = 0;
    }, { passive: true });

    pista.addEventListener('touchcancel', function () {
      arrastando = false;
      pista.style.transition = '';
      irParaSlide(indiceAtual);
      deslocamentoX = 0;
    }, { passive: true });

    /* Pausar autoplay em hover/foco + botão pausar (WCAG 2.2.2) */
    let intervaloAutoPlay = null;
    let emHover = false;
    let emFoco = false;
    function podeTocar() {
      return !pausadoManual && !emHover && !emFoco;
    }
    function pararAutoPlay() {
      if (intervaloAutoPlay !== null) {
        clearInterval(intervaloAutoPlay);
        intervaloAutoPlay = null;
      }
    }
    function iniciarAutoPlay() {
      if (!podeTocar()) {
        return;
      }
      /* Evita acumular intervalos (mouseleave + focusout podem disparar em sequência). */
      pararAutoPlay();
      intervaloAutoPlay = setInterval(function () {
        irParaSlide(indiceAtual + 1);
      }, 5000);
    }
    function sincronizarAutoPlay() {
      if (podeTocar()) {
        iniciarAutoPlay();
      } else {
        pararAutoPlay();
      }
    }

    function atualizarBtnPausa() {
      if (!btnPausa) return;
      btnPausa.setAttribute('aria-pressed', String(pausadoManual));
      btnPausa.setAttribute('aria-label', pausadoManual ? 'Retomar apresentação automática' : 'Pausar apresentação automática');
      var iconePausar = btnPausa.querySelector('.icone-pausar');
      var iconeRetomar = btnPausa.querySelector('.icone-retomar');
      /* SVGElement não reflete a propriedade `.hidden` em atributo em todos os browsers,
         então alterna o atributo explicitamente para o CSS [hidden] funcionar. */
      if (iconePausar) {
        if (pausadoManual) iconePausar.setAttribute('hidden', '');
        else iconePausar.removeAttribute('hidden');
      }
      if (iconeRetomar) {
        if (pausadoManual) iconeRetomar.removeAttribute('hidden');
        else iconeRetomar.setAttribute('hidden', '');
      }
    }

    if (btnPausa) {
      // Se o usuário prefere movimento reduzido, já nasce pausado, mas permite opt-in manual.
      if (prefersReducedMotion) {
        pausadoManual = true;
      }
      atualizarBtnPausa();
      btnPausa.addEventListener('click', function () {
        pausadoManual = !pausadoManual;
        sincronizarAutoPlay();
        atualizarBtnPausa();
      });
    }

    atualizarPontos();
    sincronizarAutoPlay();
    carrossel.addEventListener('mouseenter', function () {
      emHover = true;
      pararAutoPlay();
    });
    carrossel.addEventListener('mouseleave', function () {
      emHover = false;
      iniciarAutoPlay();
    });
    carrossel.addEventListener('focusin', function () {
      emFoco = true;
      pararAutoPlay();
    });
    carrossel.addEventListener('focusout', function (e) {
      if (!carrossel.contains(e.relatedTarget)) {
        emFoco = false;
        iniciarAutoPlay();
      }
    });
  })();

})();
