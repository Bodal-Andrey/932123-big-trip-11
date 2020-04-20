import {formatDate, createElement} from "../utils.js";

const createOfferMarkup = (offer) => {
  const {data, price} = offer;

  return (
    `<li class="event__offer">
    <span class="event__offer-title">${data}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`
  );
};

const createTripItemTemplate = (card) => {
  const {type, city, startDate, endDate, price, offers} = card;

  const startDateMarkup = formatDate(startDate);
  const endDateMarkup = formatDate(endDate);
  const startTimeMarkup = startDateMarkup.slice(9);
  const endTimeMarkup = endDateMarkup.slice(9);
  const offerMarkup = offers.map((it) => createOfferMarkup(it)).join(`\n`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${city}</h3>
  
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateMarkup}">${startTimeMarkup}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateMarkup}">${endTimeMarkup}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>
  
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
  
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerMarkup}
        </ul>
  
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripItem {
  constructor(card) {
    this._card = card;

    this._element = null;
  }

  getTemplate() {
    return createTripItemTemplate(this._card);
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
