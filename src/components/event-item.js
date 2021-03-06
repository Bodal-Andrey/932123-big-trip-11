import AbstractComponent from "./abstract-component.js";
import {formatTime, timeDifference} from "../utils/common.js";

const createOfferMarkup = (offer) => {
  const {name, price} = offer;

  return (
    `<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`
  );
};

const createEventItemTemplate = (card) => {
  const {type, city, startDate, endDate, price, offers} = card;

  const startDateMarkup = formatTime(startDate);
  const endDateMarkup = formatTime(endDate);
  const timeDiff = timeDifference(endDate, startDate);
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
            <time class="event__start-time" datetime="${startDateMarkup}">${startDateMarkup}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateMarkup}">${endDateMarkup}</time>
          </p>
          <p class="event__duration">${timeDiff}</p>
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

export default class EventItem extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createEventItemTemplate(this._card);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
