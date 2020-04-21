import {createElement} from "../utils.js";

const noCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>`
  );
};

export default class NoCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return noCostTemplate();
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
