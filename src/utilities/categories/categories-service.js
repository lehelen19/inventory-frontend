import * as categoriesAPI from './categories-api';

export async function getCategories() {
  const categories = await categoriesAPI.getCategories();
  return categories;
}

export async function getCategoryDetails() {
  const categoryDetails = await categoriesAPI.getCategoryDetails();
  return categoryDetails;
}
