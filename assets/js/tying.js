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
    });
