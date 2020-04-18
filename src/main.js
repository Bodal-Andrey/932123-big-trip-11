import {createTripTemplate} from "./components/trip.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createTripEventEditTemplate} from "./components/trip-edit.js";
import {createTripEventsTemplate} from "./components/trip-events.js";
import {createTripDayTemplate} from "./components/trip-day.js";
import {createTripItemTemplate} from "./components/trip-item.js";
import {createTripDaysItemTemplate} from "./components/trip-days-item.js";
import {cards} from "./mock/cards.js";
import {createElement, render} from "./utils.js";

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, createElement(createTripTemplate(cards)), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, createElement(createCostTemplate(cards)), `beforeend`);
render(siteTripControlsElement, createElement(createMenuTemplate()), `afterbegin`);
render(siteTripControlsElement, createElement(createFiltersTemplate()), `beforeend`);
render(siteTripEventsElement, createElement(createTripEventEditTemplate()), `beforeend`);
render(siteTripEventsElement, createElement(createTripDayTemplate()), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);

const dates = [
  ...new Set(cards.map((item) => new Date(item.startDate).toDateString()))
];

dates.forEach((date, dateIndex) => {
  const day = createElement(createTripDaysItemTemplate(date, dateIndex + 1));

  cards.filter((_card) => new Date(_card.startDate).toDateString() === date)
  .forEach((_card, index) => {
    if (index === 0) {
      render(day.querySelector(`.trip-events__list`), createElement(createTripEventsTemplate(_card)));
    } else {
      render(day.querySelector(`.trip-events__list`), createElement(createTripItemTemplate(_card)));
    }
  });

  render(tripDays, day);
});


