// //Робота з localStorage

// const CART_KEY = 'cart';
// const WISHLIST_KEY = 'wishlist';

// export function loadFromStorage(key) {
//   try {
//     return JSON.parse(localStorage.getItem(key)) || [];
//   } catch {
//     return [];
//   }
// }

// export function saveToStorage(key, data) {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (err) {
//     console.error('Error saving to localStorage:', err);
//   }
// }

// export function addToStorage(key, id) {
//   const items = loadFromStorage(key);
//   if (!items.includes(id)) {
//     items.push(id);
//     saveToStorage(key, items);
//   }
// }

// export function removeFromStorage(key, id) {
//   const items = loadFromStorage(key).filter(item => item !== id);
//   saveToStorage(key, items);
// }

// export function isInStorage(key, id) {
//   return loadFromStorage(key).includes(id);
// }

// export function toggleInStorage(key, id) {
//   const items = JSON.parse(localStorage.getItem(key)) || [];
//   const index = items.indexOf(id);

//   if (index === -1) {
//     items.push(id);
//   } else {
//     items.splice(index, 1);
//   }

//   localStorage.setItem(key, JSON.stringify(items));
// }

// export const getCart = () => loadFromStorage(CART_KEY);
// export const setCart = data => saveToStorage(CART_KEY, data);

// export const getWishlist = () => loadFromStorage(WISHLIST_KEY);
// export const setWishlist = data => saveToStorage(WISHLIST_KEY, data);