import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const comments = bigPicture.querySelector('.social__comment-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const onEscape = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const renderBigPictureData = ({url,likes,description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__picture').textContent = description;
};

const createComment = (commentsData) => {
  commentsData.forEach(({avatar, name, message}) => {
    const newComment = commentItem.cloneNode(true);

    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;

    commentsList.append(newComment);

  });
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscape);
};

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  cancelButton.addEventListener('keydown', closeBigPicture);
  document.addEventListener('keydown', onEscape);
  renderBigPictureData(data);
  createComment(data,comments);
};
const onCancelButtonClick = () => closeBigPicture();
cancelButton.addEventListener('click', onCancelButtonClick);
