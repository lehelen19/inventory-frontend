import sendRequest from '../send-request';

const BASE_URL = '/api';

export function getFoodDetails(id) {
  return sendRequest(`${BASE_URL}/items/${id}`);
}

export function createFoodItem(id, foodItemDetails) {
  return sendRequest(
    `${BASE_URL}/categories/${id}/items`,
    'POST',
    foodItemDetails
  );
}
