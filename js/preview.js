const template = document.querySelector('#picture').content.querySelector('.picture');

const getPreview = ({id,url,description,comments,likes}) => {
  const preview = template.cloneNode(true);

  preview.querySelector('.picture__img').src = url;
  preview.querySelector('.picture__info').alt = description;
  preview.querySelector('.picture__comments').textContent = comments.length;
  preview.querySelector('.picture__likes').textContent = likes;
  preview.dataset.pictureId = id;
  return preview;
};

export const renderPreview = (pictures,container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const preview = getPreview(picture);
    fragment.append(preview);
  });
  container.append(fragment);
};


