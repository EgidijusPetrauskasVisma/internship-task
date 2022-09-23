const ui = {
    carousel: document.querySelector('.carousel'),
    slides: document.querySelectorAll('.slide'),
    slidesCounter: document.querySelector('.slides-counter'),
    slideIndex: 0
}

function prevSlide() {
    if (ui.slideIndex === 0) return;
    ui.slideIndex--;
    ui.carousel.style.setProperty('--slide-index', ui.slideIndex);
    updateCounter();
}

function nextSlide() {
    if (ui.slides.length === (ui.slideIndex + 1)) return;
    ui.slideIndex++;
    ui.carousel.style.setProperty('--slide-index', ui.slideIndex);
    updateCounter();
}

function updateCounter() {
    ui.slidesCounter.innerText = `${ui.slideIndex + 1}/${ui.slides.length}`
}

updateCounter();