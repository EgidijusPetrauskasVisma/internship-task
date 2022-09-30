//@ts-check
import { fetchCarouselProducts } from "./api.js";

const ui = {
    /**@type {HTMLElement | null} */
    carousel: document.querySelector('.carousel'),
    /**@type {HTMLElement | null} */
    slidesCounter: document.querySelector('.slides-counter'),
    slidesContainer: document.querySelector('.slides-container'),
    prevSlideButton: document.querySelector('.prev'),
    nextSlideButton: document.querySelector('.next'),
    slideIndex: 0,
}

function prevSlide() {
    if (ui.slideIndex === 0) return;
    ui.slideIndex--;
    ui.carousel?.style.setProperty('--slide-index', String(ui.slideIndex));
    updateCounter();
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === (ui.slideIndex + 1)) return;
    ui.slideIndex++;
    ui.carousel?.style.setProperty('--slide-index', String(ui.slideIndex));
    updateCounter();
}

function updateCounter() {
    const slides = document.querySelectorAll('.slide');
    if (!ui.slidesCounter) return;
    ui.slidesCounter.innerText = `${ui.slideIndex + 1}/${slides.length}`
}

const appendCarouselSlides = async () => {
    const carouselSlides = await fetchCarouselProducts();
    carouselSlides.forEach(slide => {
        const newSlide = buildNewSlide(slide);
        ui.slidesContainer?.appendChild(newSlide);
    })
    updateCounter();
    checkIfEmpty(carouselSlides);
}

function checkIfEmpty(slidesArray) {
    if (!ui.slidesContainer) return;
    if (!ui.slidesCounter) return;
    if (slidesArray.length === 0) {
        ui.slidesContainer?.classList.add('empty-container-text');
        ui.slidesContainer.innerHTML = `
            <h2 class="empty-container-text">No items found</h2>
        `
        ui.slidesCounter.innerHTML = '';
    }
}

function buildNewSlide(slide) {
    const newSlide = document.createElement('li');
    newSlide.classList.add('slide');
    newSlide.innerHTML =
        `
            <img src="${slide.img}" alt="${slide.title} img">
            <div class="slide-text-container">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
            </div>
            <a target="_blank" href="${slide.img}" aria-label="Slide link to ${slide.title}"></a>
        `;
    return newSlide;
}

function initCarousel() {
    appendCarouselSlides()
}

ui.prevSlideButton?.addEventListener('click', prevSlide);
ui.nextSlideButton?.addEventListener('click', nextSlide);

export default initCarousel;