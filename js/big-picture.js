import { isEscapeKey } from './utils.js';
const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPictureElement.querySelector('#picture-cancel');
const pictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');


const commentsContainerElement = bigPictureElement.querySelector('.social__comment-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentItemElement = bigPictureElement.querySelector('.social__comment');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let commentsShown = 0;
let comments = [];

const getCommentNode = (comment) => {
  const newComment = commentItemElement.cloneNode(true);
  newComment.querySelector('img').src = comment.avatar;
  newComment.querySelector('img').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const onCommentsLoaderButtonClick = () => {
  commentsShown = Math.min(comments.length, commentsShown + COMMENTS_PER_PORTION);
  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsLoaderElement.removeEventListener('click', onCommentsLoaderButtonClick);
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoaderButtonClick);
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = getCommentNode(comments[i]);
    fragment.append(commentElement);
  }
  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
  commentsContainerElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCancelButtonClick = () => {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onEscapeClick);
  commentsShown = 0;
};

function onEscapeClick (evt) {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    onCancelButtonClick();
  }
}

export const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentsCountElement.classList.add('hidden');
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscapeClick);
  pictureImgElement.src = data.url;
  socialCaptionElement.textContent = data.description;
  likesCountElement.textContent = data.likes;
  commentsCountElement.textContent = data.comments.length;
  comments = data.comments;
  commentsShown = 0;
  onCommentsLoaderButtonClick();
};
