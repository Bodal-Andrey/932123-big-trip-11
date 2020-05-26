import AbstractComponent from "./abstract-component.js";

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a id="control__table" class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a id="control__stats" class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveItem(menuItem) {
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    const checkedItem = this.getElement().querySelector(`#${menuItem}`);

    activeItem.classList.remove(`trip-tabs__btn--active`);
    checkedItem.classList.add(`trip-tabs__btn--active`);
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
