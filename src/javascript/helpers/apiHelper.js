const API_URL = 'https://api.github.com/';

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  const options = {
    method
  };

  return fetch(url, options)
    .then(response =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
}

export { callApi }