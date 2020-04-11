import {createTripTemplate} from "./components/trip.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createTripEventEditTemplate} from "./components/trip-edit.js";
import {createTripEventsTemplate} from "./components/trip-events.js";
import {createTripDayTemplate} from "./components/trip-day.js";
import {createTripItemTemplate} from "./components/trip-item.js";
import {task} from "./mock/trip-events.js";
import {list} from "./mock/filters.js";

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
render(siteTripControlsElement, createFiltersTemplate(list), `beforeend`);
render(siteTripEventsElement, createTripEventEditTemplate(), `beforeend`);
render(siteTripEventsElement, createTripEventsTemplate(task), `beforeend`);
render(siteTripEventsElement, createTripDayTemplate(), `beforeend`);

const siteTripEventsList = siteMainElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripEventsList, createTripItemTemplate(task), `afterbegin`);
}
