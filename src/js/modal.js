//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  getWishlist,
  getCart,
  addToCart,
  removeFromCart,
  isInCart
} from './storage';

import { refs } from './refs.js';
import { fetchProductsById } from './products-api';
import { renderProductInModal } from './render-function';

const updateNavCount = () => {
  const wishlist = getWishlist();
  refs.navCount.textContent = wishlist.length;
};

const updateNavCountCart = () => {
  const cart = getCart();
  refs.navCountCart.textContent = cart.length;
};

const updateWishlistButton = (productId) => {
  if (isInWishlist(productId)) {
    refs.wishButton.textContent = 'Remove from Wishlist';
  } else {
    refs.wishButton.textContent = 'Add to Wishlist';
  }
};


const updateCartButton = (productId) => {
  if (isInCart(productId)) {
    refs.cartButton.textContent = 'Remove from Cart';
  } else {
    refs.cartButton.textContent = 'Add to Cart';
  }
};


refs.productsList.addEventListener("click", async (event) => {
  const productItem = event.target.closest("li.products__item");
  if (!productItem) return;

  const productId = productItem.dataset.id;
  if (!productId) return;

  try {
    const product = await fetchProductsById(productId);

    renderProductInModal(product);

    refs.modal.classList.add("modal--is-open");

    updateWishlistButton(productId);
    updateCartButton(productId);


    refs.wishButton.onclick = () => {
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
      updateWishlistButton(productId);
      updateNavCount();
    };

    refs.cartButton.onclick = () => {
      if (isInCart(productId)) {
        removeFromCart(productId);
      } else {
        addToCart(productId);
      }
      updateCartButton(productId);
      updateNavCountCart();
    };

  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});