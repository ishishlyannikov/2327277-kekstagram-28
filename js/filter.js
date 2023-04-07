const RANDOM_PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const compareComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const sortRandomElement = () => Math.random() - 0.5;

export const getFilteredPictures = () =>{
  switch(currentFilter){
    case Filter.RANDOM: return pictures.slice().sort(sortRandomElement).slice(0, RANDOM_PICTURES_COUNT);
    case Filter.DISCUSSED: return pictures.slice().sort(compareComments);
    default: return pictures.slice();
  }
};

const initFilterClick = (cb) =>{
  filterElement.addEventListener('click', (evt) =>{
    if(!evt.target.classList.contains('img-filters__button')){
      return;
    }
    const clickButton = evt.target;
    if(clickButton.id === currentFilter){
      return;
    }
    filterElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickButton.classList.add('img-filters__button--active');
    currentFilter = clickButton.id;
    cb(getFilteredPictures());
  });
};

export const initFilter = (loadedPictures, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = loadedPictures.slice();
  initFilterClick(cb);
};
