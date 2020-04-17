import {getRandomInteger} from "../utils.js";

export const createTripTemplate = (cards) => {
  const startPoint = cards[getRandomInteger(0, cards.length - 1)].city;
  const intermediatePoint = cards[getRandomInteger(0, cards.length - 1)].city;
  const endPoint = cards[getRandomInteger(0, cards.length - 1)].city;
  const startDay = new Date(cards[getRandomInteger(0, cards.length - 1)].startDate * 2).getDate();
  const endDay = new Date(cards[getRandomInteger(0, cards.length - 1)].endDate).getDate();
  const month = new Date(cards[getRandomInteger(0, cards.length - 1)].startDate).toDateString().slice(4, 7);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startPoint} &mdash; ${intermediatePoint} &mdash; ${endPoint}</h1>
  
        <p class="trip-info__dates">${month} ${startDay}&nbsp;&mdash;&nbsp;${endDay}</p>
      </div>
  
    </section>`
  );
};
