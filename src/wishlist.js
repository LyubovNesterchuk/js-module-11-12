// wishlist.js
import { fetchProductsById } from "./js/products-api.js";
import { renderProducts, renderProductInModal } from "./js/render-functions.js";
import { refs } from "./js/refs.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  addToCart,
  isInCart,
  removeFromCart,
  getCart
} from "./js/storage.js";
import { changeTheme } from "./js/helpers.js";



const updateNavCount = () => {
  const wishlist = getWishlist();
  const navCount = document.querySelector('[data-wishlist-count]');
  if (navCount) {
    navCount.textContent = wishlist.length;
  }
  console.log('Wishlist count updated:', wishlist.length);
};

const updateNavCountCart = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const navCountCart = document.querySelector('[data-cart-count]');
  if (navCountCart) {
    navCountCart.textContent = totalQuantity;
  }
  console.log('Cart count updated:', totalQuantity);
};



const updateWishlistButton = (productId) => {
  const wishButton = document.querySelector('.modal-product__btn--wishlist');
  if (!wishButton) return;

  const id = Number(productId);
  if (isInWishlist(id)) {
    wishButton.textContent = 'Remove from Wishlist';
  } else {
    wishButton.textContent = 'Add to Wishlist';
  }
};

const updateCartButton = (productId) => {
  const cartButton = document.querySelector('.modal-product__btn--cart');
  if (!cartButton) return;

  const id = Number(productId);
  if (isInCart(id)) {
    cartButton.textContent = "Remove from Cart";
  } else {
    cartButton.textContent = "Add to Cart";
  }
};


const loadWishlistProducts = async () => {
  const productsList = document.querySelector('ul.products');
  const notFoundDiv = document.querySelector('.not-found');
  const wishlist = getWishlist();

  console.log('Loading wishlist products:', wishlist);

  if (wishlist.length === 0) {
    if (notFoundDiv) notFoundDiv.classList.add('not-found--visible');
    if (productsList) productsList.innerHTML = '';
    return;
  }

  try {
    const productPromises = wishlist.map(id => fetchProductsById(id));
    const products = await Promise.all(productPromises);

    console.log('Products loaded:', products);

    if (notFoundDiv) notFoundDiv.classList.remove('not-found--visible');
    renderProducts(products);
  } catch (error) {
    console.error('Помилка при завантаженні wishlist:', error);
    if (notFoundDiv) notFoundDiv.classList.add('not-found--visible');
    if (productsList) productsList.innerHTML = '';
  }
};


document.addEventListener("click", async (event) => {
  const productsList = document.querySelector('ul.products');

  const productItem = event.target.closest("li.products__item");
  if (productItem && productsList && productsList.contains(productItem)) {
    const productId = Number(productItem.dataset.id);
    if (!productId) return;

    try {
      const product = await fetchProductsById(productId);
      renderProductInModal(product);

      const modal = document.querySelector('.modal');
      if (modal) modal.classList.add("modal--is-open");

      updateWishlistButton(productId);
      updateCartButton(productId);

      setTimeout(() => {
        const wishButton = document.querySelector('.modal-product__btn--wishlist');
        if (wishButton) {
          wishButton.onclick = (e) => {
            e.stopPropagation();
            const id = Number(productId);

            if (isInWishlist(id)) {
              removeFromWishlist(id);
              console.log('Removed from wishlist:', id);
            } else {
              addToWishlist(id);
              console.log('Added to wishlist:', id);
            }

            updateWishlistButton(id);
            updateNavCount();
            loadWishlistProducts();
          };
        }

        const cartButton = document.querySelector('.modal-product__btn--cart');
        if (cartButton) {
          cartButton.onclick = (e) => {
            e.stopPropagation();
            const id = Number(productId);

            if (isInCart(id)) {
              removeFromCart(id);
              console.log('Removed from cart:', id);
            } else {
              addToCart(id, 1);
              console.log('Added to cart:', id);

              if (isInWishlist(id)) {
                removeFromWishlist(id);
                updateNavCount();
                loadWishlistProducts();
              }
            }

            updateCartButton(id);
            updateNavCountCart();
          };
        }
      }, 0);
    } catch (error) {
      console.error('Помилка при завантаженні продукту:', error);
    }
  }

  const modal = document.querySelector('.modal');
  if (modal && (event.target === modal || event.target.classList.contains("modal__close-btn"))) {
    modal.classList.remove("modal--is-open");
  }
});


window.addEventListener('storage', (e) => {
  if (e.key === 'wishlist') {
    console.log('Storage changed, reloading wishlist');
    loadWishlistProducts();
    updateNavCount();
  }
  if (e.key === 'cart') {
    updateNavCountCart();
  }
});


window.addEventListener('wishlistUpdated', () => {
  console.log('Wishlist updated event received');
  loadWishlistProducts();
  updateNavCount();
});

window.addEventListener('cartUpdated', () => {
  console.log('Cart updated event received');
  updateNavCountCart();
});


const initPage = () => {
  console.log('Initializing wishlist page...');

  changeTheme();
  loadWishlistProducts();
  updateNavCount();
  updateNavCountCart();

  console.log('Page initialized');
};

document.addEventListener('DOMContentLoaded', () => {
  initPage();
});


window.addEventListener('focus', () => {
  console.log('Page focused, reloading wishlist');
  loadWishlistProducts();
  updateNavCount();
  updateNavCountCart();
});