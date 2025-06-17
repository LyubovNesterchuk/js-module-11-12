// Функції, які передаються колбеками в addEventListners

// import { renderProducts, clearProducts, showNotFound, hideNotFound, showLoadMore, showEndMessage } from './render-functions.js';
// import { fetchProducts, fetchProductsByCategory, fetchProductsBySearch } from './products-api.js';
// import { openModal } from './modal.js';
// import { PAGE_LIMIT } from './constants.js';
// import { refs } from './refs.js';

// export async function handleCategoryClick(e, state) {
//   if (e.target.tagName !== 'BUTTON') return;
//   state.selectedCategory = e.target.textContent;
//   state.currentPage = 1;
//   clearProducts();
//   await loadAndRender(state);
// }

// export async function handleProductClick(e) {
//   const li = e.target.closest('li.products__item');
//   if (!li) return;
//   openModal(+li.dataset.id);
// }

// export async function handleLoadMoreClick(state) {
//   state.currentPage++;
//   await loadAndRender(state, true);
// }

// export async function handleSearchSubmit(e, state) {
//   e.preventDefault();
//   const q = refs.searchInput.value.trim();
//   if (!q) return;
//   state.searchQuery = q; state.currentPage = 1; clearProducts();
//   await loadAndRender(state);
// }

// export async function loadAndRender(state, append = false) {
//   let data;
//   if (state.searchQuery) data = await fetchProductsBySearch(state.searchQuery, state.currentPage);
//   else if (state.selectedCategory && state.selectedCategory !== 'All')
//     data = await fetchProductsByCategory(state.selectedCategory, state.currentPage);
//   else data = await fetchProducts(state.currentPage);

//   const prods = data.products;
//   if (!prods.length && !append) return showNotFound();

//   hideNotFound();
//   renderProducts(prods, refs.productsList);
//   const hasMore = prods.length === PAGE_LIMIT;
//   showLoadMore(hasMore);
//   if (!hasMore) showEndMessage();
// }












// import {
//     fetchAllProducts,
//     fetchCategories,
//     fetchProductsByCategory,
//     fetchProductById,
//     searchProducts
//   } from './products-api.js';
  
//   import {
//     renderCategories,
//     renderProducts,
//     renderModalProduct
//   } from './render-functions.js';
  
//   import { refs } from './refs.js';
//   import { openModal } from './modal.js';
  
//   export async function handleHomeLoad() {
//     const categories = await fetchCategories();
//     categories.unshift('All');
//     refs.categoryList.innerHTML = renderCategories(categories);
  
//     const { products } = await fetchAllProducts();
//     refs.productList.innerHTML = renderProducts(products);
//   }
  
//   export async function handleCategoryClick(e) {
//     if (!e.target.classList.contains('categories__btn')) return;
//     const category = e.target.textContent;
  
//     const allBtns = document.querySelectorAll('.categories__btn');
//     allBtns.forEach(btn => btn.classList.remove('categories__btn--active'));
//     e.target.classList.add('categories__btn--active');
  
//     const data = category === 'All'
//       ? await fetchAllProducts()
//       : await fetchProductsByCategory(category);
  
//     if (!data.products.length) {
//       refs.productList.innerHTML = '';
//       refs.notFound.classList.add('not-found--visible');
//     } else {
//       refs.notFound.classList.remove('not-found--visible');
//       refs.productList.innerHTML = renderProducts(data.products);
//     }
//   }
  
//   export async function handleProductClick(e) {
//     const item = e.target.closest('li.products__item');
//     if (!item) return;
//     const id = item.dataset.id;
//     const product = await fetchProductById(id);
//     refs.modalContent.innerHTML = renderModalProduct(product);
//     openModal();
//   }
  
//   export async function handleSearchSubmit(e) {
//     e.preventDefault();
//     const query = refs.searchInput.value.trim();
//     if (!query) return;
  
//     const data = await searchProducts(query);
//     if (!data.products.length) {
//       refs.productList.innerHTML = '';
//       refs.notFound.classList.add('not-found--visible');
//     } else {
//       refs.notFound.classList.remove('not-found--visible');
//       refs.productList.innerHTML = renderProducts(data.products);
//     }
//   }
  
//   export async function handleClearSearch() {
//     refs.searchInput.value = '';
//     const { products } = await fetchAllProducts();
//     refs.productList.innerHTML = renderProducts(products);
//     refs.notFound.classList.remove('not-found--visible');
// }
  





// import { fetchProductsByCategory } from '../api/products';
// import { renderProducts } from './renderProducts';

// export async function handleCategoryClick(e) {
//   const btn = e.target.closest('.categories__btn');
//   if (!btn) return;

//   document.querySelectorAll('.categories__btn').forEach(el =>
//     el.classList.remove('categories__btn--active')
//   );
//   btn.classList.add('categories__btn--active');

//   const category = btn.textContent.trim();
//   let products;
//   if (category === 'All') {
//     products = await fetchProducts();
//   } else {
//     products = await fetchProductsByCategory(category);
//   }

//   renderProducts(products.products || []);
//   toggleNotFound(products.products?.length === 0);
// }




// export async function handleProductClick(e) {
//     const li = e.target.closest('.products__item');
//     if (!li) return;
  
//     const id = li.dataset.id;
//     const product = await fetchProductById(id);
//     renderModal(product);
// }
  


