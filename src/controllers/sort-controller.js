import Sort, {SortType} from "../components/sort.js";
import {renderElement, replace} from "../utils/render.js";

export default class SortController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeSortType = SortType.EVENT;
    this._sortComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const sorts = Object.values(SortType).map((sortType) => {
      return {
        name: sortType,
        checked: sortType === this._activeSortType,
      };
    });
    const oldComponent = this._sortComponent;

    this._sortComponent = new Sort(sorts);
    this._sortComponent.setSortTypeChangeHandler(this._onSortChange);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      renderElement(container, this._sortComponent);
    }
  }

  _onSortChange(sortType) {
    this._eventsModel.setEvents(sortType);
    this._activeSortType = sortType;
  }

  _onDataChange() {
    this.render();
  }
}
