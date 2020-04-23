import AbstractComponent from "./abstract-component.js";

const noTripTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class NoTrip extends AbstractComponent {
  getTemplate() {
    return noTripTemplate();
  }
}
