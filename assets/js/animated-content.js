document.addEventListener('DOMContentLoaded', () => {
  // Verificando dependências do GSAP
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP ou ScrollTrigger não encontrados. Inclua as bibliotecas antes do animated-content.js.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const animatedElements = document.querySelectorAll('.animated-content');

  animatedElements.forEach((el) => {
    // Configurações via atributos data-*
    const distance = parseFloat(el.getAttribute('data-distance') || '100');
    const direction = el.getAttribute('data-direction') || 'vertical';
    const reverse = el.getAttribute('data-reverse') === 'true';
    const duration = parseFloat(el.getAttribute('data-duration') || '0.8');
    const ease = el.getAttribute('data-ease') || 'power3.out';
    const initialOpacity = parseFloat(el.getAttribute('data-initial-opacity') || '0');
    const animateOpacity = el.getAttribute('data-animate-opacity') !== 'false';
    const scale = parseFloat(el.getAttribute('data-scale') || '1');
    const threshold = parseFloat(el.getAttribute('data-threshold') || '0.1');
    const delay = parseFloat(el.getAttribute('data-delay') || '0');

    // Suporte para desaparecimento (disappearAfter)
    const disappearAfter = parseFloat(el.getAttribute('data-disappear-after') || '0');
    const disappearDuration = parseFloat(el.getAttribute('data-disappear-duration') || '0.5');
    const disappearEase = el.getAttribute('data-disappear-ease') || 'power3.in';

    const scrollerTargetSelector = el.getAttribute('data-container');
    let scrollerTarget = null;
    if (scrollerTargetSelector) {
      scrollerTarget = document.querySelector(scrollerTargetSelector);
    } else {
      const snapMainContainer = document.getElementById('snap-main-container');
      if (snapMainContainer) {
        scrollerTarget = snapMainContainer;
      }
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    // Estado inicial antes da animação
    gsap.set(el, {
      [axis]: offset,
      scale: scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay: delay,
      onComplete: () => {
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase
          });
        }
      }
    });

    // Transição principal
    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration: duration,
      ease: ease
    });

    // Associa ao ScrollTrigger
    ScrollTrigger.create({
      trigger: el,
      animation: tl,
      scroller: scrollerTarget || window,
      start: "top 95%", // Começa assim que a pontinha do elemento entra na tela
      end: "top 55%",   // Dá quase metade da tela de distância para a animação se desenvolver
      toggleActions: "play reverse play reverse",
      scrub: 1.5        // Aumentar o scrub de 1 para 1.5 deixa o movimento mais "macio" e menos reativo
    });
  });
});
