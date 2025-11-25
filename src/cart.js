// cart.js
import { fetchProductsById } from "./js/products-api.js";
import { renderProducts, renderProductInModal } from "./js/render-functions.js";
import { refs } from "./js/refs.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  isInCart,
  getWishlist,
  saveCart,
  updateCartItem,
  clearCart
} from "./js/storage.js";
import iziToast from "izitoast";
import { changeTheme } from "./js/helpers.js";


const updateNavCount = () => {
  const wishlist = getWishlist();
  if (refs.navCount) {
    refs.navCount.textContent = wishlist.length;
  }
};


const updateNavCountCart = () => {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (refs.navCountCart) {
    refs.navCountCart.textContent = totalCount;
  }
};


const updateCartButton = (productId) => {
  if (!refs.cartButton) return;

  const id = Number(productId);
  if (isInCart(id)) {
    refs.cartButton.textContent = 'Remove from Cart';
  } else {
    refs.cartButton.textContent = 'Add to Cart';
  }
};


const updateCartSummary = async () => {
  const cart = getCart();

  if (cart.length === 0) {
    if (refs.cartCount) refs.cartCount.textContent = "0";
    if (refs.cartPrice) refs.cartPrice.textContent = "$0.00";
    return;
  }

  const validCartItems = cart.filter(item => typeof item.id !== 'undefined');

  if (validCartItems.length === 0) {
    if (refs.cartCount) refs.cartCount.textContent = "0";
    if (refs.cartPrice) refs.cartPrice.textContent = "$0.00";
    return;
  }

  try {
    const products = await Promise.all(validCartItems.map(item => fetchProductsById(item.id)));

    const totalCount = validCartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (refs.cartCount) refs.cartCount.textContent = totalCount;

    const totalPrice = products.reduce((sum, product) => {
      const matchingItems = validCartItems.filter(i => Number(i.id) === Number(product.id));
      const quantity = matchingItems.reduce((qSum, i) => qSum + i.quantity, 0);
      return sum + product.price * quantity;
    }, 0);

    if (refs.cartPrice) refs.cartPrice.textContent = `$${totalPrice.toFixed(2)}`;
  } catch (error) {
    console.error('Помилка при оновленні підсумку кошика:', error);
    if (refs.cartCount) refs.cartCount.textContent = "0";
    if (refs.cartPrice) refs.cartPrice.textContent = "$0.00";
  }
};


const loadCartProducts = async () => {
  const cart = getCart();

  if (cart.length === 0) {
    if (refs.notFoundDiv) refs.notFoundDiv.classList.add('not-found--visible');
    refs.productsList.innerHTML = '';
    return;
  }

  const validCartItems = cart.filter(item => typeof item.id !== 'undefined');

  if (validCartItems.length === 0) {
    if (refs.notFoundDiv) refs.notFoundDiv.classList.add('not-found--visible');
    refs.productsList.innerHTML = '';
    return;
  }

  try {
    const products = await Promise.all(validCartItems.map(item => fetchProductsById(item.id)));

    const productsWithQuantity = products.map(product => {
      const cartItem = validCartItems.find(i => Number(i.id) === Number(product.id));
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : 1
      };
    });

    if (refs.notFoundDiv) refs.notFoundDiv.classList.remove('not-found--visible');
    renderProducts(productsWithQuantity);

    const quantityElements = document.querySelectorAll(".product-quantity");
    quantityElements.forEach(el => el.classList.remove("hidden"));
  } catch (error) {
    console.error('Помилка при завантаженні продуктів кошика:', error);
    if (refs.notFoundDiv) refs.notFoundDiv.classList.add('not-found--visible');
    refs.productsList.innerHTML = '';
  }
};

refs.productsList?.addEventListener("click", async (event) => {
  const target = event.target;


  if (target.classList.contains('quantity-button')) {
    return;
  }

  const productItem = target.closest("li.products__item");
  if (!productItem) return;

  const productId = Number(productItem.dataset.id);
  if (!productId) return;

  try {
    const product = await fetchProductsById(productId);
    renderProductInModal(product);
    if (refs.modal) refs.modal.classList.add("modal--is-open");

    updateCartButton(productId);

    if (refs.cartButton) {
      refs.cartButton.onclick = async () => {
        const id = Number(productId);

        if (isInCart(id)) {
          removeFromCart(id);
        } else {
          addToCart(id, 1);
        }

        updateCartButton(id);
        updateNavCountCart();
        await loadCartProducts();
        await updateCartSummary();
      };
    }
  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});


refs.cartSummaryButton?.addEventListener('click', async () => {
  const cart = getCart();

  if (cart.length === 0) {
    iziToast.warning({
      title: 'Oops!',
      message: 'Your cart is empty!',
      position: "topLeft"
    });
    return;
  }

  iziToast.success({
    title: 'Success!',
    message: 'Products purchased successfully!',
    position: "topLeft"
  });

  clearCart();
  await loadCartProducts();
  updateNavCountCart();
  await updateCartSummary();
});

refs.modal?.addEventListener("click", (event) => {
  if (event.target === refs.modal || event.target.classList.contains("modal__close-btn")) {
    refs.modal.classList.remove("modal--is-open");
  }
});


document.addEventListener("click", async (event) => {
  const plusBtn = event.target.closest(".plus-button");
  const minusBtn = event.target.closest(".minus-button");

  if (plusBtn || minusBtn) {
    const productDiv = event.target.closest(".product");
    if (!productDiv) return;

    const productId = Number(productDiv.dataset.id);
    if (!productId) return;

    const input = productDiv.querySelector(".quantity-input");
    if (!input) return;

    let quantity = parseInt(input.value, 10) || 0;

    if (plusBtn) {
      quantity += 1;
    } else if (minusBtn && quantity > 0) {
      quantity -= 1;
    }

    input.value = quantity;

    if (quantity > 0) {
      updateCartItem(productId, quantity);
    } else {
      removeFromCart(productId);
      await loadCartProducts();
    }

    await updateCartSummary();
    updateNavCountCart();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  changeTheme();
  loadCartProducts();
  updateNavCountCart();
  updateNavCount();
  updateCartSummary();
});
















