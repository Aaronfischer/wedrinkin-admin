/**
 * Called after user enters credentials, saves to credentials
 * to localStorage for use in subsequent calls.
 * @param {string} userName
 * @param {string} password
 */
export function setAuthorization(token) {
  localStorage.setItem('authorization', `Bearer ${token}`);
}

/**
 * Site wide custom fetch wrapper. Appends default headers, calls the
 * standard fetch method, and returns a fetch promise.
 * @param {string} url
 * @param {object} options
 * @returns {Promise}
 */
export function fetchWrapper(url, options) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers['Authorization'] = localStorage.getItem('authorization');
  console.log('options.header.authorization', options.headers['Authorization']);
  return fetch(url, options);
}
