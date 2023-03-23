import { createRandomImages } from './data.js';
import { renderGallery } from './gallery.js';
const randomImages = createRandomImages();
renderGallery(randomImages);
