// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `<li class ="gallery-item">
            <a class = "gallery-link" href= "${image.largeImageURL}">
            <img class="gallery-image" src="${image.webformatURL}" alt ="${image.tags}"/>
            </a>
            <div class="gallery-info">
                <div class="gallery-view">Likes<p class="gallery-count">${image.likes}</p></div>
                <div class="gallery-view">Views<p class="gallery-count">${image.views}</p></div>
                <div class="gallery-view">Comments<p class="gallery-count">${image.comments}</p></div>
                <div class="gallery-view">Downloads<p class="gallery-count">${image.downloads}</p></div>
            </div>
            </li>`;
    })
    .join('');

  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = markup;

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
  }
  lightbox.refresh();
}
