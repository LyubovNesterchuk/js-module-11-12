
export const refs = {
  categoriesList: document.querySelector('ul.categories'),
  categoryButtons: () => document.querySelectorAll('button.categories__btn'),

  productsList: document.querySelector('ul.products'),
  notFoundDiv: document.querySelector('.not-found'),

  searchForm: document.querySelector('.search-form'),

  modal: document.querySelector('.modal'),
  modalProduct: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  wishButton: document.querySelector('.modal-product__btn--wishlist'),
  cartButton: document.querySelector('.modal-product__btn--cart'),

  navCount: document.querySelector('[data-wishlist-count]'),
  navCountCart: document.querySelector('[data-cart-count]'),

  cartCount: document.querySelector('[data-count]'),
  cartPrice: document.querySelector('[data-price]'),
  cartSummaryButton: document.querySelector('.cart-summary__btn'),

  loader: document.querySelector('.loader'),
  themeToggle: document.querySelector('.theme-toggle'),
  minusButton: document.querySelector('.minus-button'),
  plusButton: document.querySelector('.plus-button'),
  quantityInput: document.querySelector('.quantity-input'),

  paginationContainer: document.querySelector('.tui-pagination'),
};