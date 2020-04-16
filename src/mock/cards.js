import {getRandomInteger} from "../utils.js";

const CARDS_AMOUNT = 15;

const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const cityNames = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `London`, `Berlin`, `Tokyo`];
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
const offerNames = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`, `Order Uber`, `Rent a car`, `Add breakfast`, `Book tickets`, `Lunch in city`];

const arrayOfSentence = text.split(`.`).splice(1, 10);

// const getNames = (arr) => {
//   const valueNames = [];
//   for (let valueName of arr) {
//     const name = valueName.slice(0, -3);
//     valueNames.push(name);
//   }
//   return valueNames;
// };

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
      data: it,
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
    types,
    cities: cityNames,
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    price: getRandomInteger(10, 100),
    description: getRandomArray(arrayOfSentence, 1, 5).join(`. `),
    offers: getRandomArray(generateOfferNames(), 0, 5),
    offerNames,
    photos: getRandomArray(generatePhotos(), 1, 5),
  };
};

const generateCards = (amount) => {
  return Array(amount).fill(``).map(() => generateCard()).sort((currentCard, nextCard) => currentCard.startDate - nextCard.startDate);
};

const cards = generateCards(CARDS_AMOUNT);

export {cards};
