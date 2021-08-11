import { SENTENCES, PICTURE_COUNT_MIN, PICTURE_COUNT_MAX } from './data.js';
import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getRandomLengthArray = (array) => {
  const interimArray = new Array(...array);
  const randomLengthArray = interimArray.slice(0, getRandomInteger(1, array.length));
  return randomLengthArray;
};

const getPicturesArray = () => {
  const pictures = new Array;
  for(let i = 0; i < getRandomInteger(1, PICTURE_COUNT_MAX); i++) {
    const picture = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(PICTURE_COUNT_MIN, PICTURE_COUNT_MAX)}`,
      description: getRandomArrayElement(SENTENCES),
    };
    pictures.push(picture);
  }
  return pictures;
};

const startEventDay = (dateFrom) => dayjs(dateFrom).format('MMMM D');
const endEventDay = (dateTo) => dayjs(dateTo).format('D');
const timeStart = (dateFrom) => dayjs(dateFrom).format('HH:mm');
const timeEnd = (dateTo) => dayjs(dateTo).format('HH:MM');
const eventStartTime = (dateFrom) => dayjs(dateFrom).format('DD/MM/YY HH:mm');
const eventEndTime = (dateTo) => dayjs(dateTo).format('DD/MM/YY HH:mm');

const sumCoast = (accumulator, currentValue) => accumulator + currentValue;

export {getRandomInteger, getRandomArrayElement, getPicturesArray, getRandomLengthArray, timeStart, timeEnd, eventEndTime,eventStartTime, sumCoast, startEventDay, endEventDay};
