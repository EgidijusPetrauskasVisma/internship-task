import { fetchData } from "./api.js";

const ui = {
    categoriesSection: document.querySelector('.categories-section')
}

const appendCategories = async () => {
    const categories = await fetchData('categories');
    categories.forEach(item => {
        const newCategory = buildNewCategory(item);
        ui.categoriesSection.appendChild(newCategory);
    })
}

function buildNewCategory(item) {
    const newCategory = document.createElement('a');
    newCategory.setAttribute('href', `/inner-page.html?category=${item.id}`);
    newCategory.setAttribute('id', item.id);
    newCategory.classList.add('category');
    newCategory.innerText = item.title;
    return newCategory;
}

function initCategories() {
    appendCategories();
}

export default initCategories;