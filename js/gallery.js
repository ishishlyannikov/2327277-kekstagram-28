import { renderPreview } from './preview.js';
import { showBigPicture } from './big-picture.js';
const container = document.querySelector('.pictures');
export const renderGallery = (pictures) => {
  container.addEventListener ('click', (evt) => {
    const picture = evt.target.closest('[data-picture-id]');
    if (!picture) {
      return;
    }
    const currentPicture = pictures.find(
      (item) => item.id === Number(picture.dataset.pictureId)
    );
    showBigPicture(currentPicture);
  });
  renderPreview(pictures,container);
};
