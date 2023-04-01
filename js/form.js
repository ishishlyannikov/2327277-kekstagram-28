import { isEscapeKey } from './utils.js';
import { increaseImageScale } from './scale.js';
import { decreaseImageScale } from './scale.js';
import { resetEffects } from './effects.js';
import { initSlider } from './effects.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const ERROR_TEXT = 'неправильно заполнены хештеги';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const imgPreviewContainer = document.querySelector('.img-upload__preview-container');
const increaseImgScale = imgPreviewContainer.querySelector('.scale__control--bigger');
const decreaseImgScale = imgPreviewContainer.querySelector('.scale__control--smaller');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error-text',
}, false);

const onEscape = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    hideModal();
  }
};

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscape);
  decreaseImgScale.addEventListener('click', decreaseImageScale);
  increaseImgScale.addEventListener('click', increaseImageScale);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscape);
  decreaseImgScale.removeEventListener('click', decreaseImageScale);
  increaseImgScale.removeEventListener('click', increaseImageScale);
};

const initTextField = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscape);
  });
  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onEscape);
  });
};

const isUniqueHashtags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
const isValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return isValidCount(tags) && isUniqueHashtags (tags) && tags.every(isValidTag);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export const initModal = () => {
  fileField.addEventListener('change', showModal);
  cancelButton.addEventListener('click', hideModal);
  form.addEventListener('submit', onFormSubmit);
  initTextField(commentField);
  initTextField(hashtagsField);
  initSlider();
  pristine.addValidator(
    hashtagsField,
    validateTags,
    ERROR_TEXT
  );
};
