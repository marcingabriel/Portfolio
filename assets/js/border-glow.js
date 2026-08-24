// assets/js/border-glow.js

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function initBorderGlow() {
  const cards = document.querySelectorAll('.border-glow-card');
  if (cards.length === 0) return;

  const edgeSensitivity = 15;
  const glowColor = '145 70 35'; // A nice green/purple mixed hue HSL equivalent roughly
  const backgroundColor = 'rgba(18, 18, 18, 0.7)'; // Match timeline card
  const borderRadius = 12; // Match timeline card
  const glowRadius = 30;
  const glowIntensity = 0.6;
  const coneSpread = 12;
  const fillOpacity = 0.05;
  const tiltMax = 3.5; // subtle 3D tilt
  
  // Neon colors from the portfolio
  const colors = ['#1ea875', '#7c4dff', '#0f9c02'];

  const glowVars = buildGlowVars(glowColor, glowIntensity);
  const gradVars = buildGradientVars(colors);

  const getCenterOfElement = (el) => {
    const rect = el.getBoundingClientRect();
    return [rect.width / 2, rect.height / 2];
  };

  const getEdgeProximity = (el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  };

  const getCursorAngle = (el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  };

  cards.forEach(card => {
    // Apply styling vars
    card.style.setProperty('--card-bg', backgroundColor);
    card.style.setProperty('--edge-sensitivity', edgeSensitivity);
    card.style.setProperty('--border-radius', `${borderRadius}px`);
    card.style.setProperty('--glow-padding', `${glowRadius}px`);
    card.style.setProperty('--cone-spread', coneSpread);
    card.style.setProperty('--fill-opacity', fillOpacity);
    
    for (const [k, v] of Object.entries(glowVars)) card.style.setProperty(k, v);
    for (const [k, v] of Object.entries(gradVars)) card.style.setProperty(k, v);

    // Initial state
    card.style.setProperty('--edge-proximity', '0');
    card.style.setProperty('--cursor-angle', '45deg');

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);

      // 3D Perspective Tilt calculation
      const dx = x - rect.width / 2;
      const dy = y - rect.height / 2;
      const rotateX = (dy / (rect.height / 2)) * -tiltMax;
      const rotateY = (dx / (rect.width / 2)) * tiltMax;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--edge-proximity', '0');
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

document.addEventListener('DOMContentLoaded', initBorderGlow);
