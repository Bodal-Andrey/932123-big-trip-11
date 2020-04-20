import {createElement} from "../utils.js";

const createTripDayTemplate = () => {
  return (
    `<ul class="trip-days">
      
    </ul>`
  );
};

export default class TripDay {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate();
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
