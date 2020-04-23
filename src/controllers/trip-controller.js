import TripEventsComponent from "./components/trip-events.js";
import TripItemComponent from "./components/trip-item.js";
import TripDaysItemComponent from "./components/trip-days-item.js";
import {cards} from "./mock/cards.js";
import {render, replace} from "./utils/render.js";

const tripDays = document.querySelector(`.trip-days`);

const dates = [
  ...new Set(cards.map((item) => new Date(item.startDate).toDateString()))
];

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render() {
    dates.forEach((date, dateIndex) => {
    //   const day = new TripDaysItemComponent(date, dateIndex + 1);

      cards.filter((_card) => new Date(_card.startDate).toDateString() === date)
        .forEach((_card) => {
          const tripItem = new TripItemComponent(_card);
          const tripEvents = new TripEventsComponent(_card);
          const container = this._container.getElement().querySelector(`.trip-events__list`);
          const tripEventsToTripItem = () => {
            replace(tripItem, tripEvents);
          };
          const tripItemToTripEvents = () => {
            replace(tripEvents, tripItem);
          };

          render(container, tripItem);

          const onEscKeyDown = (evt) => {
            const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
            if (isEscKey) {
              tripEventsToTripItem();
              document.removeEventListener(`keydown`, onEscKeyDown);
            }
          };

          if (tripItem.setClickHandler(() => {
            render(container, tripEvents);
            tripItemToTripEvents();
            document.addEventListener(`keydown`, onEscKeyDown);
          })) {
            this._container.setSubmitHandler((evt) => {
              evt.preventDefault();
              tripEventsToTripItem();
              document.removeEventListener(`keydown`, onEscKeyDown);
            });
          }
        });

      render(tripDays, this._container);
    });

  }
}
