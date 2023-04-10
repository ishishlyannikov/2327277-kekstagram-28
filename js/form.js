import { isEscapeKey } from './utils.js';
import { onDecreaseButtonClick, resetScale } from './scale.js';
import { onIncreaseButtonClick } from './scale.js';
import { resetEffects } from './effects.js';
import { initSlider } from './effects.js';
import { sendData } from './api.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const ERROR_TEXT = 'неправильно заполнены хештеги';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const cancelButtonElement = document.querySelector('#upload-cancel');
const fileFieldElement = document.querySelector('#upload-file');
const hashtagsFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const imgPreviewContainerElement = document.querySelector('.img-upload__preview-container');
const increaseImgScaleELement = imgPreviewContainerElement.querySelector('.scale__control--bigger');
const decreaseImgScaleElement = imgPreviewContainerElement.querySelector('.scale__control--smaller');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const getUploadStateElement = () => document.querySelector('.success') || document.querySelector('.error');

const uploadFileElement = document.querySelector('.img-upload__input');
const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error-text',
}, false);

const closeMessage = () => {
  getUploadStateElement().remove();
  document.removeEventListener('keydown', onMessageEscape);
  document.removeEventListener('click', onOutsideElement);
};

const hideMessage = () => {
  if(getUploadStateElement() !== null){
    closeMessage();
  }
};

function onMessageEscape (evt) {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeMessage();
  }
}

function onOutsideElement (evt) {
  if(evt.target === getUploadStateElement()) {
    closeMessage();
  }
}

const showSuccessMessage = () =>{
  const successFragment = document.createDocumentFragment();
  const successElement = successMessageElement.cloneNode(true);
  successFragment.append(successElement);
  document.body.append(successFragment);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscape);
  document.addEventListener('click', onOutsideElement);
};

const showErrorMessage = () => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorMessageElement.cloneNode(true);
  errorFragment.append(errorElement);
  document.body.append(errorFragment);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscape);
  document.addEventListener('click', onOutsideElement);
};

const uploadPhoto = () =>{
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewElement.forEach((effect) => {
      effect.style.backgroundImage = `url(${uploadPreviewElement.src}`;
    });
  }
};

const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeClick);
  decreaseImgScaleElement.addEventListener('click', onDecreaseButtonClick);
  increaseImgScaleELement.addEventListener('click', onIncreaseButtonClick);
  uploadPhoto();
};

export const hideModal = () => {
  formElement.reset();
  resetScale();
  pristine.reset();
  resetEffects();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeClick);
  decreaseImgScaleElement.removeEventListener('click', onDecreaseButtonClick);
  increaseImgScaleELement.removeEventListener('click', onIncreaseButtonClick);
};

function onEscapeClick (evt) {
  if (isEscapeKey(evt) && getUploadStateElement() === null) {
    evt.preventDefault();
    hideModal();
  }
}

const initTextField = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscapeClick);
  });
  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onEscapeClick);
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
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

export const setOnFormSubmit = () => {
  formElement.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    if(pristine.validate()){
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(showSuccessMessage)
        .then(hideModal)
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export const initModal = () => {
  fileFieldElement.addEventListener('change', showModal);
  cancelButtonElement.addEventListener('click', hideModal);
  formElement.addEventListener('submit', onFormSubmit);
  initTextField(commentFieldElement);
  initTextField(hashtagsFieldElement);
  initSlider();
  pristine.addValidator(
    hashtagsFieldElement,
    validateTags,
    ERROR_TEXT
  );
};
