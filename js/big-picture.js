import { isEscapeKey } from './utils.js';
const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('#picture-cancel');

const commentsContainer = bigPicture.querySelector('.social__comment-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsShown = 0;
let comments = [];

const renderBigPicture = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
};

const getCommentNode = (comment) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('img').src = comment.avatar;
  newComment.querySelector('img').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const createComments = () => {
  commentsShown = Math.min(comments.length, commentsShown + COMMENTS_PER_PORTION);
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', createComments);
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', createComments);
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = getCommentNode(comments[i]);
    fragment.append(commentElement);
  }
  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentsContainer.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  cancelButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscape);
  commentsShown = 0;
};

function onEscape (evt) {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  cancelButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscape);
  renderBigPicture(data);
  comments = data.comments;
  if (comments.length > 0) {
    createComments();
  }
};
