import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './utils.js';
// задаем вводные данные
const AVATAR_COUNT = 6;
const PHOTO_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 3;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Как мало нужно для счастья.#летнийотдых',
  'Теплые воспоминания в холодное время года.  #отпускнабали',
  'Знали бы вы, что у меня на уме. #отпускбезпутевки',
  'Поймала дзен. #отпусктурция',
  'Плюс одна страна в копилку. #отпусквиталии',
  'Моя личная версия «Орла и решки». #отпусквкрыму',
  'Новый день ― новый город. #отпусквсочи',
  'Море, солнце, я ― идеально. #отпусквгреции',
  'Некоторые дни начинаются лучше остальных. #отпусксдетьми',
  'Временно в режиме off-line. #отпуск2023'
];
const NAMES = ['Aня','Ксюша','Юля','Наташа','Лена','Снежана'];

const generateCommentId = createIdGenerator();
const generateImageId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createImage = () => ({
  id: generateImageId(),
  url: `photos/${getRandomInteger(1,PHOTO_COUNT)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT,LIKE_MAX_COUNT),
  comments: Array.from({length:getRandomInteger(0,COMMENT_COUNT)},createComment)
});
// eslint-disable-next-line no-unused-vars
const randomImages = ()=> Array.from({length: PHOTO_COUNT}, createImage);

export {randomImages};
