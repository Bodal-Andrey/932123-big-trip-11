import AbstractComponent from "./abstract-component.js";

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

const SORT_ID_PREFIX = `sort-`;

const getSortNameById = (id) => {
  return id.substring(SORT_ID_PREFIX.length);
};

const createSortMarkup = (sort, isChecked) => {
  const {name} = sort;

  return (
    `<input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? `checked` : ``}>
    <label class="trip-sort__btn" data-sort-type="${name}" for="sort-${name}">${name}</label>`
  );
};

const createSortTemplate = (sorts) => {
  const sortsMarkup = sorts.map((it) => createSortMarkup(it, it.checked)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
  
      <div class="trip-sort__item  trip-sort__item--event">
       ${sortsMarkup}
      </div>
  
      <div class="trip-sort__item  trip-sort__item--time">
        ${sortsMarkup}
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>
  
      <div class="trip-sort__item  trip-sort__item--price">
        ${sortsMarkup}
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>
  
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sort extends AbstractComponent {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return createSortTemplate(this._sorts);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const sortName = getSortNameById(evt.target.id);
      handler(sortName);
    });
  }
}
