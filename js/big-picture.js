import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('#picture-cancel');

const commentsContainer = bigPicture.querySelector('.social__comment-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderBigPicture = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
};

const createComments = (comments) => {
  comments.forEach((comment) => {
    const newComment = commentItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentItem.append(newComment);
  });
  commentsList.append(commentItem);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  cancelButton.removeEventListener('click', closeBigPicture);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscape);
};

const onEscape = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  commentsContainer.classList.add('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  cancelButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscape);
  renderBigPicture(data);
  createComments(data);
};
