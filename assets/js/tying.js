// --- Efeito de Typing (TextType) ---
const textElement = document.querySelector(".principal__sentence");
const cursorElement = document.querySelector(".principal__input-cursor");
const targetText = "Marcio Gabriel";
let textPosition = 0;
let isTypingStarted = false;

// Configurações
const typingSpeedMin = 50;
const typingSpeedMax = 120;
const initialDelay = 800; // Tempo antes de começar a digitar

function getRandomSpeed() {
    return Math.random() * (typingSpeedMax - typingSpeedMin) + typingSpeedMin;
}

function typeWriter() {
    if (textPosition < targetText.length) {
        textElement.innerHTML = targetText.substring(0, textPosition + 1);
        textPosition++;
        setTimeout(typeWriter, getRandomSpeed());
    } else {
        // Quando terminar de digitar, o cursor continua piscando via CSS
        if (cursorElement) {
            cursorElement.style.opacity = 1;
        }
    }
}

// Iniciar apenas quando a seção estiver visível
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isTypingStarted) {
            isTypingStarted = true;
            // Limpa o texto inicial e aguarda o delay para começar
            textElement.innerHTML = "";
            setTimeout(typeWriter, initialDelay);
        }
    });
}, { threshold: 0.5 });

if (textElement) {
    heroObserver.observe(textElement);
}

document.addEventListener("DOMContentLoaded", function() {
    const bubbles = document.querySelectorAll('.bubbles span');
    bubbles.forEach(bubble => {
        const randomDelay = Math.random() * 10;
        bubble.style.setProperty('--delay', `${randomDelay}s`);
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    const autoShowElements = document.querySelectorAll('.autoShow');
    autoShowElements.forEach(el => observer.observe(el));
});

// Funções para o Modal do Currículo
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.style.display = 'flex';
    modal.offsetWidth; // Force reflow
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function forceCloseResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 600);
}

function closeResumeModal(event) {
    if (event.target === event.currentTarget) {
        forceCloseResumeModal();
    }
}

// --- Scramble (Encrypt) Effect ---
document.addEventListener("DOMContentLoaded", function() {
    const chars = "abcdefghijklmnopqrstuvwxyz"; // Smoother width chars
    const scrambleElements = document.querySelectorAll("[data-scramble]");
    
    scrambleElements.forEach(el => {
        let interval = null;
        const targetText = el.getAttribute("data-scramble");
        const trigger = el.parentElement;
        
        // Lock the width to prevent the button from deforming during scramble
        el.style.width = `${el.offsetWidth}px`;
        el.style.display = 'inline-block';
        el.style.textAlign = 'left';

        trigger.addEventListener("mouseenter", () => {
            let pos = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                el.innerText = targetText.split("").map((char, index) => {
                    if (pos / 2 > index) return char;
                    if (char === " ") return " ";
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");
                
                pos++;
                if (pos >= targetText.length * 2) {
                    clearInterval(interval);
                    el.innerText = targetText;
                }
            }, 30);
        });
        
        trigger.addEventListener("mouseleave", () => {
            clearInterval(interval);
            el.innerText = targetText;
        });
    });
});

// --- Spotlight Cards Effect ---
document.addEventListener("DOMContentLoaded", function() {
    const featuresContainer = document.getElementById('features-spotlight');
    if (featuresContainer) {
        featuresContainer.addEventListener('mousemove', e => {
            const icons = document.querySelectorAll('.features article .icon');
            for (const icon of icons) {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                icon.style.setProperty('--mouse-x', `${x}px`);
                icon.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    }
});

// --- TiltedCard (Sobre mim photo) ---
document.addEventListener("DOMContentLoaded", function() {
    const tiltedCard = document.getElementById('sobre-mim-tilted-card');
    if (!tiltedCard) return;

    tiltedCard.addEventListener("mousemove", (e) => {
        const rect = tiltedCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Amplitude = 12deg
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        // Tilt the card
        tiltedCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Parallax the overlay tooltip
        const overlay = tiltedCard.querySelector('.tilted-card-overlay');
        if (overlay) {
            overlay.style.transform = `translateZ(50px) translateY(${rotateX * 0.5}px) translateX(${rotateY * -0.5}px)`;
        }
    });

    tiltedCard.addEventListener("mouseleave", () => {
        tiltedCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        const overlay = tiltedCard.querySelector('.tilted-card-overlay');
        if (overlay) {
            overlay.style.transform = `translateZ(30px) translateY(0) translateX(0)`;
        }
    });
});

// --- ScrollFloat Effect (Vanilla JS) ---
document.addEventListener("DOMContentLoaded", function() {
    const floatTitles = document.querySelectorAll('.scroll-float-text');
    
    // Split text into characters
    floatTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = ''; // Clear original text
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            // Use non-breaking space for spaces to preserve width
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            // Set CSS variable for staggered delay
            span.style.setProperty('--char-index', index);
            title.appendChild(span);
        });
    });

    const floatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-floating');
            } else {
                // If you want it to repeat every time it enters the screen
                entry.target.classList.remove('is-floating');
            }
        });
    }, { threshold: 0.1 });

    floatTitles.forEach(el => floatObserver.observe(el));
});

// --- Remove Spline Logo ---
document.addEventListener("DOMContentLoaded", () => {
    const spline = document.querySelector('spline-viewer');
    if (spline) {
        const removeLogo = setInterval(() => {
            const shadow = spline.shadowRoot;
            if (shadow) {
                const logo = shadow.querySelector('#logo');
                if (logo) {
                    logo.remove();
                    clearInterval(removeLogo);
                }
            }
        }, 100);
        // Fallback: stop trying after 5 seconds to prevent infinite loops
        setTimeout(() => clearInterval(removeLogo), 5000);
    }
});
