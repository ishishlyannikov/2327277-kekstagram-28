const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DECIMAL_SYSTEM = 10;

const imgPreviewContainer = document.querySelector('.img-upload__preview-container');
const imgPreview = imgPreviewContainer.querySelector('.img-upload__preview').querySelector('img');
const scaleValue = imgPreviewContainer.querySelector('.scale__control--value');

const scaleChanging = (operation) => {
  const parsedValue = parseInt(scaleValue.value, DECIMAL_SYSTEM);
  switch (operation) {
    case 'increase':
      if (parsedValue < MAX_SCALE) {
        scaleValue.value = `${parsedValue + SCALE_STEP}%`;
      }
      break;
    case 'decrease':
      if (parsedValue > MIN_SCALE) {
        scaleValue.value = `${parsedValue - SCALE_STEP}%`;
      }
  }
  imgPreview.style.transform = `scale(${parsedValue / DEFAULT_SCALE})`;
};

export const decreaseImageScale = () => scaleChanging('decrease');
export const increaseImageScale = () => scaleChanging('increase');
