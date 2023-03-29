import { isEscapeKey } from './utils.js';

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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error-text',
}, false);

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('keydown', onEscape);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscape);
};

const onFieldInputChange = () => {
  showModal();
};

const onCancelButtonClick = () => {
  hideModal();
};

const onEscape = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const onTextFieldKeydown = (field) => {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscape);
  });
  field.addEventListener('blur', () => {
    document.addEventListener('keydown', onEscape);
  });
};

onTextFieldKeydown(commentField);
onTextFieldKeydown(hashtagsField);

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

pristine.addValidator(
  hashtagsField,
  validateTags,
  ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFieldInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

