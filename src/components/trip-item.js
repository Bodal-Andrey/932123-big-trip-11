import {formatDate} from "../utils.js";

export const createTripItemTemplate = (cards) => {
  const {city, startDate, endDate, price, routePoint} = cards;
  const icon = routePoint.img;
  const routeType = routePoint.type;
  const randomCity = city[Math.floor(Math.random() * city.length)];
  const startDateMarkup = formatDate(startDate);
  const endDateMarkup = formatDate(endDate);
  const startTimeMarkup = startDateMarkup.slice(9);
  const endTimeMarkup = endDateMarkup.slice(9);
  const priceMarkup = price;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${icon}" alt="Event type icon">
        </div>
        <h3 class="event__title">${routeType} ${randomCity}</h3>
  
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateMarkup}">${startTimeMarkup}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateMarkup}">${endTimeMarkup}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>
  
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${priceMarkup}</span>
        </p>
  
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          
        </ul>
  
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
