import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const createAdditionalOfferMarkup = (offer, isChecked) => {
  const {name, price} = offer;
  return (
    `<div class="event__offer-selector">
    <input 
    class="event__offer-checkbox  visually-hidden" 
    id="event-offer-${name}-1" 
    type="checkbox" 
    name="event-offer-${name}" 
    ${isChecked ? `checked` : ``}
    >
    <label class="event__offer-label" for="event-offer-${name}-1">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`
  );
};

const createPhotosMarkup = (photo) => {
  return (
    `<img class="event__photo" src="${photo}" alt="Event photo">`
  );
};

const createFavoriteMarkup = (name, isChecked = false, isNew = false) => {
  return (
    `<input id="event-${name}-1" class="event__${name}-checkbox  visually-hidden" type="checkbox" name="event-${name}" ${isChecked ? `checked` : ``}>
    <label class="event__${name}-btn ${isNew ? `` : `visually-hidden`}" for="event-${name}-1">
      <span class="visually-hidden">Add to ${name}</span>
      <svg class="event__${name}-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`
  );
};

const createEventEditItemTemplate = (card, type) => {
  const {city, startDate, endDate, price, description, photos, offers, isNew} = card;

  const additionalOfferMarkup = offers.length > 0 ? offers.map((it, i) => createAdditionalOfferMarkup(it, i === 0)).join(`\n`) : ``;
  const photosMarkup = photos.map((it) => createPhotosMarkup(it)).join(`\n`);
  const favorite = createFavoriteMarkup(`favorite`, !card.isFavorite, !card.isNew);

  return (
    `<li class="trip-events__item">
      <form class="trip-events__item event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
      
          <div class="event__type-item">
            <input ${type === `taxi` && `checked`} id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `bus` && `checked`} id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `train` && `checked`} id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `ship` && `checked`} id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `transport` && `checked`} id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `drive` && `checked`} id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `flight` && `checked`} id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>
          </fieldset>
      
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
      
          <div class="event__type-item">
            <input ${type === `check-in` && `checked`} id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `sightseeing` && `checked`} id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>
      
          <div class="event__type-item">
            <input ${type === `restaurant` && `checked`} id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
          </fieldset>
        </div>
        </div>
  
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>
  
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>
  
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
        </div>
  
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${!isNew ? `Delete` : `Cancel`}</button>
        ${favorite}
        <button class="event__rollup-btn" ${!isNew ? `` : `style="display: none"`} type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      ${offers.length === 0 && description === `` ? `` : `
      <section class="event__details">
        ${offers.length !== 0 ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
          <div class="event__available-offers">
            ${additionalOfferMarkup}
          </div>
        </section>` : ``}
  
        ${description !== `` ? `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}.</p>
  
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photosMarkup}
            </div>
          </div>
        </section>` : ``}
      </section>`}
    </form>
    </li>`
  );
};

export default class EventEditItem extends AbstractSmartComponent {
  constructor(event, offers, destinations) {
    super();
    this._event = event;
    this._eventType = this._event.type;
    this._offers = offers;
    this._destinations = destinations;
    this._submitHandler = null;
    this._displaceHandler = null;
    this._deleteHandler = null;
    this._favoriteHandler = null;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;

    this._handleTypeClick = this._handleTypeClick.bind(this);

    this._applyFlatpickr();
    this._subscribeToChange();
  }

  getTemplate() {
    return createEventEditItemTemplate(this._event, this._eventType, this._offers);
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteHandler(this._favoriteHandler);
    this.setDisplaceHandler(this._displaceHandler);
    this.setDeleteHandler(this._deleteHandler);
    this._subscribeToChange();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  _applyFlatpickr() {
    if (this._flatpickrStart || this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrEnd.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd = null;
    }

    const options = {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    };

    const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
    this._flatpickrStart = flatpickr(startDateElement, Object.assign(options, {defaultDate: this._card.startDate}));

    const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickrEnd = flatpickr(endDateElement, Object.assign(options, {defaultDate: this._card.endDate}));
  }

  _subscribeToChange() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, this._handleTypeClick);
  }

  _handleTypeClick(evt) {
    if (evt.target.tagName === `LABEL`) {
      return;
    }
    this._type = evt.target.value;
    this.rerender();
  }

  reset() {
    this._type = this._card.type;
    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    return new FormData(form);
  }

  setFavoriteHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setDisplaceHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._displaceHandler = handler;
  }

  setDeleteHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteHandler = handler;
  }
}
