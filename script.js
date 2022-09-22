const carousel = document.querySelector('.carousel');

function changeSlide(param) {
    const currentSlideIndex = Number(getComputedStyle(carousel).getPropertyValue('--slide-index'));
    const totalSlidesIndex = document.querySelectorAll('.slide').length;

    if (param === 'prev') {
        if (currentSlideIndex === 0) return;
        carousel.style.setProperty('--slide-index', currentSlideIndex - 1);
    } else {
        if (totalSlidesIndex === (currentSlideIndex + 1)) return;
        carousel.style.setProperty('--slide-index', currentSlideIndex + 1);
    }
    updateSlidesCounter();
}

function updateSlidesCounter() {
    const currentSlideIndex = Number(getComputedStyle(carousel).getPropertyValue('--slide-index'));
    const totalSlidesIndex = document.querySelectorAll('.slide').length;
    const slidesCounter = document.querySelector('.slides-counter');
    slidesCounter.innerText = `${currentSlideIndex + 1}/${totalSlidesIndex}`
}

updateSlidesCounter();