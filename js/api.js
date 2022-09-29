//@ts-check
export const fetchCategories = async () =>
    fetch(`http://localhost:3000/categories`).then(response => response.json());

export const fetchFeaturedProducts = (categoryId) =>
    fetch(`http://localhost:3000/items?categoryId=${categoryId}`).then(response => response.json());

export const fetchCarouselProducts = () =>
    fetch(`http://localhost:3000/items?flag=on`).then(response => response.json());

export const deleteProduct = (id) =>
    fetch(`http://localhost:3000/items/${id}`, { method: 'DELETE' })

export const createProduct = (body) =>
    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(Object.fromEntries(body))
    })

export const editProduct = (body, id) => {
    fetch(`http://localhost:3000/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(Object.fromEntries(body))
    })
}