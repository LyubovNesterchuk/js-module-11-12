
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsById,
  searchProducts,
  fetchTotalProductsCount
} from "./js/products-api.js";
import {
  renderCategories,
  renderProducts,
  renderProductInModal
} from "./js/render-functions.js";
import { refs } from "./js/refs.js";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  getWishlist,
  getCart,
  addToCart,
  removeFromCart,
  isInCart
} from './js/storage.js';
import {
  resetPagination,
  initPagination,
  loadProductsByPage,
  changeTheme
} from "./js/helpers.js";

let currentPage = 1;
const limit = 12;

const updateNavCount = () => {
  const wishlist = getWishlist();
  if (refs.navCount) {
    refs.navCount.textContent = wishlist.length;
  }
};

const updateNavCountCart = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (refs.navCountCart) {
    refs.navCountCart.textContent = totalQuantity;
  }
};

const updateWishlistButton = (productId) => {
  if (refs.wishButton) {
    refs.wishButton.textContent = isInWishlist(productId)
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
  }
};

const updateCartButton = (productId) => {
  if (refs.cartButton) {
    refs.cartButton.textContent = isInCart(productId)
      ? 'Remove from Cart'
      : 'Add to Cart';
  }
};


document.addEventListener("DOMContentLoaded", async () => {
  if (refs.loader) refs.loader.style.display = 'block';

  try {

    changeTheme();

    const categories = await fetchCategories();
    renderCategories(categories);


    const products = await fetchProducts(currentPage, limit);
    renderProducts(products);

    updateNavCount();
    updateNavCountCart();


    const totalItems = await fetchTotalProductsCount();
    initPagination(totalItems);

  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    if (refs.loader) refs.loader.style.display = 'none';
  }
});


refs.categoriesList?.addEventListener("click", async (event) => {
  const button = event.target.closest("button.categories__btn");
  if (!button) return;

  if (refs.loader) refs.loader.style.display = 'block';

  const category = button.textContent.trim();
  resetPagination(category);


  refs.categoryButtons().forEach(btn => btn.classList.remove("categories__btn--active"));
  button.classList.add("categories__btn--active");

  if (refs.searchInput) refs.searchInput.value = '';
  if (refs.clearSearchBtn) refs.clearSearchBtn.classList.add('hidden');
  if (refs.notFoundDiv) refs.notFoundDiv.classList.remove('not-found--visible');

  try {
    let products;
    if (category === "All") {
      products = await fetchProducts(1, limit);
    } else {
      products = await fetchProductsByCategory(category, 1, limit);
    }

    if (products.length === 0) {
      if (refs.notFoundDiv) refs.notFoundDiv.classList.add('not-found--visible');
      refs.productsList.innerHTML = '';
      if (refs.paginationContainer) refs.paginationContainer.style.display = 'none';
    } else {
      if (refs.notFoundDiv) refs.notFoundDiv.classList.remove('not-found--visible');
      renderProducts(products);
      if (refs.paginationContainer) refs.paginationContainer.style.display = 'flex';
    }
  } catch (error) {
    console.error('Error loading category:', error);
  } finally {
    if (refs.loader) refs.loader.style.display = 'none';
  }
});


refs.productsList?.addEventListener("click", async (event) => {
  const target = event.target;
  const productItem = target.closest("li.products__item");
  if (!productItem) return;

  const productId = Number(productItem.dataset.id);
  if (!productId) return;

  if (refs.loader) refs.loader.style.display = 'block';

  try {
    const product = await fetchProductsById(productId);
    renderProductInModal(product);
    if (refs.modal) refs.modal.classList.add("modal--is-open");

    updateWishlistButton(productId);
    updateCartButton(productId);


    if (refs.wishButton) {
      refs.wishButton.onclick = () => {
        isInWishlist(productId)
          ? removeFromWishlist(productId)
          : addToWishlist(productId);
        updateWishlistButton(productId);
        updateNavCount();
      };
    }


    if (refs.cartButton) {
      refs.cartButton.onclick = () => {
        isInCart(productId)
          ? removeFromCart(productId)
          : addToCart(productId);
        updateCartButton(productId);
        updateNavCountCart();
      };
    }
  } catch (error) {
    console.error('Error loading product:', error);
  } finally {
    if (refs.loader) refs.loader.style.display = 'none';
  }
});

refs.modal?.addEventListener("click", (event) => {
  if (event.target === refs.modal || event.target.classList.contains("modal__close-btn")) {
    refs.modal.classList.remove("modal--is-open");
  }
});


refs.searchForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = refs.searchInput?.value.trim();
  if (!query) return;

  if (refs.loader) refs.loader.style.display = 'block';

  try {
    const products = await searchProducts(query, currentPage, limit);

    if (products.length === 0) {
      if (refs.notFoundDiv) refs.notFoundDiv.classList.add('not-found--visible');
      refs.productsList.innerHTML = '';
      if (refs.loadButton) refs.loadButton.style.display = 'none';
    } else {
      if (refs.notFoundDiv) refs.notFoundDiv.classList.remove('not-found--visible');
      renderProducts(products);
    }
  } catch (error) {
    console.error('Error searching products:', error);
    if (refs.notFoundDiv) refs.notFoundDiv.classList.add('not-found--visible');
    refs.productsList.innerHTML = '';
  } finally {
    if (refs.loader) refs.loader.style.display = 'none';
  }
});


refs.searchInput?.addEventListener('input', () => {
  if (refs.clearSearchBtn) {
    refs.clearSearchBtn.classList.toggle('hidden', refs.searchInput.value.trim() === '');
  }
});


refs.clearSearchBtn?.addEventListener("click", async () => {
  if (refs.searchInput) refs.searchInput.value = '';
  if (refs.clearSearchBtn) refs.clearSearchBtn.classList.add('hidden');
  if (refs.notFoundDiv) refs.notFoundDiv.classList.remove('not-found--visible');
  if (refs.loader) refs.loader.style.display = 'block';

  try {
    const products = await fetchProducts(1, limit);
    renderProducts(products);
    if (refs.loadButton) refs.loadButton.style.display = 'block';
  } catch (error) {
    console.error('Error loading all products:', error);
    refs.productsList.innerHTML = '';
    if (refs.notFoundDiv) refs.notFoundDiv.classList.add('not-found--visible');
  } finally {
    if (refs.loader) refs.loader.style.display = 'none';
  }
});


const scrollUpButton = document.querySelector('.scroll-up');
if (scrollUpButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 250) {
      scrollUpButton.classList.remove('hidden');
    } else {
      scrollUpButton.classList.add('hidden');
    }
  });

  scrollUpButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
