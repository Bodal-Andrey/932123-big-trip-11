import AbstractComponent from "./abstract-component.js";

const createListOfDaysTemplate = () => {
  return (
    `<ul class="trip-days">
      
    </ul>`
  );
};

export default class ListOfDays extends AbstractComponent {
  getTemplate() {
    return createListOfDaysTemplate();
  }
}
