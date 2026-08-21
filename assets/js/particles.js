document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('experiencias-particles');
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let width, height;
  
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const colors = ['#1ea875', '#7c4dff', '#0f9c02', '#ffffff'];
  
  for(let i=0; i<100; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;
  const interactiveElement = container.parentElement;
  
  interactiveElement.addEventListener('mousemove', (e) => {
    const rect = interactiveElement.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  
  interactiveElement.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  let animId = null;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      // Gentle repel on hover
      if (dist < 150) {
        p.x -= (dx / dist) * 1.5;
        p.y -= (dy / dist) * 1.5;
      }

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    
    animId = requestAnimationFrame(draw);
  }

  // IntersectionObserver to only animate when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animId) animId = requestAnimationFrame(draw);
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  });
  
  observer.observe(interactiveElement);
});
