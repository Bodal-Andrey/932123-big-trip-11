import AbstractComponent from "./abstract-component.js";

const createDayTemplate = (date, index) => {
  const dateVariant = date ? date : ``;
  const indexVariant = index ? index : ``;
  const dateItem = dateVariant.slice(4, 10);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${indexVariant}</span>
        <time class="day__date" datetime="2019-03-18">${dateItem}</time>
      </div>
  
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._index);
  }
}
