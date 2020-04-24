import TripComponent from "./components/trip.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FiltersComponent from "./components/filters.js";
// import SortComponent from "./components/sort.js";
// import TripEventsComponent from "./components/trip-events.js";
// import TripDayComponent from "./components/trip-day.js";
// import TripItemComponent from "./components/trip-item.js";
// import TripDaysItemComponent from "./components/trip-days-item.js";
import NoTripItemComponent from "./components/no-trip-item.js";
import NoTripComponent from "./components/no-trip.js";
import NoCostComponent from "./components/no-cost.js";
import {cards} from "./mock/cards.js";
import {renderElement} from "./utils/render.js";
import TripController from "./controllers/trip-controller.js";

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

renderElement(siteTripControlsElement, new MenuComponent(), `afterbegin`);
renderElement(siteTripControlsElement, new FiltersComponent(), `beforeend`);
renderElement(siteTripMainElement, new TripComponent(cards), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

renderElement(siteTripInfoElement, new CostComponent(cards), `beforeend`);

const tripController = new TripController(siteTripEventsElement);

if (cards.length === 0) {
  renderElement(siteTripMainElement, new NoTripComponent(), `afterbegin`);
  renderElement(siteTripInfoElement, new NoCostComponent(), `beforeend`);
  renderElement(siteTripEventsElement, new NoTripItemComponent(), `beforeend`);
} else {
  tripController.render(cards);
}

