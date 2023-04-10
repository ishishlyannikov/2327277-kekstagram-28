const FILTER_EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const DEFAULT_EFFECT = FILTER_EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const editFormElement = document.querySelector('#upload-select-image');
const sliderElement = editFormElement.querySelector('.effect-level__slider');
const sliderContainerElement = editFormElement.querySelector('.img-upload__effect-level');
const previewImgElement = editFormElement.querySelector('.img-upload__preview img');
const effectsListElement = editFormElement.querySelector('.effects');
const effectLevelElement = editFormElement.querySelector('.effect-level__value');

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  if(isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsListElementChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = FILTER_EFFECTS.find((effect) => effect.name === evt.target.value);
  previewImgElement.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

const onSliderElementUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  previewImgElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

export const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

const createSlider = () =>
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });

export const initSlider = () => {
  createSlider();
  hideSlider();
  effectsListElement.addEventListener('change', onEffectsListElementChange);
  sliderElement.noUiSlider.on('update', onSliderElementUpdate);
};
