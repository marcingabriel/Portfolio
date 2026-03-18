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
            const randomDelay = Math.random() * 10; // Atraso aleatório entre 0 e 10 segundos
            bubble.style.setProperty('--delay', `${randomDelay}s`);
        });

        // Fallback e animação fluida para browsers
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Descomente a proxima linha caso queira que a animacao rode apenas 1x
                    // observer.unobserve(entry.target); 
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        const autoShowElements = document.querySelectorAll('.autoShow');
        autoShowElements.forEach(el => observer.observe(el));
    });
