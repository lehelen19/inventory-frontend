import sendRequest from '../send-request';

const BASE_URL = '/api/categories';

export function getCategories() {
  return sendRequest(BASE_URL);
}
