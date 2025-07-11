import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

function waitForImagesToLoad(container) {
  const images = container.querySelectorAll('img');
  const promises = Array.from(images).map(img => {
    return new Promise(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      }
    });
  });
  return Promise.all(promises);
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const userInput = searchInput.value.trim();
  if (userInput === '') {
    iziToast.error({
      message: 'Please enter a search query.',
      position: 'topRight',
      progressBar: false,
    });
    return;
  }

  loader.classList.remove('hidden');

  getImagesByQuery(userInput)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          iconColor: '#fafafb',
          iconUrl:
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6.81 0.219C6.95056 0.0787966 7.14097 4.21785e-05 7.3395 0L16.6605 0C16.859 4.21785e-05 17.0494 0.0787966 17.19 0.219L23.781 6.81C23.9212 6.95056 24 7.14097 24 7.3395V16.6605C24 16.859 23.9212 17.0494 23.781 17.19L17.19 23.781C17.0494 23.9212 16.859 24 16.6605 24H7.3395C7.14097 24 6.95056 23.9212 6.81 23.781L0.219 17.19C0.0787966 17.0494 4.21785e-05 16.859 0 16.6605V7.3395C4.21785e-05 7.14097 0.0787966 6.95056 0.219 6.81L6.81 0.219ZM7.65 1.5L1.5 7.65V16.35L7.65 22.5H16.35L22.5 16.35V7.65L16.35 1.5H7.65Z" fill="%23FAFAFB"/><path d="M6.96888 6.969C7.03854 6.89915 7.12131 6.84374 7.21243 6.80593C7.30354 6.76812 7.40122 6.74866 7.49988 6.74866C7.59853 6.74866 7.69621 6.76812 7.78733 6.80593C7.87844 6.84374 7.96121 6.89915 8.03088 6.969L11.9999 10.9395L15.9689 6.969C16.0386 6.89927 16.1214 6.84395 16.2125 6.80621C16.3036 6.76847 16.4013 6.74905 16.4999 6.74905C16.5985 6.74905 16.6961 6.76847 16.7873 6.80621C16.8784 6.84395 16.9611 6.89927 17.0309 6.969C17.1006 7.03873 17.1559 7.12151 17.1937 7.21262C17.2314 7.30373 17.2508 7.40138 17.2508 7.5C17.2508 7.59861 17.2314 7.69626 17.1937 7.78737C17.1559 7.87848 17.1006 7.96127 17.0309 8.031L13.0604 12L17.0309 15.969C17.1006 16.0387 17.1559 16.1215 17.1937 16.2126C17.2314 16.3037 17.2508 16.4014 17.2508 16.5C17.2508 16.5986 17.2314 16.6963 17.1937 16.7874C17.1559 16.8785 17.1006 16.9613 17.0309 17.031C16.9611 17.1007 16.8784 17.156 16.7873 17.1938C16.6961 17.2315 16.5985 17.2509 16.4999 17.2509C16.4013 17.2509 16.3036 17.2315 16.2125 17.1938C16.1214 17.156 16.0386 17.1007 15.9689 17.031L11.9999 13.0605L8.03088 17.031C7.96114 17.1007 7.87836 17.156 7.78725 17.1938C7.69614 17.2315 7.59849 17.2509 7.49988 17.2509C7.40126 17.2509 7.30361 17.2315 7.2125 17.1938C7.12139 17.156 7.03861 17.1007 6.96888 17.031C6.89914 16.9613 6.84383 16.8785 6.80609 16.7874C6.76835 16.6963 6.74893 16.5986 6.74893 16.5C6.74893 16.4014 6.76835 16.3037 6.80609 16.2126C6.84383 16.1215 6.89914 16.0387 6.96888 15.969L10.9394 12L6.96888 8.031C6.89903 7.96133 6.84362 7.87857 6.80581 7.78745C6.768 7.69633 6.74854 7.59865 6.74854 7.5C6.74854 7.40135 6.768 7.30366 6.80581 7.21255C6.84362 7.12143 6.89903 7.03867 6.96888 6.969Z" fill="%23FAFAFB"/></svg>',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          progressBar: false,
          backgroundColor: '#ef4040',
          messageColor: '#fafafb',
        });
        gallery.innerHTML = '';
        return;
      }

      createGallery(data.hits);
      return waitForImagesToLoad(gallery);
    })
    .then(() => {
      loader.classList.add('hidden');
    })
    .catch(err => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topCenter',
      });
      loader.classList.add('hidden');
    });

  form.reset();
});
