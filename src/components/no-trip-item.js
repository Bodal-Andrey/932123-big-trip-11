import AbstractComponent from "./abstract-component.js";

const noTripItemTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoTripItem extends AbstractComponent {
  getTemplate() {
    return noTripItemTemplate();
  }
}
