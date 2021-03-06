import {getEventsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Events {
  constructor() {
    this._events = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._isCreatingMode = false;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._modeChangeHandlers = [];
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getAllEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = Array.from(events);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  getFilter() {
    return this._activeFilterType;
  }

  getIsCreatingMode() {
    return this._isCreatingMode;
  }

  setIsCreatingMode(mode = false) {
    this._isCreatingMode = mode;
    this._callHandlers(this._modeChangeHandlers);
  }

  removeEvent(id) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addEvent(event) {
    this._events = [].concat(event, this._events);
    this._callHandlers(this._dataChangeHandlers);
  }

  setModeChangeHandler(handler) {
    this._modeChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
