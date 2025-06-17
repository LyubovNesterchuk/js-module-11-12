// Функції для роботи з бекендом
import { API_BASE, PRODUCTS_LIMIT } from './constants.js';

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchProducts(page = 1) {
  const skip = (page - 1) * 12;
  const res = await fetch(`${API_BASE}/products?limit=12&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}


export async function fetchProductsByCategory(category, page = 1) {
  const skip = (page - 1) * PRODUCTS_LIMIT;
  const res = await fetch(`${API_BASE}/products/category/${category}?limit=${PRODUCTS_LIMIT}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
}


export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function fetchProductsBySearch(query) {
  const res = await fetch(`${API_BASE}/products/search?q=${query}`);
  if (!res.ok) throw new Error('Failed to fetch search results');
  return res.json();
}

