import FormNewTrip from "../components/form-new-trip.js";
import TripItem from "../components/trip-item.js";
import DayWithTrips from "../components/day-with-trips.js";
import Sort, {SortType} from "../components/sort.js";
import ListOfDays from "../components/list-of-days.js";
import NoTripItem from "../components/no-trip-item.js";
import {cards} from "../mock/cards.js";
import {renderElement, replace} from "../utils/render.js";

const renderEvents = (events, tripDay, isDefaultSorting = true) => {
  const dates = isDefaultSorting ? [...new Set(events.map((item) => new Date(item.startDate).toDateString()))] : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting ? new DayWithTrips(date, dateIndex + 1) : new DayWithTrips();

    events.filter((_card) => {
      return isDefaultSorting ? new Date(_card.startDate).toDateString() === date : _card;
    }).forEach((_card) => {
      const tripItem = new TripItem(_card);
      const newTrip = new FormNewTrip(_card);
      const tripEventsList = day.getElement().querySelector(`.trip-events__list`);
      const tripEventsToTripItem = () => {
        replace(tripItem, newTrip);
      };
      const tripItemToTripEvents = () => {
        replace(newTrip, tripItem);
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
        renderElement(tripEventsList, newTrip);
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

    renderElement(tripDay.getElement(), day);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new Sort();
    this._dayComponent = new ListOfDays();
    this._noTripItemComponent = new NoTripItem();
  }

  render(events) {
    renderElement(this._container, this._sortComponent);
    renderElement(this._container, this._dayComponent);

    if (events.length === 0) {
      renderElement(this._container, this._noTripItemComponent, `beforeend`);
      return;
    }

    renderEvents(events, this._dayComponent);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedEvents = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.TIME:
          sortedEvents = cards.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
          break;
        case SortType.PRICE:
          sortedEvents = cards.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.EVENT:
          sortedEvents = cards.slice();
          isDefaultSorting = true;
          break;
      }

      this._dayComponent.getElement().innerHTML = ``;
      renderEvents(sortedEvents, this._dayComponent, isDefaultSorting);
    });
  }
}
