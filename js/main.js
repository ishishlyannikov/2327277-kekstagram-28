import { getData } from './api.js';
import { renderGallery } from './gallery.js';
import { showAlert, debounce } from './utils.js';
import { initModal, hideModal, setOnFormSubmit } from './form.js';
import { initFilter, getFilteredPictures } from './filter.js';

const debounceRenderGallery = debounce(renderGallery);

getData()
  .then((requestData) => {
    initFilter(requestData, debounceRenderGallery);
    renderGallery(getFilteredPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  });

setOnFormSubmit(hideModal);
initModal();
