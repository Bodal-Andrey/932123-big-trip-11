import {FilterType} from "../const.js";

export const getFutureEvents = (events) => {
  return events.filter((event) => event.startDate > Date.now()).sort((a, b) => a.startDate - b.startDate);
};

export const getPastEvents = (events) => {
  return events.filter((event) => event.endDate < Date.now()).sort((a, b) => a.startDate - b.startDate);
};

export const getEventsByFilter = (events, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.sort((a, b) => a.startDate - b.startDate);
    case FilterType.FUTURE:
      return getFutureEvents(events);
    case FilterType.PAST:
      return getPastEvents(events);
  }
  return events;
};
