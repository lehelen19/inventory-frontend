import sendRequest from '../send-request';

const BASE_URL = '/api';

export function getFoodDetails(id) {
  return sendRequest(`${BASE_URL}/items/${id}`);
}

export function createFoodItem(id, foodItemDetails) {
  return sendRequest(`${BASE_URL}/categories/${id}/items`, 'POST', {
    name: foodItemDetails.foodName,
    quantity: foodItemDetails.foodQuantity,
  });
}

export function deleteFoodItem(id) {
  return sendRequest(`${BASE_URL}/items/${id}`, 'DELETE');
}

export function updateFoodItem(id, foodItemDetails) {
  const { name, quantity } = foodItemDetails;
  return sendRequest(`${BASE_URL}/items/${id}`, 'PUT', {
    name,
    quantity,
  });
}
