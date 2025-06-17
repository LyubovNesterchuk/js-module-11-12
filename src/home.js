//Логіка сторінки Home
import {
  fetchCategories,
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchProductsBySearch
} from './js/products-api.js';

import {
  renderCategories,
  renderProducts,
  showNotFound,
  hideNotFound
} from './js/render-functions.js';

import { renderModalContent, openModal, closeModal } from './js/modal.js';
import { refs } from './js/refs.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { PRODUCTS_LIMIT } from './js/constants.js';

// 🔁 Глобальні змінні стану
let currentPage = 1;
let currentCategory = 'All';
let isLoading = false;

// 🟩 1. Ініціалізація сторінки
initHome();

async function initHome() {
  try {
    // Отримуємо список категорій
    const categories = await fetchCategories();
    categories.unshift({ name: 'All' });
    renderCategories(categories, refs.categoriesList);

    // Показуємо першу сторінку всіх продуктів
    currentPage = 1;
    currentCategory = 'All';

    const data = await fetchProducts(currentPage);
    renderProducts(data.products, refs.productsList);
    hideNotFound(refs.notFoundBlock);

    toggleLoadMore(data.total > PRODUCTS_LIMIT);
  } catch (err) {
    iziToast.error({ message: 'Failed to initialize page', position: 'topRight' });
  }
}

// 🟨 2. Обробка кліку по категоріям
refs.categoriesList.addEventListener('click', onCategoryClick);

async function onCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  const selected = e.target.textContent;
  currentCategory = selected;
  currentPage = 1;

  // Стилізація активної кнопки
  
  const allBtns = refs.categoriesList.querySelectorAll('.categories__btn');
  allBtns.forEach(btn => btn.classList.remove('categories__btn--active'));
  
  const activeBtn = Array.from(allBtns).find(
    btn => btn.textContent.trim() === currentCategory
  );
  
  if (activeBtn) {
    activeBtn.classList.add('categories__btn--active');
  }

  try {
    let data;

    if (selected === 'All') {
      data = await fetchProducts(currentPage);
    } else {
      data = await fetchProductsByCategory(selected, currentPage);
    }

    if (!data.products.length) {
      refs.productsList.innerHTML = '';
      showNotFound(refs.notFoundBlock);
      toggleLoadMore(false);
    } else {
      renderProducts(data.products, refs.productsList);
      hideNotFound(refs.notFoundBlock);
      toggleLoadMore(data.total > PRODUCTS_LIMIT);
    }
  } catch {
    iziToast.error({ message: 'Failed to load category', position: 'topRight' });
  }
}

// 🟦 3. Load More - пагінація
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  if (isLoading) return;
  isLoading = true;
  refs.loadMoreBtn.disabled = true;
  currentPage += 1;
  
  try {
    let data;

    if (currentCategory === 'All') {
      data = await fetchProducts(currentPage);
    } else {
      data = await fetchProductsByCategory(currentCategory, currentPage);
    }
   

    // 🟥 Ховаємо кнопку
  
    if (!data.products.length || currentPage * PRODUCTS_LIMIT >= data.total) {
      toggleLoadMore(false);
      iziToast.info({ message: 'All products loaded', position: 'topRight' });
      return;   
    }
    
   
    const markup = data.products
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
    refs.productsList.insertAdjacentHTML('beforeend', markup);

    // 🔁 Перевірка після вставки
    if ((currentPage * PRODUCTS_LIMIT) >= data.total) {
      toggleLoadMore(false);
      iziToast.success({ message: 'All products loaded', position: 'topRight' });
    }
  } catch {
    iziToast.error({ message: 'Failed to load more products', position: 'topRight' });
  } finally {
    isLoading = false;
    refs.loadMoreBtn.disabled = false;
  }
}




// 🟥 4. Модалка
refs.productsList.addEventListener('click', onProductClick);

async function onProductClick(e) {
  const li = e.target.closest('li.products__item');
  if (!li) return;
  const id = li.dataset.id;

  try {
    const product = await fetchProductById(id);
    renderModalContent(product, refs.modalContent);
    openModal(refs.modal);
  } catch {
    iziToast.error({ message: 'Failed to load product info', position: 'topRight' });
  }
}

refs.modalCloseBtn.addEventListener('click', () => closeModal(refs.modal));

// 🟧 5. Пошук
refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  const query = refs.searchInput.value.trim();
  if (!query) return;

  currentCategory = 'Search';
  currentPage = 1;

  try {
    const data = await fetchProductsBySearch(query);

    if (!data.products.length) {
      refs.productsList.innerHTML = '';
      showNotFound(refs.notFoundBlock);
      toggleLoadMore(false);
    } else {
      renderProducts(data.products, refs.productsList);
      hideNotFound(refs.notFoundBlock);
      toggleLoadMore(data.total > PRODUCTS_LIMIT);
    }
  } catch {
    iziToast.error({ message: 'Failed to perform search', position: 'topRight' });
  }
}

// 🟨 6. Кнопка очищення інпуту
refs.searchClearBtn.addEventListener('click', async () => {
  refs.searchInput.value = '';
  currentPage = 1;
  currentCategory = 'All';
  const data = await fetchProducts(currentPage);
  renderProducts(data.products, refs.productsList);
  hideNotFound(refs.notFoundBlock);
  toggleLoadMore(data.total > PRODUCTS_LIMIT);
});

// 🟩 Допоміжна функція
function toggleLoadMore(shouldShow) {
  if (shouldShow) {
    refs.loadMoreBtn.classList.remove('visually-hidden');
  } else {
    refs.loadMoreBtn.classList.add('visually-hidden');
  }
}

