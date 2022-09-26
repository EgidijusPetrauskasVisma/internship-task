import { fetchData } from "./api.js";

const ui = {
    itemsContainer: document.querySelector('.items-container')
}

const appendItems = async () => {
    const items = await fetchItems();
    ui.itemsContainer.innerHTML = '';
    checkIfEmpty(items);
    items.forEach(item => {
        const newItem = buildNewItem(item);
        ui.itemsContainer.appendChild(newItem);
    })
}

async function fetchItems() {
    const category = new URLSearchParams(window.location.search).get('category');
    const items = await fetchData(`items?categoryId=${category}`);
    return items;
}

function checkIfEmpty(itemsArray) {
    if (itemsArray.length === 0) {
        ui.itemsContainer.classList.add('empty-container-text');
        ui.itemsContainer.innerHTML = `
            <h2 class="empty-container-text">Sorry.. No items in this category</h2>
        `
    }
}

function buildNewItem(item) {
    const newItem = document.createElement('article');
    newItem.classList.add('item');
    newItem.innerHTML =
        `
    <img src=${item.img} alt="${item.title} img">
    <p>${item.title}</p>
    `;
    return newItem;
}

appendItems();