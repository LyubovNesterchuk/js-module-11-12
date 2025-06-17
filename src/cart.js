//Логіка сторінки Cart

// import { refs } from './js/refs.js';
// import { getCart } from './js/storage.js';
// import { getProductsByIds } from './js/products-api.js';
// import { renderProductCard, updateCartSummary } from './js/render-functions.js';
// import { openModal } from './js/modal.js';
// import { updateCounters } from './js/helpers.js';
// import iziToast from 'izitoast';

// async function init() {
//   const ids = getCart();
//   if (!ids.length) { refs.productsList.innerHTML = `<p>Your cart is empty</p>`; return; }
//   const prods = await getProductsByIds(ids);
//   refs.productsList.innerHTML = prods.map(renderProductCard).join('');
//   updateCartSummary(prods);
// }

// refs.productsList.addEventListener('click', e => {
//   const li = e.target.closest('li.products__item');
//   if (!li) return;
//   openModal(+li.dataset.id).then(updateCounters);
// });

// refs.buyBtn?.addEventListener('click', () => {
//   iziToast.success({ message: 'Purchase successful!' });
// });

// init();


// import { getProductsByIds } from './js/products-api.js';
// import { loadFromStorage } from './js/storage.js';
// import { renderProducts, updateCartSummary } from './js/render-functions.js';
// import { openModal } from './js/modal.js';
// import { refs } from './js/refs.js';
// import iziToast from 'izitoast';

// const cartIds = loadFromStorage('cart');

// if (cartIds.length) {
//   getProductsByIds(cartIds).then(products => {
//     renderProducts(products, refs.productsList);
//     updateCartSummary(products);
//   });
// } else {
//   refs.productsList.innerHTML = '<p class="not-found">Cart is empty</p>';
// }

// refs.productsList.addEventListener('click', event => {
//   const productId = event.target.closest('[data-id]')?.dataset.id;
//   if (productId) openModal(productId);
// });

// refs.buyBtn?.addEventListener('click', () => {
//   iziToast.success({ message: 'Products purchased successfully!' });
// });






















//  import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const cartKey = 'cart';

// const productsList = document.querySelector('.products');
// const notFound = document.querySelector('.not-found');
// const countElem = document.querySelector('[data-count]');
// const priceElem = document.querySelector('[data-price]');
// const buyBtn = document.querySelector('.cart-summary__btn');

// function getCart() {
//   const data = localStorage.getItem(cartKey);
//   return data ? JSON.parse(data) : [];
// }

// function setCart(cart) {
//   localStorage.setItem(cartKey, JSON.stringify(cart));
// }

// // Завантажуємо продукти по ID
// async function fetchProductsByIds(ids) {
//   if (!ids.length) return [];
//   const requests = ids.map(id =>
//     fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
//   );
//   return Promise.all(requests);
// }

// function renderProducts(products) {
//   if (products.length === 0) {
//     productsList.innerHTML = '';
//     notFound.style.display = 'block';
//     return;
//   }
//   notFound.style.display = 'none';

//   const markup = products
//     .map(
//       product => `
//     <li class="product" data-id="${product.id}">
//       <img src="${product.thumbnail}" alt="${product.title}" />
//       <h3>${product.title}</h3>
//       <p>$${product.price}</p>
//       <button class="btn-details" data-id="${product.id}">Details</button>
//     </li>
//   `
//     )
//     .join('');
//   productsList.innerHTML = markup;
// }

// function updateCartSummary(products) {
//   const totalCount = products.length;
//   const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

//   countElem.textContent = totalCount;
//   priceElem.textContent = `$${totalPrice.toFixed(2)}`;
// }

// function updateCounters() {
//   // Припускаю, що в header є span з data-cart-count і data-wishlist-count
//   const cartCountElem = document.querySelector('[data-cart-count]');
//   const wishlistCountElem = document.querySelector('[data-wishlist-count]');
//   const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//   const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
//   if (cartCountElem) cartCountElem.textContent = cart.length;
//   if (wishlistCountElem) wishlistCountElem.textContent = wishlist.length;
// }

// // Обробник кнопки Buy products
// buyBtn.addEventListener('click', () => {
//   const cart = getCart();
//   if (cart.length === 0) {
//     iziToast.warning({
//       title: 'Warning',
//       message: 'Your cart is empty!',
//     });
//     return;
//   }

//   // Покупка пройшла успішно — очищуємо кошик
//   localStorage.removeItem(cartKey);
//   renderProducts([]);
//   updateCartSummary([]);
//   iziToast.success({
//     title: 'Success',
//     message: 'Thank you for your purchase!',
//   });
//   updateCounters();
// });

// // Відкриття модального вікна з деталями продукту (приклад, потрібно адаптувати під свій modal.js)
// productsList.addEventListener('click', e => {
//   if (!e.target.classList.contains('btn-details')) return;
//   const productId = Number(e.target.dataset.id);
//   // Відкрити модалку і передати туди productId
//   openModal(productId);
// });

// // Функції для роботи з кошиком (додавання/видалення)
// export function addToCart(id) {
//   const cart = getCart();
//   if (!cart.includes(id)) {
//     cart.push(id);
//     setCart(cart);
//     updateCounters();
//   }
// }

// export function removeFromCart(id) {
//   let cart = getCart();
//   cart = cart.filter(item => item !== id);
//   setCart(cart);
//   updateCounters();
// }

// // Функція ініціалізації сторінки
// async function init() {
//   const cartIds = getCart();
//   if (cartIds.length === 0) {
//     renderProducts([]);
//     updateCartSummary([]);
//     updateCounters();
//     return;
//   }
//   const products = await fetchProductsByIds(cartIds);
//   renderProducts(products);
//   updateCartSummary(products);
//   updateCounters();
// }

// init();

// // Приклад відкриття модального вікна (треба реалізувати/імпортувати)
// const modal = document.querySelector('.modal');
// const modalProductContainer = modal.querySelector('.modal-product');
// const btnWishlist = modal.querySelector('.modal-product__btn--wishlist');
// const btnCart = modal.querySelector('.modal-product__btn--cart');

// let currentProductId = null;

// async function openModal(productId) {
//   currentProductId = productId;

//   // Отримуємо дані продукту (приклад API)
//   try {
//     const res = await fetch(`https://dummyjson.com/products/${productId}`);
//     if (!res.ok) throw new Error('Failed to fetch product');
//     const product = await res.json();

//     // Заповнюємо контент модалки
//     modalProductContainer.innerHTML = `
//       <h2>${product.title}</h2>
//       <img src="${product.thumbnail}" alt="${product.title}" />
//       <p>${product.description}</p>
//       <p>Price: $${product.price}</p>
//     `;

//     // Оновлюємо кнопки за даними localStorage
//     updateModalButtons();

//     // Відкриваємо модалку
//     modal.style.display = 'block';

//   } catch (error) {
//     console.error(error);
//     // Можна показати повідомлення користувачу
//   }
// }

// function updateModalButtons() {
//   const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//   const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

//   btnCart.textContent = cart.includes(currentProductId) ? 'Remove from Cart' : 'Add to Cart';
//   btnWishlist.textContent = wishlist.includes(currentProductId) ? 'Remove from Wishlist' : 'Add to Wishlist';
// }