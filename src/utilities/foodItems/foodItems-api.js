import sendRequest from '../send-request';

const BASE_URL = '/api';

export function getFoodDetails(id) {
  return sendRequest(`${BASE_URL}/items/${id}`);
}
