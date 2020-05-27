import EventEditItem from "../components/event-edit-item.js";
import EventItem from "../components/event-item.js";
import EventModel from "../models/event.js";
import moment from "moment";
import {renderElement, replace, remove} from "../utils/render.js";
import {generateCard} from "../mock/cards.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyEvent = {
  id: generateCard().id,
  type: generateCard().type,
  city: ``,
  startDate: Date.now(),
  endDate: Date.now(),
  nowDate: new Date(),
  price: ``,
  description: ``,
  offers: [],
  photos: [],
  isFavorite: false,
  isNew: true,
};

const parseFormData = (formData) => {
  return new EventModel({
    "type": formData.get(`event-type`),
    "city": formData.get(`event-destination`),
    "startDate": moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
    "endDate": moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
    "offers": formData.get(`event-offers`).map((offer) => {
      return {
        name: offer.name,
        price: offer.price,
        checked: formData.get(`event-offer-${offer.type}`) === `on` ? true : false
      };
    }),
    "photos": formData.get(`event-photos`),
    "description": formData.get(`event-description`),
    "price": Number(formData.get(`event-price`)),
    "id": formData.get(`event-id`),
    "isFavorite": formData.get(`event-favorite`) === `on`
  });
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

  renderPoint(event, mode) {
    const oldEventItem = this._eventItem;
    const oldEventEditItem = this._eventEditItem;
    this._mode = mode;

    this._eventItem = new EventItem(event);
    this._eventEditItem = new EventEditItem(event);

    this._eventEditItem.setFavoriteHandler(() => {
      // this._onDataChange(this, event, Object.assign({}, event, {
      //   isFavorite: !event.isFavorite,
      // }));
      const newEvent = EventModel.clone(event);
      newEvent.isFavorite = !newEvent.isFavorite;

      this._onDataChange(this, event, newEvent);
    });

    this._eventItem.setClickHandler(() => {
      this._eventItemToEventEditItem();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditItem.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditItem.getData();
      const data = parseFormData(formData);
      this._onDataChange(this, event, data);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditItem.setDisplaceHandler(() => {
      this._eventEditItemToEventItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditItem.setDeleteHandler(() => {
      this._onDataChange(this, event, null);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditItem && oldEventItem) {
          replace(this._eventItem, oldEventItem);
          replace(this._eventEditItem, oldEventEditItem);
          this._eventEditItemToEventItem();
        } else {
          renderElement(this._container.getElement().querySelector(`.trip-events__list`), this._eventItem);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditItem && oldEventItem) {
          remove(oldEventItem);
          remove(oldEventEditItem);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        renderElement(this._container, this._eventEditItem, `afterbegin`);
        break;
    }
  }

  destroy() {
    remove(this._eventEditItem);
    remove(this._eventItem);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._eventEditItemToEventItem();
    }
  }

  _eventEditItemToEventItem() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditItem.reset();
    if (document.contains(this._eventEditItem.getElement())) {
      replace(this._eventItem, this._eventEditItem);
    }
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
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._eventEditItemToEventItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
