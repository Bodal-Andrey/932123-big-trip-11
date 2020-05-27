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
  }

  toRAW() {
    return {
      "id": this.id,
      "type": this.type,
      "city": this.city,
      "date_from": this.startDate,
      "date_to": this.endDate,
      "price": this.price,
      "description": this.description,
      "offers": this.offers,
      "photos": this.photos,
      "is_favorite": this.isFavorite,
    };
  }

  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }

  static clone(data) {
    return new Event(data.toRAW());
  }
}
