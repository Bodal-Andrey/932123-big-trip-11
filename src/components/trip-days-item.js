import {createElement} from "../utils.js";

const createTripDaysItemTemplate = (date, index) => {
  const dateItem = date.slice(4, 10);

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index}</span>
      <time class="day__date" datetime="2019-03-18">${dateItem}</time>
    </div>

    <ul class="trip-events__list"></ul>
  </li>`
  );
};

export default class TripDaysItem {
  constructor(date, index) {
    this._date = date;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._date, this._index);
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

