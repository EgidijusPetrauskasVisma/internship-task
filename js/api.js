export const fetchCategories = async () =>
    fetch(`http://localhost:3000/categories`).then(response => response.json());

export const fetchFeaturedProducts = (categoryId) =>
    fetch(`http://localhost:3000/items?categoryId=${categoryId}`).then(response => response.json());

export const fetchCarouselProducts = () =>
    fetch(`http://localhost:3000/items?flag=1`).then(response => response.json());
