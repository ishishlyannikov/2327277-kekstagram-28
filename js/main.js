import { createRandomImages } from './data.js';
import { renderGallery } from './gallery.js';
import { initModal } from './form.js';

const randomImages = createRandomImages();
renderGallery(randomImages);

initModal();
