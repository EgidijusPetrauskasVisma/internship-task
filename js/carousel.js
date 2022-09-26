import { fetchData } from "./api.js";

const ui = {
    carousel: document.querySelector('.carousel'),
    slidesCounter: document.querySelector('.slides-counter'),
    slidesContainer: document.querySelector('.slides-container'),
    slideIndex: 0,
}

function prevSlide() {
    if (ui.slideIndex === 0) return;
    ui.slideIndex--;
    ui.carousel.style.setProperty('--slide-index', ui.slideIndex);
    updateCounter();
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === (ui.slideIndex + 1)) return;
    ui.slideIndex++;
    ui.carousel.style.setProperty('--slide-index', ui.slideIndex);
    updateCounter();
}

function updateCounter() {
    const slides = document.querySelectorAll('.slide');
    ui.slidesCounter.innerText = `${ui.slideIndex + 1}/${slides.length}`
}

const appendCarouselSlides = async () => {
    const carouselSlides = await fetchData('items?flag=1');
    carouselSlides.forEach(slide => {
        const newSlide = buildNewSlide(slide);
        ui.slidesContainer.appendChild(newSlide);
    })
    updateCounter();
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
            <a target="_blank" href="${slide.img}"></a>
        `;
    return newSlide;
}

function initCarousel() {
    appendCarouselSlides()
}

document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);

export default initCarousel;