import Filters from "../components/filters.js";
import {FilterType} from "../const.js";
import {renderElement, replace} from "../utils/render.js";

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new Filters(filters);
    this._filterComponent.setFilterChangeHandler(this._onSortChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      renderElement(container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    this._eventsModel.setEvents(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
