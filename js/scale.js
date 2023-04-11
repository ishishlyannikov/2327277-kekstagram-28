const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DECIMAL_SYSTEM = 10;

const imgPreviewContainerElement = document.querySelector('.img-upload__preview-container');
const imgPreviewElement = imgPreviewContainerElement.querySelector('.img-upload__preview').querySelector('img');
const scaleControlElement = imgPreviewContainerElement.querySelector('.scale__control--value');

const setScaleOnImage = (newValue) => {
  scaleControlElement.value = `${newValue}%`;
  imgPreviewElement.style.transform = `scale(${newValue / DEFAULT_SCALE})`;
};

const changeScale = (operation) => {
  let value = parseInt(scaleControlElement.value, DECIMAL_SYSTEM);
  switch (operation) {
    case 'increase':
      if (value < MAX_SCALE) {
        value += SCALE_STEP;
      }
      break;
    case 'decrease':
      if (value > MIN_SCALE) {
        value -= SCALE_STEP;
      }
  }
  setScaleOnImage(value);
};

export const resetScale = () => setScaleOnImage(DEFAULT_SCALE);
export const onDecreaseButtonClick = () => changeScale('decrease');
export const onIncreaseButtonClick = () => changeScale('increase');
