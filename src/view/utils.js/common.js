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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if(index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index +1),
  ];
};

export {getRandomInteger, getRandomArrayElement, getRandomLengthArray, updateItem};
