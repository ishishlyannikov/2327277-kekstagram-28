const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DECIMAL_SYSTEM = 10;

const imgPreviewContainer = document.querySelector('.img-upload__preview-container');
const imgPreview = imgPreviewContainer.querySelector('.img-upload__preview').querySelector('img');
const scaleControl = imgPreviewContainer.querySelector('.scale__control--value');

const setScaleOnImage = (newValue) => {
  scaleControl.value = `${newValue}%`;
  imgPreview.style.transform = `scale(${newValue / DEFAULT_SCALE})`;
};

const changeScale = (operation) => {
  let value = parseInt(scaleControl.value, DECIMAL_SYSTEM);
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
export const decreaseImageScale = () => changeScale('decrease');
export const increaseImageScale = () => changeScale('increase');
