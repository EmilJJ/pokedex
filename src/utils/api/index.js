import config from '../../../config';
import serialize from './serialize';

let token = null;

export function setToken(authToken) {
  token = authToken;
}

export function fetchClient(url, params) {
  return fetch(url, params).then(response => {
    if (response.status !== 200) {
      throw response;
    } else {
      return response.json();
    }
  });
}

function callApi(url, params) {
  let preparedUrl = url;
  const preparedParams = { ...params };

  if (typeof params.query === 'object') {
    preparedUrl += `?${serialize(params.query)}`;
  } else if (typeof params.query === 'string') {
    preparedUrl += `?${preparedParams.query}`;
  }

  preparedParams.headers = {
    ...(preparedParams.headers || {}),
  };

  if (
    preparedParams.body &&
    typeof preparedParams.body !== 'string' &&
    !(preparedParams.body instanceof FormData)
  ) {
    preparedParams.body = JSON.stringify(preparedParams.body);
    preparedParams.headers = {
      'content-type': 'application/json',
      ...preparedParams.headers,
    };
  }

  if (token) {
    preparedParams.headers.Authorization = `Bearer ${token}`;
  }

  return fetchClient(`${config.api}/${preparedUrl}`, preparedParams);
}

export default {
  get: (url, options = {}) => callApi(url, { ...options, method: 'GET' }),
  post: (url, options = {}) => callApi(url, { ...options, method: 'POST' }),
  put: (url, options = {}) => callApi(url, { ...options, method: 'PUT' }),
  delete: (url, options = {}) => callApi(url, { ...options, method: 'DELETE' }),
};
