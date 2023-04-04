import { getData } from './api.js';
import { showAlert } from './utils.js';
import { renderGallery } from './gallery.js';
import { initModal, setOnFormSubmit } from './form.js';
import { hideModal } from './form.js';


getData()
  .then((requestData) => renderGallery(requestData)
  ).
  catch((err) => {
    showAlert(err.message);
  });


setOnFormSubmit(hideModal);
initModal();
