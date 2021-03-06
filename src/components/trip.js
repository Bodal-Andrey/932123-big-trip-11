import AbstractSmartComponent from "./abstract-smart-component.js";

const createTripTemplate = (cards) => {
  if (cards.length > 0) {
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
  } else {
    return (
      `<section class="trip-main__trip-info  trip-info"></section>`
    );
  }
};

export default class Trip extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;
    this._events = this._eventsModel.getEvents();
  }

  getTemplate() {
    return createTripTemplate(this._events);
  }
}
