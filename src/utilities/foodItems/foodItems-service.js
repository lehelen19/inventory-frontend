import * as foodItemsAPI from './foodItems-api';

export async function getFoodDetails(id) {
  const foodDetails = await foodItemsAPI.getFoodDetails(id);
  return foodDetails;
}
