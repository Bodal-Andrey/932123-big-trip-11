import Event from "./models/event.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/`, {headers})
    .then((response) => response.json())
    .then(Event.parseEvents);
  }

  updateEvent(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data),
      headers,
    })
      .then((response) => response.json())
      .then(Event.parseEvents);
  }
};

export default API;
