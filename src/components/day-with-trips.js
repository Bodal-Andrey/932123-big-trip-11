import AbstractComponent from "./abstract-component.js";

const createDayWithTripsTemplate = (date, index) => {
  if (date && index) {
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
  } else {
    return (
      `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter"></span>
        <time class="day__date" datetime="2019-03-18"></time>
      </div>
  
      <ul class="trip-events__list"></ul>
    </li>`
    );
  }
};

export default class DayWithTrips extends AbstractComponent {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createDayWithTripsTemplate(this._date, this._index);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }
}
