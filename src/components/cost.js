import {createElement} from "../utils.js";

const createCostTemplate = (card) => {
  const arr = [];
  card.forEach((it) => {
    arr.push(it.price);
  });
  const sumOfCosts = arr.reduce((sum, current) => sum + current, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumOfCosts}</span>
    </p>`
  );
};

export default class Cost {
  constructor(card) {
    this._card = card;

    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._card);
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
