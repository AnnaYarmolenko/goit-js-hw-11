import axios from 'axios';

const apiKey = '50867050-92eb7eb537c2ba6b1fec3ca38';
const baseUrl = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios
    .get(baseUrl, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data)
    .catch(err => {
      console.error(err);
      throw err;
    });
}
