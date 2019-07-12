const API_URL =
  'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

function callApi(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
  const url = API_URL + endpoint;
  const options = {
    method,
  };

  return fetch(url, options)
    .then((response) =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch((error) => {
      throw error;
    });
}

export { callApi };
