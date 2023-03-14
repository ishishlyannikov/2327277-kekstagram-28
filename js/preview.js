import { createRandomImages } from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesContainer = document.querySelector('.pictures');

const similarImages = createRandomImages();

const picturesFragment = document.createDocumentFragment();

export const createPreview = () => {
  similarImages.forEach(({url,comments,likes}) => {
    const preview = pictureTemplate.cloneNode(true);
    preview.querySelector('.picture__img').src = url;
    preview.querySelector('.picture__comments').textcontent = comments.length;
    preview.querySelector('.picture__likes').textcontent = likes;
    picturesFragment.appendChild(preview);
  });
  picturesContainer.appendChild(picturesFragment);
};
