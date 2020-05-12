import Day from "../components/day.js";
import Sort from "../components/sort.js";
import Days from "../components/days.js";
import EventItem from "../components/event-item.js";
import NoTripItem from "../components/no-trip-item.js";
import {cards} from "../mock/cards.js";
import {SortType} from "../const.js";
import {renderElement} from "../utils/render.js";
import PointController, {Mode as PointControllerMode, EmptyEvent} from "./point-controller.js";

const renderEvents = (events, tripDay, onDataChange, onViewChange, isDefaultSorting = true) => {
  const dates = isDefaultSorting ? [...new Set(events.map((item) => new Date(item.startDate).toDateString()))] : [true];

  const pointControllers = [];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting ? new Day(date, dateIndex + 1) : new Day();

    events.filter((_card) => {
      return isDefaultSorting ? new Date(_card.startDate).toDateString() === date : _card;
    }).forEach((_card) => {
      const pointController = new PointController(day, onDataChange, onViewChange);
      pointController.renderPoint(_card, PointControllerMode.DEFAULT);
      pointControllers.push(pointController);
    });

    renderElement(tripDay.getElement(), day);
  });
  return pointControllers;
};

export default class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._showedEventControllers = [];
    this._sortComponent = new Sort();
    this._daysComponent = new Days();
    this._noTripItemComponent = new NoTripItem();
    this._eventItem = new EventItem();
    this._creatingEvent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const events = this._eventsModel.getEvents();

    renderElement(this._container, this._sortComponent);
    renderElement(this._container, this._daysComponent);

    if (events.length === 0) {
      renderElement(this._container, this._noTripItemComponent, `beforeend`);
      return;
    }

    this._showedEventControllers = renderEvents(events, this._daysComponent, this._onDataChange, this._onViewChange);
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._creatingEvent = new PointController(this._daysComponent.getElement(), this._onDataChange, this._onViewChange);
    this._creatingEvent.renderPoint(EmptyEvent, PointControllerMode.ADDING);
    this._onViewChange();
  }

  _onSortTypeChange(sortType) {
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

    this._removeEvents();
    this._showedEventControllers = renderEvents(sortedEvents, this._daysComponent, this._onDataChange, this._onViewChange, isDefaultSorting);
  }

  _removeEvents() {
    this._daysComponent.getElement().innerHTML = ``;
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _renderEvents(events) {
    const newEvents = renderEvents(events, this._daysComponent, this._onDataChange, this._onViewChange);
    this._showedEventControllers = this._showedEventControllers.concat(newEvents);
  }

  _updateEvents() {
    this._removeEvents();
    this._renderEvents(this._eventsModel.getEvents());
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        pointController.destroy();
        this._updateEvents();
      } else {
        this._eventsModel.addEvent(newData);
        pointController.renderPoint(newData, PointControllerMode.DEFAULT);
        this._showedEventControllers = [].concat(pointController, this._showedEventControllers);
      }
    } else if (newData === null) {
      this._eventsModel.removeEvent(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

      if (isSuccess) {
        pointController.renderPoint(newData, PointControllerMode.DEFAULT);
      }
    }
  }
}
