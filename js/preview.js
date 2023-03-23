const template = document.querySelector('#picture').content.querySelector('.picture');

const getPreview = (photo) => {
  const preview = template.cloneNode(true);
  preview.querySelector('.picture__img').src = photo.url;
  preview.querySelector('.picture__info').alt = photo.description;
  preview.querySelector('.picture__comments').textContent = photo.comments.length;
  preview.querySelector('.picture__likes').textContent = photo.likes;
  preview.dataset.pictureId = photo.id;
  return preview;
};

export const renderPreview = (pictures) => {
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const preview = getPreview(picture);
    fragment.append(preview);
  });
  container.append(fragment);
};
