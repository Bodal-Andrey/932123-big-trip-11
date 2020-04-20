import TripComponent from "./components/trip.js";
import CostComponent from "./components/cost.js";
import MenuComponent from "./components/menu.js";
import FiltersComponent from "./components/filters.js";
import TripEventEditComponent from "./components/trip-edit.js";
import TripEventsComponent from "./components/trip-events.js";
import TripDayComponent from "./components/trip-day.js";
import TripItemComponent from "./components/trip-item.js";
import TripDaysItemComponent from "./components/trip-days-item.js";
import {cards} from "./mock/cards.js";
import {render} from "./utils.js";

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, new TripComponent(cards).getElement(), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, new CostComponent(cards).getElement(), `beforeend`);
render(siteTripControlsElement, new MenuComponent().getElement(), `afterbegin`);
render(siteTripControlsElement, new FiltersComponent().getElement(), `beforeend`);
render(siteTripEventsElement, new TripEventEditComponent().getElement(), `beforeend`);
render(siteTripEventsElement, new TripDayComponent().getElement(), `beforeend`);

const tripDays = document.querySelector(`.trip-days`);

const dates = [
  ...new Set(cards.map((item) => new Date(item.startDate).toDateString()))
];

dates.forEach((date, dateIndex) => {
  const day = new TripDaysItemComponent(date, dateIndex + 1).getElement();

  cards.filter((_card) => new Date(_card.startDate).toDateString() === date)
  .forEach((_card) => {
    const tripItem = new TripItemComponent(_card).getElement();
    const tripEvents = new TripEventsComponent(_card).getElement();
    const tripEventsList = day.querySelector(`.trip-events__list`);
    const tripEventsToTripItem = () => {
      tripEventsList.replaceChild(tripItem, tripEvents);
    };
    const tripItemToTripEvents = () => {
      tripEventsList.replaceChild(tripEvents, tripItem);
    };

    render(tripEventsList, tripItem);
    render(tripEventsList, tripEvents);

    const eventForm = tripEventsList.querySelector(`form`);
    const eventRollupButton = tripItem.querySelector(`.event__rollup-btn`);

    eventForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      tripEventsToTripItem();
    });

    eventRollupButton.addEventListener(`click`, () => {
      tripItemToTripEvents();
    });
  });

  render(tripDays, day);
});


