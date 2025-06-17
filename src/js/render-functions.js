//Функцію для створення, рендеру або видалення розмітки

export function renderCategories(categories, container) {
  const markup = categories
    .map(cat => {
      return `<li class="categories__item">
        <button class="categories__btn" type="button">${cat.name}</button>
      </li>`;
    })
    .join('');
  container.innerHTML = markup;
}

export function renderProducts(products, container) {
  const markup = products
    .map(
      ({ id, title, thumbnail, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
      <img class="products__image" src="${thumbnail}" alt="${title}" />
      <p class="products__title">${title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand}</p>
      <p class="products__category">Category: ${category}</p>
      <p class="products__price">Price: $${price}</p>
    </li>`
    )
    .join('');
  container.innerHTML = markup;
}

export function showNotFound(block) {
  block.classList.add('not-found--visible');
}

export function hideNotFound(block) {
  block.classList.remove('not-found--visible');
}


