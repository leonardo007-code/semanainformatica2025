import anime from 'animejs';

const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const enterStagger = (target, delay = 50) => {
  if (shouldReduceMotion()) return;

  anime({
    targets: target,
    opacity: [0, 1],
    translateY: [12, 0],
    delay: anime.stagger(delay),
    duration: 600,
    easing: 'easeOutExpo'
  });
};

export const hoverLift = (target) => {
  if (shouldReduceMotion()) return;

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  element.addEventListener('mouseenter', () => {
    anime({
      targets: element,
      translateY: -4,
      scale: 1.02,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      duration: 200,
      easing: 'easeOutExpo'
    });
  });

  element.addEventListener('mouseleave', () => {
    anime({
      targets: element,
      translateY: 0,
      scale: 1,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      duration: 200,
      easing: 'easeOutExpo'
    });
  });
};

export const pulseAccent = (target) => {
  if (shouldReduceMotion()) return;

  anime({
    targets: target,
    scale: [1, 1.05, 1],
    opacity: [1, 0.85, 1],
    duration: 1500,
    easing: 'easeInOutQuad',
    loop: true
  });
};

export const fadeInUp = (target, duration = 800) => {
  if (shouldReduceMotion()) {
    anime({
      targets: target,
      opacity: [0, 1],
      duration: 50,
      easing: 'linear'
    });
    return;
  }

  anime({
    targets: target,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: duration,
    easing: 'easeOutCubic'
  });
};

export const slideInLeft = (target, duration = 700) => {
  if (shouldReduceMotion()) {
    anime({
      targets: target,
      opacity: [0, 1],
      duration: 50,
      easing: 'linear'
    });
    return;
  }

  anime({
    targets: target,
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: duration,
    easing: 'easeOutCubic'
  });
};

export const scaleIn = (target, duration = 500) => {
  if (shouldReduceMotion()) return;

  anime({
    targets: target,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: duration,
    easing: 'easeOutElastic(1, .6)'
  });
};

export const batchHoverLift = (selector) => {
  if (shouldReduceMotion()) return;

  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.style.willChange = 'transform';
    hoverLift(element);
  });
};
