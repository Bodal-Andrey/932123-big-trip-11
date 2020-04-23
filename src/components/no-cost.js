import AbstractComponent from "./abstract-component.js";

const noCostTemplate = () => {
  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>`
  );
};

export default class NoCost extends AbstractComponent {
  getTemplate() {
    return noCostTemplate();
  }
}
