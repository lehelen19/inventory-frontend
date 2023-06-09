import * as categoriesAPI from './categories-api';

export async function getCategories() {
  const categories = await categoriesAPI.getCategories();
  return categories;
}

export async function getCategoryDetails(id) {
  const categoryDetails = await categoriesAPI.getCategoryDetails(id);
  return categoryDetails;
}

export async function createCategory(name) {
  const category = await categoriesAPI.createCategory(name);
  return category;
}

export async function deleteCategory(id) {
  const msg = await categoriesAPI.deleteCategory(id);
  return msg;
}

export async function updateCategory(categoryDetails) {
  const category = await categoriesAPI.updateCategory(categoryDetails);
  return category;
}
