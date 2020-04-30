import FormNewTrip from "../components/form-new-trip.js";
import TripItem from "../components/trip-item.js";
import {renderElement, replace} from "../utils/render.js";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._tripItem = null;
    this._newTrip = null;
    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  renderPoint(event) {
    this._tripItem = new TripItem(event);
    this._newTrip = new FormNewTrip(event);

    const tripEventsList = this._container.getElement().querySelector(`.trip-events__list`);

    renderElement(tripEventsList, this._tripItem);

    this._newTrip.setFavoriteHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event));
    });

    if (this._tripItem.setClickHandler(() => {
      renderElement(tripEventsList, this._newTrip);
      this._tripItemToTripEvents();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    })) {
      this._container.setSubmitHandler((evt) => {
        evt.preventDefault();
        this._tripEventsToTripItem();
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      });
    }
  }

  _tripEventsToTripItem() {
    replace(this._tripItem, this._newTrip);
  }

  _tripItemToTripEvents() {
    replace(this._newTrip, this._tripItem);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._tripEventsToTripItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
