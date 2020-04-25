import FormNewTrip from "../components/form-new-trip.js";
import TripItem from "../components/trip-item.js";
import DayWithTrips from "../components/day-with-trips.js";
import Sort, {SortType} from "../components/sort.js";
import ListOfDays from "../components/list-of-days.js";
import NoTripItem from "../components/no-trip-item.js";
import {cards} from "../mock/cards.js";
import {renderElement, replace} from "../utils/render.js";

const renderEvents = (events, tripDay) => {
  const dates = [
    ...new Set(events.map((item) => new Date(item.startDate).toDateString()))
  ];

  dates.forEach((date, dateIndex) => {
    const day = new DayWithTrips(date, dateIndex + 1);

    cards.filter((_card) => new Date(_card.startDate).toDateString() === date)
    .forEach((_card) => {
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

const getSortedEvents = (events, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.EVENT:
      sortedEvents = showingEvents;
      break;
  }
  return sortedEvents.slice(from, to);
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
      const sortedEvents = getSortedEvents(events, sortType, 0, events.length);
      this._dayComponent.innerHTML = ``;

      renderEvents(sortedEvents, this._dayComponent);
    });
  }
}
