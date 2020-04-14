import {formatDate} from "../utils.js";

const createRideItemMarkup = (value) => {
  const type = value.toLowerCase();
  return (
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${value}</label>
  </div>`
  );
};

const createStopPointMarkup = (value) => {
  const type = value.toLowerCase();
  return (
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${value}</label>
  </div>`
  );
};

const createCityMarkup = (value) => {
  return (
    `<option value="${value}"></option>`
  );
};

const createAdditionalOfferMarkup = (offer, isChecked) => {
  const {data, price} = offer;
  const name = data.toLowerCase();

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
      <span class="event__offer-title">${data}</span>
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

export const createTripEventsTemplate = (cards) => {
  const {transport, pointNames, city, startDate, endDate, price, description, offers, photos, routePoint} = cards;

  const transportRideMarkup = transport.map((it) => createRideItemMarkup(it)).join(`\n`);
  const stopPointMarkup = pointNames.map((it) => createStopPointMarkup(it)).join(`\n`);
  const cityMarkup = city.map((it) => createCityMarkup(it)).join(`\n`);
  const additionalOfferMarkup = offers.map((it, i) => createAdditionalOfferMarkup(it, i === 0)).join(`\n`);
  const photosMarkup = photos.map((it) => createPhotosMarkup(it)).join(`\n`);
  const startDateMarkup = formatDate(startDate);
  const endDateMarkup = formatDate(endDate);
  const priceMarkup = price;
  const randomCity = city[Math.floor(Math.random() * city.length)];
  const icon = routePoint.picture;
  const routeType = routePoint.type;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${icon}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
                ${transportRideMarkup}
            </fieldset>
 
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
                  ${stopPointMarkup}
            </fieldset>
          </div>
        </div>
  
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${routeType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${randomCity}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${cityMarkup}
          </datalist>
        </div>
  
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateMarkup}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateMarkup}">
        </div>
  
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${priceMarkup}">
        </div>
  
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
          <div class="event__available-offers">
            ${additionalOfferMarkup}
          </div>
        </section>
  
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}.</p>
  
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photosMarkup}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};
