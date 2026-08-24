document.addEventListener('DOMContentLoaded', () => {
  const cardImages = document.querySelectorAll('.card-img');

  cardImages.forEach(cardImg => {
    cardImg.addEventListener('mousemove', e => {
      const rect = cardImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Glow properties
      const relativeX = (x / rect.width) * 100;
      const relativeY = (y / rect.height) * 100;

      cardImg.style.setProperty('--glow-x', `${relativeX}%`);
      cardImg.style.setProperty('--glow-y', `${relativeY}%`);
      cardImg.style.setProperty('--glow-intensity', '1');

      // 3D Tilt properties (similar to "sobre mim")
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      cardImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    cardImg.addEventListener('mouseleave', () => {
      // Reset Glow
      cardImg.style.setProperty('--glow-intensity', '0');
      
      // Reset 3D Tilt
      cardImg.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
});
