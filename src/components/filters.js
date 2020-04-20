import {createElement} from "../utils.js";

const createFilterMarkup = (value, isChecked) => {
  const name = value.toLowerCase();
  return (
    `<div class="trip-filters__filter">
    <input 
    id="filter-${name}" 
    class="trip-filters__filter-input  visually-hidden" 
    type="radio" 
    name="trip-filter" 
    value="${name}" 
    ${isChecked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${name}">${value}</label>
  </div>`
  );
};

const createFiltersTemplate = () => {
  const list = [`Everything`, `Future`, `Past`];
  const filterMarkup = list.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filterMarkup}  
      <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
  );
};

export default class Filters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate();
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
