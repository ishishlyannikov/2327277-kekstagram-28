const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const getPreview = ({url,description,comments,likes}) => {
  const preview = template.cloneNode(true);

  preview.querySelector('.picture__img').src = url;
  preview.querySelector('.picture__info').alt = description;
  preview.querySelector('.picture__comments').textContent = comments.length;
  preview.querySelector('.picture__likes').textContent = likes;

  return preview;
};

export const renderPreview = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const preview = getPreview(picture);
    fragment.append(preview);
  });
  container.append(fragment);
};


