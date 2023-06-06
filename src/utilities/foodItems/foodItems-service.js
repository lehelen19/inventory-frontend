import * as foodItemsAPI from './foodItems-api';

export async function getFoodDetails(id) {
  const foodDetails = await foodItemsAPI.getFoodDetails(id);
  return foodDetails;
}

export async function createFoodItem(id, newFoodDetails) {
  const foodItem = await foodItemsAPI.createFoodItem(id, newFoodDetails);
  return foodItem;
}
