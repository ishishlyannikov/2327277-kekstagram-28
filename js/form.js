import { isEscapeKey } from './utils.js';
import { increaseImageScale } from './scale.js';
import { decreaseImageScale } from './scale.js';
import { resetEffects } from './effects.js';
import { initSlider } from './effects.js';
import { sendData } from './api.js';

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
const submitButton = form.querySelector('.img-upload__submit');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const getUploadState = () => document.querySelector('.success') || document.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error-text',
}, false);

const onEscape = (evt) => {
  if (isEscapeKey(evt) && getUploadState() === null) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    hideModal();
  }
};

const closeMessage = () => {
  getUploadState().remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onMessageEscape);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onOutsideElement);
};

const hideMessage = () => {
  if(getUploadState() !== null){
    closeMessage();
  }
};

const onMessageEscape = (evt) =>{
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeMessage();
  }
};

const onOutsideElement = (evt) => {
  const div = document.querySelector('.error__inner, .success__inner');
  if (evt.composedPath().includes(div)) {
    return;
  }
  closeMessage();
};

const showSuccessMessage = () =>{
  const successFragment = document.createDocumentFragment();
  const successElement = successMessageTemplate.cloneNode(true);
  successFragment.append(successElement);
  document.body.append(successFragment);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscape);
  document.addEventListener('click', onOutsideElement);
};

const showErrorMessage = () => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorMessageTemplate.cloneNode(true);
  errorFragment.append(errorElement);
  document.body.append(errorFragment);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscape);
  document.addEventListener('click', onOutsideElement);
};

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscape);
  decreaseImgScale.addEventListener('click', decreaseImageScale);
  increaseImgScale.addEventListener('click', increaseImageScale);
};

export const hideModal = () => {
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

export const setOnFormSubmit = () => {
  form.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    if(pristine.validate()){
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(showSuccessMessage)
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
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
