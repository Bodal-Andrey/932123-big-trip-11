import Event from "./models/event.js";
import Store from "./store.js";
import {Method} from "./const.js";

const URLS = [`destinations`, `offers`, `points`];

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getData() {
    const requests = URLS.map((it) => this._load({url: it}));
    return Promise.all(requests)
    .then((responses) => Promise.all(responses.map((it) => it.json())))
    .then((responses) => {
      const [destinations, offers, points] = responses;
      Store.setDestinations(destinations);
      Store.setOffers(offers);
      return points;
    })
    .then(Event.parseEvents);
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Event.parseEvents);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then(Store.setOffers);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then(Store.setDestinations);
  }

  createPoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.POST,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then((response) => response.json())
    .then(Event.parseEvent);
  }

  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then((response) => response.json())
    .then(Event.parseEvent);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
