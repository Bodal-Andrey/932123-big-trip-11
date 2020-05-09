import {FilterType} from "../const.js";

export const getEventsByFilter = (events, filterType) => {
  let sortedEvents = [];

  switch (filterType) {
    case FilterType.FUTURE:
      sortedEvents = events.slice().sort((a, b) => b.startDate - a.nowDate);
      break;
    case FilterType.PAST:
      sortedEvents = events.slice().sort((a, b) => a.nowDate - b.endDate);
      break;
    case FilterType.EVERYTHING:
      sortedEvents = events.slice();
      break;
  }
  return sortedEvents;
};
