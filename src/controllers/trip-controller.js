import TripEventsComponent from "../components/trip-events.js";
import TripItemComponent from "../components/trip-item.js";
import TripDaysItemComponent from "../components/trip-days-item.js";
import SortComponent from "../components/sort.js";
import TripDayComponent from "../components/trip-day.js";
import {cards} from "../mock/cards.js";
import {renderElement, replace} from "../utils/render.js";


export default class TripController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._dayComponent = new TripDayComponent();
  }

  render(events) {
    renderElement(this._container, this._sortComponent);
    renderElement(this._container, this._dayComponent);

    const dates = [
      ...new Set(events.map((item) => new Date(item.startDate).toDateString()))
    ];

    dates.forEach((date, dateIndex) => {
      const day = new TripDaysItemComponent(date, dateIndex + 1);

      cards.filter((_card) => new Date(_card.startDate).toDateString() === date)
      .forEach((_card) => {
        const tripItem = new TripItemComponent(_card);
        const tripEvents = new TripEventsComponent(_card);
        const tripEventsList = day.getElement().querySelector(`.trip-events__list`);
        const tripEventsToTripItem = () => {
          replace(tripItem, tripEvents);
        };
        const tripItemToTripEvents = () => {
          replace(tripEvents, tripItem);
        };

        renderElement(tripEventsList, tripItem);

        const onEscKeyDown = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
          if (isEscKey) {
            tripEventsToTripItem();
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        if (tripItem.setClickHandler(() => {
          renderElement(tripEventsList, tripEvents);
          tripItemToTripEvents();
          document.addEventListener(`keydown`, onEscKeyDown);
        })) {
          day.setSubmitHandler((evt) => {
            evt.preventDefault();
            tripEventsToTripItem();
            document.removeEventListener(`keydown`, onEscKeyDown);
          });
        }
      });

      renderElement(this._dayComponent.getElement(), day);
    });
  }
}
