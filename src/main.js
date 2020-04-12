import {createTripTemplate} from "./components/trip.js";
import {createCostTemplate} from "./components/cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createTripEventEditTemplate} from "./components/trip-edit.js";
import {createTripEventsTemplate} from "./components/trip-events.js";
import {createTripDayTemplate} from "./components/trip-day.js";
import {createTripItemTemplate} from "./components/trip-item.js";
import {createEventOfferTemplate} from "./components/event-offer.js";
import {task} from "./mock/trip-events.js";
import {list} from "./mock/filters.js";
import {trip} from "./mock/trip.js";
import {cost} from "./mock/cost.js";
import {getRandomInteger} from "./utils.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// const render = (container, component, place) => {
//   switch (place) {
//     case RenderPosition.AFTERBEGIN:
//       container.prepend(component);
//       break;
//     case RenderPosition.BEFOREEND:
//       container.append(component);
//       break;
//   }
// };

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, createTripTemplate(trip), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, createCostTemplate(cost), `beforeend`);
render(siteTripControlsElement, createMenuTemplate(), `afterbegin`);
render(siteTripControlsElement, createFiltersTemplate(list), `beforeend`);
render(siteTripEventsElement, createTripEventEditTemplate(), `beforeend`);
render(siteTripEventsElement, createTripEventsTemplate(task[0]), `beforeend`);
render(siteTripEventsElement, createTripDayTemplate(), `beforeend`);

const siteTripEventsList = siteMainElement.querySelector(`.trip-events__list`);

for (let i = 0; i < getRandomInteger(2, 5); i++) {
  render(siteTripEventsList, createTripItemTemplate(task[i]), `afterbegin`);
}

const eventOfferList = siteTripEventsList.querySelectorAll(`.event__selected-offers`);

eventOfferList.forEach(() => {
  for (let i = 0; i < getRandomInteger(1, 4); i++) {
    render(eventOfferList, createEventOfferTemplate(task[i]), `beforeend`);
  }
});

