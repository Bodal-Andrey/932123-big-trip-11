export default class Event {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.city = data[`city`];
    this.startDate = new Date(data[`date_from`]);
    this.endDate = new Date(data[`date_to`]);
    this.nowDate = new Date();
    this.price = data[`price`];
    this.description = data[`description`] || ``;
    this.offers = data[`offers`];
    this.photos = data[`photos`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isNew = false;
  }

  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }
}
