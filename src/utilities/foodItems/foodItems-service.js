import * as foodItemsAPI from './foodItems-api';

export async function getFoodDetails(id) {
  const foodDetails = await foodItemsAPI.getFoodDetails(id);
  return foodDetails;
}

export async function createFoodItem(id, newFoodDetails) {
  const foodItem = await foodItemsAPI.createFoodItem(id, newFoodDetails);
  return foodItem;
}

export async function deleteFoodItem(id) {
  const returnedCategories = await foodItemsAPI.deleteFoodItem(id);
  return returnedCategories;
}

export async function updateFoodItem(id, foodItemDetails) {
  const returnedCategoryDetails = await foodItemsAPI.updateFoodItem(
    id,
    foodItemDetails
  );
  return returnedCategoryDetails;
}
