// storage.js

// Функція для відправки кастомної події
const dispatchStorageEvent = (eventName) => {
  window.dispatchEvent(new Event(eventName));
};

// ==================== WISHLIST ====================

export const getWishlist = () => {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (productId) => {
  const wishlist = getWishlist();
  const id = Number(productId);

  if (!wishlist.includes(id)) {
    wishlist.push(id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    dispatchStorageEvent('wishlistUpdated');
    console.log('Added to wishlist:', id);
  }
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const id = Number(productId);
  const filtered = wishlist.filter(item => item !== id);

  localStorage.setItem('wishlist', JSON.stringify(filtered));
  dispatchStorageEvent('wishlistUpdated');
  console.log('Removed from wishlist:', id);
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  const id = Number(productId);
  return wishlist.includes(id);
};

// ==================== CART ====================

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (productId, quantity = 1) => {
  const cart = getCart();
  const id = Number(productId);

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  dispatchStorageEvent('cartUpdated');
  console.log('Added to cart:', id, 'quantity:', quantity);
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const id = Number(productId);
  const filtered = cart.filter(item => item.id !== id);

  localStorage.setItem('cart', JSON.stringify(filtered));
  dispatchStorageEvent('cartUpdated');
  console.log('Removed from cart:', id);
};

export const isInCart = (productId) => {
  const cart = getCart();
  const id = Number(productId);
  return cart.some(item => item.id === id);
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();
  const id = Number(productId);
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatchStorageEvent('cartUpdated');
    console.log('Updated cart quantity:', id, 'quantity:', quantity);
  }
};

export const updateCartItem = (productId, quantity) => {
  const cart = getCart();
  const id = Number(productId);
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatchStorageEvent('cartUpdated');
    console.log('Updated cart item:', id, 'quantity:', quantity);
  }
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  dispatchStorageEvent('cartUpdated');
  console.log('Cart saved');
};

export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
  dispatchStorageEvent('cartUpdated');
  console.log('Cart cleared');
};
