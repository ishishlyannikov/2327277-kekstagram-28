const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DECIMAL_SYSTEM = 10;

const imgPreviewContainer = document.querySelector('.img-upload__preview-container');
const imgPreview = imgPreviewContainer.querySelector('.img-upload__preview').querySelector('img');
const scaleValue = imgPreviewContainer.querySelector('.scale__control--value');

const scaleChanging = (operation) => {
  switch (operation) {
    case 'increase':
      if (parseInt(scaleValue.value, DECIMAL_SYSTEM) < MAX_SCALE) {
        scaleValue.value = `${parseInt(scaleValue.value, DECIMAL_SYSTEM) + SCALE_STEP}%`;
      }
      break;
    case 'decrease':
      if (parseInt(scaleValue.value, DECIMAL_SYSTEM) > MIN_SCALE) {
        scaleValue.value = `${parseInt(scaleValue.value, DECIMAL_SYSTEM) - SCALE_STEP}%`;
      }
  }
  imgPreview.style.transform = `scale(${parseInt(scaleValue.value, DECIMAL_SYSTEM) / DEFAULT_SCALE})`;
};

export const decreaseImageScale = () => scaleChanging('decrease');
export const increaseImageScale = () => scaleChanging('increase');
