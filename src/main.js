import TripComponent from "./components/trip.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FiltersComponent from "./components/filters.js";
import TripEventEditComponent from "./components/trip-edit.js";
import TripEventsComponent from "./components/trip-events.js";
import TripDayComponent from "./components/trip-day.js";
import TripItemComponent from "./components/trip-item.js";
import TripDaysItemComponent from "./components/trip-days-item.js";
import NoTripItemComponent from "./components/no-trip-item.js";
import NoTripComponent from "./components/no-trip.js";
import NoCostComponent from "./components/no-cost.js";
import {cards} from "./mock/cards.js";
import {render, replace} from "./utils/render.js";

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripControlsElement, new MenuComponent(), `afterbegin`);
render(siteTripControlsElement, new FiltersComponent(), `beforeend`);

const getAllMarkup = () => {
  render(siteTripMainElement, new TripComponent(cards), `afterbegin`);

  const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

  render(siteTripInfoElement, new CostComponent(cards), `beforeend`);
  render(siteTripEventsElement, new TripEventEditComponent(), `beforeend`);
  render(siteTripEventsElement, new TripDayComponent(), `beforeend`);

  const tripDays = document.querySelector(`.trip-days`);

  const dates = [
    ...new Set(cards.map((item) => new Date(item.startDate).toDateString()))
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

      render(tripEventsList, tripItem);

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          tripEventsToTripItem();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      if (tripItem.setClickHandler(() => {
        render(tripEventsList, tripEvents);
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

    render(tripDays, day);
  });

};

if (cards.length === 0) {
  render(siteTripMainElement, new NoTripComponent(), `afterbegin`);

  const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

  render(siteTripInfoElement, new NoCostComponent(), `beforeend`);
  render(siteTripEventsElement, new NoTripItemComponent(), `beforeend`);
} else {
  getAllMarkup();
}

