import API from "./api.js";
import Trip from "./components/trip.js";
import Cost from "./components/cost.js";
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

const siteTripMainElement = document.querySelector(`.trip-main`);
const siteTripControlsElement = document.querySelector(`.trip-controls`);
const pageBodyContainer = document.querySelector(`main .page-body__container`);
const menuComponent = new Menu();
const api = new API(SERVER_URL, AUTHORIZATION);
const eventsModel = new EventsModel();
const loading = new Loading();
const filterController = new FilterController(siteTripControlsElement, eventsModel);
const trip = new Trip(eventsModel);
const cost = new Cost(eventsModel);
const eventsBoard = new EventsBoard();
const tripController = new TripController(eventsBoard, eventsModel, api);
const statisticsComponent = new Statistics(eventsModel);

renderElement(siteTripControlsElement, menuComponent, `afterbegin`);
renderElement(pageBodyContainer, loading);
filterController.render();
renderElement(pageBodyContainer, eventsBoard, `afterbegin`);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createEvent();
});

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

api.getData()
  .then((events) => {
    eventsModel.setEvents(events);
    remove(loading);

    renderElement(siteTripMainElement, trip, `afterbegin`);
    const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
    renderElement(siteTripInfoElement, cost, `beforeend`);

    tripController.render();
  });
