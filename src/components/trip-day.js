import AbstractComponent from "./abstract-component.js";

const createTripDayTemplate = () => {
  return (
    `<ul class="trip-days">
      
    </ul>`
  );
};

export default class TripDay extends AbstractComponent {
  getTemplate() {
    return createTripDayTemplate();
  }
}
