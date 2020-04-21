import {createElement} from "../utils.js";

const noTripItemTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoTripItem {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return noTripItemTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

