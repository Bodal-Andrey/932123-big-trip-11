const transportTo = [`Taxi to`, `Bus to`, `Train to`, `Ship to`, `Transport to`, `Drive to`, `Flight to`];
const stopPointNames = [`Check-in in`, `Sightseeing in`, `Restaurant in`];
const cityNames = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
const offerNames = [`Luggage`, `Comfort`, `Meal`, `Seats`, `Train`];
const routePoints = [
  {type: `Taxi to`, img: `img/icons/taxi.png`},
  {type: `Bus to`, img: `img/icons/bus.png`},
  {type: `Train to`, img: `img/icons/train.png`},
  {type: `Ship to`, img: `img/icons/ship.png`},
  {type: `Transport to`, img: `img/icons/transport.png`},
  {type: `Drive to`, img: `img/icons/drive.png`},
  {type: `Flight to`, img: `img/icons/flight.png`},
  {type: `Check-in in`, img: `img/icons/check-in.png`},
  {type: `Sightseeing in`, img: `img/icons/sightseeing.png`},
  {type: `Restaurant in`, img: `img/icons/restaurant.png`}
];

const arrayOfSentence = text.split(`.`).splice(1, 10);

const getNames = (arr) => {
  const valueNames = [];
  for (let valueName of arr) {
    const name = valueName.slice(0, -3);
    valueNames.push(name);
  }
  return valueNames;
};

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
    transport: getNames(transportTo),
    pointNames: getNames(stopPointNames),
    city: cityNames,
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    price: getRandomInteger(10, 100),
    description: getRandomArray(arrayOfSentence, 1, 5).join(`. `),
    offers: getRandomArray(generateOfferNames(), 0, 5),
    photos: getRandomArray(generatePhotos(), 1, 5),
    routePoint: routePoints[getRandomInteger(0, routePoints.length)],
  };
};

const task = generateCard();

export {task};
