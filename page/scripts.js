// script.js

const images = document.querySelectorAll('.carousel-images img');
const indicators = document.querySelector('.carousel-indicators');
let currentIndex = 0;

function showImage(index) {
    document.querySelector('.carousel-images').style.transform = `translateX(-${index * 100}%)`;
    const dots = document.querySelectorAll('.carousel-indicators span');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function createIndicators() {
    images.forEach((image, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
        indicators.appendChild(dot);
    });
    showImage(currentIndex); // Exibe a primeira imagem inicialmente
}

function autoAdvance() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

setInterval(autoAdvance, 3000);

let touchStartX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container').addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        showImage(currentIndex);
    }
});

createIndicators();
