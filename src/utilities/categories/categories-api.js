import sendRequest from '../send-request';

const BASE_URL = '/api/categories';

export function getCategories() {
  return sendRequest(BASE_URL);
}

export function getCategoryDetails(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function createCategory(name) {
  return sendRequest(BASE_URL, 'POST', { name });
}

export function deleteCategory(id) {
  sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
