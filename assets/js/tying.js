var messageArray = ["         Marcio Gabriel"]
var textPosition = 0;
var speed = 100;

typeWriter = () => {
    document.querySelector(".principal__sentence").innerHTML = messageArray[0].substring(0,textPosition);
    if(textPosition++ != messageArray[0].length)
        setTimeout(typeWriter, speed)
}
window.addEventListener("load", typeWriter);

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
    }, 400);
}

function closeResumeModal(event) {
    if (event.target === event.currentTarget) {
        forceCloseResumeModal();
    }
}

// --- Scramble (Encrypt) Effect ---
document.addEventListener("DOMContentLoaded", function() {
    const chars = "!@#$%^&*():{};|,.<>/?";
    const scrambleElements = document.querySelectorAll("[data-scramble]");
    
    scrambleElements.forEach(el => {
        let interval = null;
        const targetText = el.getAttribute("data-scramble");
        const trigger = el.parentElement;
        
        trigger.addEventListener("mouseenter", () => {
            let pos = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                el.innerText = targetText.split("").map((char, index) => {
                    if (pos / 2 > index) return char;
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
