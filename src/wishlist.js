//Логіка сторінки Wishlist

// import { refs } from './js/refs.js';
// import { getWishlist } from './js/storage.js';
// import { getProductsByIds } from './js/products-api.js';
// import { renderProductCard } from './js/render-functions.js';
// import { openModal } from './js/modal.js';
// import { updateCounters } from './js/helpers.js';

// async function init() {
//   const ids = getWishlist();
//   if (!ids.length) { refs.productsList.innerHTML = `<p>Your wishlist is empty</p>`; return; }
//   const prods = await getProductsByIds(ids);
//   refs.productsList.innerHTML = prods.map(renderProductCard).join('');
// }

// refs.productsList.addEventListener('click', e => {
//   const li = e.target.closest('li.products__item');
//   if (!li) return;
//   openModal(+li.dataset.id).then(updateCounters);
// });

// init();


// import { getWishlist } from './js/storage.js';
// import { getProductById } from './js/products-api.js';
// import { renderProductCard } from './js/render-functions.js';
// import { openModal } from './js/modal.js';
// import { refs } from './js/refs.js';

// // Рендеримо товари списку бажаного
// async function renderWishlistPage() {
//   const ids = getWishlist();
//   if (!ids.length) {
//     refs.productsList.innerHTML = '<p class="not-found">Your wishlist is empty.</p>';
//     return;
//   }

//   const products = await Promise.all(ids.map(id => getProductById(id)));
//   refs.productsList.innerHTML = products.map(renderProductCard).join('');
// }

// renderWishlistPage();

// // Обробка кліку на товар
// refs.productsList.addEventListener('click', e => {
//   const li = e.target.closest('li[data-id]');
//   if (!li) return;
//   openModal(li.dataset.id);
// });