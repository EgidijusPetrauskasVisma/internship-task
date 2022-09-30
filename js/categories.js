//@ts-check
import { fetchCategories } from "./api.js";

const ui = {
    categoriesSection: document.querySelector('.categories-section')
}

const appendCategories = async () => {
    const categories = await fetchCategories();
    categories.forEach(category => {
        const newCategory = buildNewCategory(category);
        ui.categoriesSection?.appendChild(newCategory);
    })
}

function buildNewCategory(category) {
    const newCategory = document.createElement('a');
    newCategory.setAttribute('href', `/inner-page.html?category=${category.id}`);
    newCategory.setAttribute('id', category.id);
    newCategory.classList.add('category');
    newCategory.innerText = category.title;
    return newCategory;
}

export default appendCategories;