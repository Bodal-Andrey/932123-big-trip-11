import {createTripTemplate} from "./components/trip.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createTripEventEditTemplate} from "./components/trip-edit.js";
import {createTripEventsTemplate} from "./components/trip-events.js";
import {createTripDayTemplate} from "./components/trip-day.js";
import {createTripItemTemplate} from "./components/trip-item.js";
import {createEventOfferTemplate} from "./components/event-offer.js";
import {createTripDaysItemTemplate} from "./components/trip-days-item.js";
import {cards} from "./mock/trip-events.js";
import {list} from "./mock/filters.js";
import {trip} from "./mock/trip.js";
import {cost} from "./mock/cost.js";
import {getRandomInteger, createElement, render} from "./utils.js";

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, createElement(createTripTemplate(trip)), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, createElement(createCostTemplate(cost)), `beforeend`);
render(siteTripControlsElement, createElement(createMenuTemplate()), `afterbegin`);
render(siteTripControlsElement, createElement(createFiltersTemplate(list)), `beforeend`);
render(siteTripEventsElement, createElement(createTripEventEditTemplate()), `beforeend`);
render(siteTripEventsElement, createElement(createTripEventsTemplate(cards[0])), `beforeend`);
render(siteTripEventsElement, createElement(createTripDayTemplate()), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);

const dates = [
  new Set(cards.map((item) => new Date(item.startDate).toDateString()))
];

dates.forEach((date, dateIndex) => {
  const day = createElement(createTripDaysItemTemplate(new Date(date), dateIndex + 1));

  cards.filter((_card) => new Date(_card.startDate).toDateString() === date)
  .forEach((_card) => {
    render(day.querySelector(`.trip-events__list`));
  });
  render(tripDays, day);
});


const siteTripEventsList = siteMainElement.querySelector(`.trip-events__list`);

for (let i = 0; i < getRandomInteger(2, 5); i++) {
  render(siteTripEventsList, createElement(createTripItemTemplate(cards[i])), `afterbegin`);
}

const eventOfferList = siteTripEventsList.querySelectorAll(`.event__selected-offers`);

for (let i = 0; i < eventOfferList.length; i++) {
  render(eventOfferList[i], createElement(createEventOfferTemplate(cards[getRandomInteger(1, 10)]), `beforeend`));
}
