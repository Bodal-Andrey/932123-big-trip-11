import Trip from "./components/trip.js";
import Cost from "./components/cost.js";
import Menu, {MenuItem} from "./components/menu.js";
import FilterController from "./controllers/filter-controller.js";
import EventsModel from "./models/events.js";
import {cards} from "./mock/cards.js";
import {renderElement} from "./utils/render.js";
import TripController from "./controllers/trip-controller.js";

const siteTripMainElement = document.querySelector(`.trip-main`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const siteTripEventsElement = document.querySelector(`.trip-events`);

renderElement(siteTripControlsElement, new Menu(), `afterbegin`);

const eventsModel = new EventsModel();
eventsModel.setEvents(cards);

const filterController = new FilterController(siteTripControlsElement, eventsModel);
filterController.render();

renderElement(siteTripMainElement, new Trip(cards), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

renderElement(siteTripInfoElement, new Cost(cards), `beforeend`);

const tripController = new TripController(siteTripEventsElement, eventsModel);
tripController.render();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createEvent();
});

const menuComponent = new Menu();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      Menu.setActiveItem(MenuItem.STATS);
      break;
  }
});
