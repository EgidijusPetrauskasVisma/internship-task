//@ts-check
import { createProduct, editProduct } from "./api.js";
import { appendItems } from "./items-section.js";

const ui = {
    /**@type {HTMLDialogElement | null} */
    itemDialog: document.querySelector('#item-dialog'),
    /**@type {HTMLFormElement | null} */
    itemDialogForm: document.querySelector('.item-dialog-form'),
    /**@type {HTMLHeadingElement | null} */
    itemDialogHeader: document.querySelector('.item-dialog-header'),
    cancelButton: document.querySelector('.cancel-btn'),
    formInputs: {
        /**@type {HTMLInputElement | null} */
        id: document.querySelector('input[name=id]'),
        /**@type {HTMLInputElement | null} */
        categoryId: document.querySelector('input[name=categoryId]'),
        /**@type {HTMLInputElement | null} */
        title: document.querySelector('input[name=title]'),
        /**@type {HTMLInputElement | null} */
        description: document.querySelector('input[name=description]'),
        /**@type {HTMLInputElement | null} */
        img: document.querySelector('input[name=img]'),
        /**@type {HTMLInputElement | null} */
        price: document.querySelector('input[name=price]'),
        /**@type {HTMLInputElement | null} */
        fuel: document.querySelector('#fuel'),
        /**@type {HTMLInputElement | null} */
        flag: document.querySelector('input[name=flag]')
    }
}

async function onSubmit() {
    const formData = new FormData(ui.itemDialogForm ?? undefined);
    const id = formData.get('id');
    if (id) {
        await editProduct(formData, id);
    } else {
        formData.delete('id');
        formData.set('categoryId', String(new URLSearchParams(window.location.search).get('category')));
        await createProduct(formData);
    }
    appendItems();
}

export function openDialog(editItemData = {}) {
    ui.itemDialog?.showModal();
    editHeader(editItemData);
    fillFormInputs(editItemData);
}

function editHeader(editItemData) {
    if (!ui.itemDialogHeader) return;
    if (Object.keys(editItemData).length === 0) {
        ui.itemDialogHeader.innerText = "CREATE NEW ITEM"
    } else {
        ui.itemDialogHeader.innerText = "EDIT ITEM"
    }
}

function fillFormInputs(itemData = {}) {
    const checkboxFields = ['flag'];
    Object.entries(ui.formInputs).forEach(([name, input]) => {
        if (!input) return;
        if (checkboxFields.includes(name)) {
            input.checked = itemData[name] === 'on';
        } else {
            input.value = itemData[name] || '';
        }
    })
}

ui.cancelButton?.addEventListener('click', () => {
    ui.itemDialog?.close();
})

ui.itemDialogForm?.addEventListener('submit', onSubmit);
