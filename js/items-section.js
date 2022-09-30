//@ts-check
import { deleteProduct, fetchCategories, fetchFeaturedProducts } from "./api.js";
import { openDialog } from "./dialog.js";

const ui = {
    itemsContainer: document.querySelector('.items-container'),
    addItemButton: document.querySelector('#add-item-btn'),
    /**@type {HTMLInputElement | null} */
    categoryHeader: document.querySelector('.items-category-header')
}

export const appendItems = async () => {
    if (!ui.itemsContainer) return;
    const items = await fetchItems();
    ui.itemsContainer.innerHTML = '';
    ui.itemsContainer.classList.remove('empty-container-text');
    checkIfEmpty(items);
    items.forEach(item => {
        const newItem = buildNewItem(item);
        ui.itemsContainer?.appendChild(newItem);
    })
}

async function fetchItems() {
    const category = new URLSearchParams(window.location.search).get('category');
    updateCategoryHeader(category);
    const items = await fetchFeaturedProducts(category);
    return items;
}

async function updateCategoryHeader(category) {
    if (!ui.categoryHeader) return;
    const categories = await fetchCategories();
    const currentCategory = categories.find(cat => cat.id === category);
    if (!currentCategory) {
        ui.categoryHeader.innerText = 'Current Category'
    } else {
        ui.categoryHeader.innerText = currentCategory.title;
    }
}

function checkIfEmpty(itemsArray) {
    if (itemsArray.length === 0) {
        ui.itemsContainer?.classList.add('empty-container-text');
        if (!ui.itemsContainer) return;
        ui.itemsContainer.innerHTML = `
            <h2 class="empty-container-text">No items found</h2>
        `
    }
}

function buildNewItem(item) {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.setAttribute('id', item.id);
    newItem.innerHTML =
        `
    <img src=${item.img} alt="${item.title} img">
    <p>${item.title}</p>
    `;
    newItem.appendChild(buildActionButtons(item));
    return newItem;
}

function buildActionButtons(item) {
    const buttonsContainer = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    buttonsContainer.classList.add('buttons-container');
    deleteBtn.classList.add('delete-item-btn', 'action-btn');
    editBtn.classList.add('edit-item-btn', 'action-btn');

    deleteBtn.innerText = 'X';
    editBtn.innerText = 'Edit';

    deleteBtn.addEventListener('click', () => {
        onRemoveClick(item.id);
    });
    editBtn.addEventListener('click', () => {
        onEditClick(item)
    });

    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(editBtn);
    return buttonsContainer;
}

function onEditClick(item) {
    openDialog(item);
}

function onCreateClick() {
    openDialog();
}

function onRemoveClick(itemId) {
    const confirmation = confirm("Are you sure you want to delete whit item?");
    if (!confirmation) return;
    deleteProduct(itemId);
    appendItems();
}

ui.addItemButton?.addEventListener('click', onCreateClick);


appendItems();