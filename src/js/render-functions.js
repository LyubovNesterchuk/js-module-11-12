
// render-functions.js
import { refs } from "./refs.js";

export function renderCategories(categories) {
  const markup = categories
    .map(cat => `
      <li class="categories__item">
        <button class="categories__btn" type="button">${cat}</button>
      </li>
    `)
    .join("");

  refs.categoriesList.innerHTML = markup;
}

export function renderProducts(products) {
  const markup = products
    .map(({ id, title, thumbnail, brand, category, price, quantity }) => `
      <li class="products__item" data-id="${id}">
        <img class="products__image" src="${thumbnail}" alt="${title}" />
        <p class="products__title">${title}</p>
        <p class="products__brand">
          <span class="products__brand--bold">Brand:</span> ${brand}
        </p>
        <p class="products__category">Category: ${category}</p>
        <p class="products__price">Price: $${price}</p>
        <div class="product" data-id="${id}">
          <div class="product-quantity ${quantity ? '' : 'hidden'}">
             <button class="minus-button quantity-button">-</button>
             <input type="number" value="${quantity || 1}" min="1" max="100" class="quantity-input" readonly>
             <button class="plus-button quantity-button">+</button>
            </div>
        </div>
      </li>
    `)
    .join("");

  refs.productsList.innerHTML = markup;
}

export function showNotFound() {
  refs.notFoundDiv.classList.add('not-found--visible');
}

export function hideNotFound() {
  refs.notFoundDiv.classList.remove('not-found--visible');
}

export function renderProductInModal(product) {
  const { title, description, price, thumbnail, tags = [] } = product;
  const tagsMarkup = tags.map(tag => `<li>#${tag}</li>`).join('');

  refs.modalProduct.innerHTML = `
    <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>
      <ul class="modal-product__tags">${tagsMarkup}</ul>
      <p class="modal-product__description">${description}</p>
      <p class="modal-product__shipping-information">Shipping: Free worldwide</p>
      <p class="modal-product__return-policy">Return Policy: 30 days</p>
      <p class="modal-product__price">Price: $${price}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;
}

// Обробка кнопок +/- в модальному вікні
refs.modal?.addEventListener("click", (event) => {
  const isMinus = event.target.classList.contains("minus-button");
  const isPlus = event.target.classList.contains("plus-button");

  if (!isMinus && !isPlus) return;

  const quantityInput = event.target
    .closest(".product-quantity")
    ?.querySelector(".quantity-input");

  if (!quantityInput) return;

  let value = parseInt(quantityInput.value);

  if (isMinus && value > 1) {
    quantityInput.value = value - 1;
  }
  if (isPlus && value < 100) {
    quantityInput.value = value + 1;
  }
});