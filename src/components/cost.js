import AbstractSmartComponent from "./abstract-smart-component.js";

const createCostTemplate = (card) => {
  if (card.length > 0) {
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
  } else {
    return (
      `<p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
        </p>`
    );
  }

};

export default class Cost extends AbstractSmartComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;
    this._events = this._eventsModel.getEvents();
  }

  getTemplate() {
    return createCostTemplate(this._events);
  }
}
