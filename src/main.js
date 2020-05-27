import API from "./api.js";
// import Trip from "./components/trip.js";
// import Cost from "./components/cost.js";
import Menu from "./components/menu.js";
import FilterController from "./controllers/filter-controller.js";
import EventsModel from "./models/events.js";
import EventsBoard from "./components/events-board.js";
import Loading from "./components/loading.js";
import {renderElement, remove} from "./utils/render.js";
import Statistics from "./components/statistics.js";
import TripController from "./controllers/trip-controller.js";
import {MenuItem} from "./const.js";

const AUTHORIZATION = `Basic mJK256BmlfdmhHDNC`;
const SERVER_URL = `https://11.ecmascript.pages.academy/big-trip`;

// const siteTripMainElement = document.querySelector(`.trip-main`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const pageBodyContainer = document.querySelector(`main .page-body__container`);

const menuComponent = new Menu();
renderElement(siteTripControlsElement, menuComponent, `afterbegin`);

const api = new API(SERVER_URL, AUTHORIZATION);
const eventsModel = new EventsModel();
// eventsModel.setEvents(cards);

const loading = new Loading();

const filterController = new FilterController(siteTripControlsElement, eventsModel);
filterController.render();

// renderElement(siteTripMainElement, new Trip(cards), `afterbegin`);

// const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

// renderElement(siteTripInfoElement, new Cost(cards), `beforeend`);

const eventsBoard = new EventsBoard();
renderElement(pageBodyContainer, eventsBoard, `afterbegin`);

const tripController = new TripController(eventsBoard, eventsModel, api);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createEvent();
});

const statisticsComponent = new Statistics(eventsModel);
renderElement(pageBodyContainer, statisticsComponent, `beforeend`);
statisticsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      menuComponent.setActiveItem(menuItem);
      tripController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TABLE:
      menuComponent.setActiveItem(menuItem);
      statisticsComponent.hide();
      tripController.show();
  }
});

api.getEvents()
  .then((events) => {
    eventsModel.setEvents(events);
    remove(loading);
    tripController.render();
  });
