import Event from "./models/event.js";
import {ServerUrl} from "./const.js";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getData() {
    return Promise.all([
      this.getTripEvents(),
      this.getOffers(),
      this.getDestinations(),
    ])
      .then((response) => {
        const [tripEvents, offers, destinations] = response;
        return {
          tripEvents,
          offers,
          destinations,
        };
      });
  }

  getEvents() {
    return this._load({
      url: ServerUrl.POINTS,
      method: `GET`,
    })
      .then((response) => response.json())
      .then(Event.parseEvents);
  }

  // updateEvent(id, data) {
  //   return this._load({
  //     url: `points/${id}`,
  //     method: Method.PUT,
  //     body: JSON.stringify(data.toRAW()),
  //     headers: new Headers({"Content-Type": `application/json`})
  //   })
  //     .then((response) => response.json())
  //     .then(Event.parseEvent);
  // }

  getOffers() {
    return this._load({
      url: ServerUrl.OFFERS,
      method: `GET`,
    })
      .then((response) => response.json());
  }

  getDestinations() {
    return this._load({
      url: ServerUrl.DESTINATIONS,
      method: `GET`,
    })
      .then((response) => response.json());
  }


  _load({url, method, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(url, {method, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
