import DayWithTrips from "../components/day-with-trips.js";
import Sort, {SortType} from "../components/sort.js";
import ListOfDays from "../components/list-of-days.js";
import NoTripItem from "../components/no-trip-item.js";
import {cards} from "../mock/cards.js";
import {renderElement} from "../utils/render.js";
import PointController from "./point-controller.js";

const renderEvents = (events, tripDay, onDataChange, isDefaultSorting = true) => {
  const dates = isDefaultSorting ? [...new Set(events.map((item) => new Date(item.startDate).toDateString()))] : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting ? new DayWithTrips(date, dateIndex + 1) : new DayWithTrips();

    events.filter((_card) => {
      return isDefaultSorting ? new Date(_card.startDate).toDateString() === date : _card;
    }).forEach((_card) => {
      const pointController = new PointController(day, onDataChange);
      pointController.renderPoint(_card);
    });

    renderElement(tripDay.getElement(), day);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._sortComponent = new Sort();
    this._dayComponent = new ListOfDays();
    this._noTripItemComponent = new NoTripItem();

    this._onDataChange = this._onDataChange.bind(this);
  }

  render(events) {
    renderElement(this._container, this._sortComponent);
    renderElement(this._container, this._dayComponent);

    if (events.length === 0) {
      renderElement(this._container, this._noTripItemComponent, `beforeend`);
      return;
    }

    renderEvents(events, this._dayComponent, this._onDataChange);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedEvents = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.TIME:
          sortedEvents = cards.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
          break;
        case SortType.PRICE:
          sortedEvents = cards.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.EVENT:
          sortedEvents = cards.slice();
          isDefaultSorting = true;
          break;
      }

      this._dayComponent.getElement().innerHTML = ``;
      renderEvents(sortedEvents, this._dayComponent, isDefaultSorting);
    });
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.renderPoint(this._events[index]);
  }
}
