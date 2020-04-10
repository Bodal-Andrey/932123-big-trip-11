const transportValueNames = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const stopPointNames = [`Check-in`, `Sightseeing`, `Restaurant`];
const cityNames = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
const offerNames = [`Luggage`, `Comfort`, `Meal`, `Seats`, `Train`];

const arrayOfSentence = text.split(`.`).splice(1, 10);

const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getRandomArray = (arr, min, max) => {
  const description = [];

  for (let i = 0; (i < getRandomInteger(min, max)) && (i < arr.length); i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const sentence = arr[r];
    arr[r] = arr[i];
    arr[i] = sentence;
    description.push(sentence);
  }

  return description;
};

const generateOfferNames = () => {
  return offerNames.map((it) => {
    return {
      value: it,
      price: Math.floor(Math.random() * 100),
    };
  });
};

const generatePhotos = () => {
  const photosArray = [];
  for (let i = 0; i < 4; i++) {
    photosArray[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
    photosArray.push(photosArray[i]);
  }
  return photosArray;
};

const getRandomDate = () => {
  return (
    Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
  );
};

const generateCard = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();

  return {
    transport: transportValueNames,
    pointNames: stopPointNames,
    city: cityNames,
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    description: getRandomArray(arrayOfSentence, 1, 5).join(`. `),
    offers: getRandomArray(generateOfferNames(), 0, 5),
    photos: getRandomArray(generatePhotos(), 1, 5),
  };
};

const task = generateCard();

export {task};
