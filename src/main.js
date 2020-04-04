import {createTripTemplate} from "./components/trip.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createTripEventEditTemplate} from "./components/tripedit.js";
import {createTripEventsTemplate} from "./components/tripevents.js";
import {createTripDayTemplate} from "./components/tripday.js";
import {createTripItemTemplate} from "./components/tripitem.js";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, createTripTemplate(), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, createCostTemplate(), `beforeend`);
render(siteTripControlsElement, createMenuTemplate(), `afterbegin`);
render(siteTripControlsElement, createFiltersTemplate(), `beforeend`);
render(siteTripEventsElement, createTripEventEditTemplate(), `beforeend`);
render(siteTripEventsElement, createTripEventsTemplate(), `beforeend`);
render(siteTripEventsElement, createTripDayTemplate(), `beforeend`);

const siteTripEventsList = siteMainElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripEventsList, createTripItemTemplate(), `afterbegin`);
}
