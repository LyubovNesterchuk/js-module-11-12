//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
export function openModal(modal) {
  modal.classList.add('modal--is-open');
}

export function closeModal(modal) {
  modal.classList.remove('modal--is-open');
}

export function renderModalContent(product, container) {
  const { title, description, price, thumbnail, tags = [] } = product;
  const tagsMarkup = tags.map(tag => `<li>#${tag}</li>`).join('');
  container.innerHTML = `
    <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>
      <ul class="modal-product__tags">${tagsMarkup}</ul>
      <p class="modal-product__description">${description}</p>
      <p class="modal-product__shipping-information">Shipping: Free worldwide</p>
      <p class="modal-product__return-policy">Return Policy: 30 days</p>
      <p class="modal-product__price">Price: $${price}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>`;
}


// import { fetchProductById } from './products-api.js';
// import { renderModalContent } from './render-functions.js';
// import { loadFromStorage, saveToStorage } from './storage.js';
// import { refs } from './refs.js';

// export async function openModal(productId) {
//   const product = await fetchProductById(productId);
//   renderModalContent(product, refs.modalContent);
//   refs.modal.classList.add('modal--is-open');

//   const cart = loadFromStorage('cart');
//   const wishlist = loadFromStorage('wishlist');

//   const cartBtn = refs.cartBtn;
//   const wishlistBtn = refs.wishlistBtn;

//   const isInCart = cart.includes(productId);
//   const isInWishlist = wishlist.includes(productId);

//   cartBtn.textContent = isInCart ? 'Remove from Cart' : 'Add to Cart';
//   wishlistBtn.textContent = isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist';

//   cartBtn.onclick = () => {
//     const updated = toggleInStorage('cart', productId);
//     cartBtn.textContent = updated ? 'Remove from Cart' : 'Add to Cart';
//   };

//   wishlistBtn.onclick = () => {
//     const updated = toggleInStorage('wishlist', productId);
//     wishlistBtn.textContent = updated ? 'Remove from Wishlist' : 'Add to Wishlist';
//   };

//   document.addEventListener('keydown', escHandler);
//   refs.modal.addEventListener('click', backdropHandler);
// }

// function toggleInStorage(key, id) {
//   const data = loadFromStorage(key);
//   const index = data.indexOf(id);
//   if (index > -1) {
//     data.splice(index, 1);
//     saveToStorage(key, data);
//     return false;
//   } else {
//     data.push(id);
//     saveToStorage(key, data);
//     return true;
//   }
// }

// function escHandler(e) {
//   if (e.key === 'Escape') closeModal();
// }

// function backdropHandler(e) {
//   if (e.target.classList.contains('modal')) closeModal();
// }

// export function closeModal() {
//   refs.modal.classList.remove('modal--is-open');
//   document.removeEventListener('keydown', escHandler);
//   refs.modal.removeEventListener('click', backdropHandler);
// }

// export function renderModalContent(product, container) {
//   const { title, description, price, thumbnail, tags = [] } = product;
//   const tagsMarkup = tags.map(tag => `<li>#${tag}</li>`).join('');
//   container.innerHTML = `
//     <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
//     <div class="modal-product__content">
//       <p class="modal-product__title">${title}</p>
//       <ul class="modal-product__tags">${tagsMarkup}</ul>
//       <p class="modal-product__description">${description}</p>
//       <p class="modal-product__shipping-information">Shipping: Free worldwide</p>
//       <p class="modal-product__return-policy">Return Policy: 30 days</p>
//       <p class="modal-product__price">Price: $${price}</p>
//       <button class="modal-product__buy-btn" type="button">Buy</button>
//     </div>`;
// }


// import { fetchProductById } from './products-api.js';
// import { refs } from './refs.js';
// import { renderProductCard } from './render-functions.js';
// import { toggleInStorage, getCart, getWishlist } from './storage.js';
// import { updateCounters } from './helpers.js';

// export async function openModal(id) {
//   const p = await fetchProductById(id);
//   refs.modalContent.innerHTML = `
//     <img src="${p.thumbnail}" alt="${p.title}">
//     <h2>${p.title}</h2>
//     <p>${p.description}</p>
//     <span>Price: $${p.price}</span>
//     <button class="btn-cart">${getCart().includes(id) ? 'Remove from Cart' : 'Add to Cart'}</button>
//     <button class="btn-wish">${getWishlist().includes(id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
//   `;
//   refs.modal.classList.add('modal--is-open');

//   refs.modal.querySelector('.btn-cart').onclick = () => {
//     const added = toggleInStorage('cart', id);
//     refs.modal.querySelector('.btn-cart').textContent = added ? 'Remove from Cart' : 'Add to Cart';
//     updateCounters();
//   };
//   refs.modal.querySelector('.btn-wish').onclick = () => {
//     const added = toggleInStorage('wishlist', id);
//     refs.modal.querySelector('.btn-wish').textContent = added ? 'Remove from Wishlist' : 'Add to Wishlist';
//     updateCounters();
//   };

//   document.addEventListener('keydown', escHandler);
//   refs.modal.addEventListener('click', backdropHandler);
// }

// export function closeModal() {
//   refs.modal.classList.remove('modal--is-open');
//   document.removeEventListener('keydown', escHandler);
//   refs.modal.removeEventListener('click', backdropHandler);
// }

// function escHandler(e) { if (e.key === 'Escape') closeModal(); }
// function backdropHandler(e) { if (e.target.classList.contains('modal')) closeModal(); }