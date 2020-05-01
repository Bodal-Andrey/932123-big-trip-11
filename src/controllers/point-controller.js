import EventEditItem from "../components/event-edit-item.js";
import EventItem from "../components/event-item.js";
import {renderElement, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._eventItem = null;
    this._eventEditItem = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  renderPoint(event) {
    const oldEventItem = this._eventItem;
    const oldEventEditItem = this._eventEditItem;

    this._eventItem = new EventItem(event);
    this._eventEditItem = new EventEditItem(event);

    const tripEventsList = this._container.getElement().querySelector(`.trip-events__list`);

    renderElement(tripEventsList, this._eventItem);

    this._eventEditItem.setFavoriteHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    this._eventItem.setClickHandler(() => {
      renderElement(tripEventsList, this._eventEditItem);
      this._eventItemToEventEditItem();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditItem.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._eventEditItemToEventItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    if (oldEventEditItem && oldEventItem) {
      replace(this._eventItem, oldEventItem);
      replace(this._eventEditItem, oldEventEditItem);
    } else {
      renderElement(tripEventsList, this._eventItem);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._eventEditItemToEventItem();
    }
  }

  _eventEditItemToEventItem() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditItem.reset();
    replace(this._eventItem, this._eventEditItem);
    this._mode = Mode.DEFAULT;
  }

  _eventItemToEventEditItem() {
    this._onViewChange();
    replace(this._eventEditItem, this._eventItem);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._eventEditItemToEventItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
