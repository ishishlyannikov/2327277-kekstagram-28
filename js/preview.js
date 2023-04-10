const templateElement = document.querySelector('#picture').content.querySelector('.picture');
const containerElement = document.querySelector('.pictures');

const getPreview = (photo) => {
  const preview = templateElement.cloneNode(true);
  preview.querySelector('.picture__img').src = photo.url;
  preview.querySelector('.picture__info').alt = photo.description;
  preview.querySelector('.picture__comments').textContent = photo.comments.length;
  preview.querySelector('.picture__likes').textContent = photo.likes;
  preview.dataset.pictureId = photo.id;
  return preview;
};

export const renderPreview = (pictures) => {
  containerElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const preview = getPreview(picture);
    fragment.append(preview);
  });
  containerElement.append(fragment);
};
