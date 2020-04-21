import {createElement} from "../utils.js"

const createTripTemplate = (cards) => {
  const newCards = cards.sort((a, b) => a.startDate - b.startDate);
  const cities = [];
  newCards.forEach((it) => {
    cities.push(it.city);
  });
  const startPoint = cities[0];
  const endPoint = cities[cities.length - 1];
  let intermediatePoint = cities[1];
  if (cities.length > 3) {
    intermediatePoint = `...`;
  }
  const startDay = new Date(newCards[0].startDate).toDateString().slice(4, 10);
  const endDay = new Date(newCards[newCards.length - 1].endDate).toDateString().slice(4, 10);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startPoint} &mdash; ${intermediatePoint} &mdash; ${endPoint}</h1>
  
        <p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${endDay}</p>
      </div>
  
    </section>`
  );
};

export default class Trip {
  constructor(cards) {
    this._cards = cards;

    this._element = null;
  }

  getTemplate() {
    return createTripTemplate(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
