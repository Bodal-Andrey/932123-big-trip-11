import Day from "../components/day.js";
import Sort, {SortType} from "../components/sort.js";
import Days from "../components/days.js";
import NoTripItem from "../components/no-trip-item.js";
import {cards} from "../mock/cards.js";
import {renderElement} from "../utils/render.js";
import PointController from "./point-controller.js";

const renderEvents = (events, tripDay, onDataChange, onViewChange, isDefaultSorting = true) => {
  const dates = isDefaultSorting ? [...new Set(events.map((item) => new Date(item.startDate).toDateString()))] : [true];

  const pointControllers = [];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting ? new Day(date, dateIndex + 1) : new Day();

    events.filter((_card) => {
      return isDefaultSorting ? new Date(_card.startDate).toDateString() === date : _card;
    }).forEach((_card) => {
      const pointController = new PointController(day, onDataChange, onViewChange);
      pointController.renderPoint(_card);
      pointControllers.push(pointController);
    });

    renderElement(tripDay.getElement(), day);
  });
  return pointControllers;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._showedPointControllers = [];
    this._sortComponent = new Sort();
    this._daysComponent = new Days();
    this._noTripItemComponent = new NoTripItem();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(events) {
    this._events = events;

    renderElement(this._container, this._sortComponent);
    renderElement(this._container, this._daysComponent);

    if (events.length === 0) {
      renderElement(this._container, this._noTripItemComponent, `beforeend`);
      return;
    }

    this._showedPointControllers = renderEvents(events, this._daysComponent, this._onDataChange, this._onViewChange);

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

      this._daysComponent.getElement().innerHTML = ``;
      this._showedPointControllers = renderEvents(sortedEvents, this._daysComponent, this._onDataChange, this._onViewChange, isDefaultSorting);
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

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }
}
