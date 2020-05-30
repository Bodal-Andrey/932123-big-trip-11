export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const MenuItem = {
  TABLE: `control__table`,
  STATS: `control__stats`,
};

export const eventActions = {
  'taxi': `to`,
  'bus': `to`,
  'train': `to`,
  'ship': `to`,
  'transport': `to`,
  'drive': `to`,
  'flight': `to`,
  'check-in': `in`,
  'sightseeing': `in`,
  'restaurant': `in`,
};

export const ChartTypeLabelsMap = {
  'taxi': `🚕 TAXI`,
  'bus': `🚌 BUS`,
  'train': `🚂 TRAIN`,
  'ship': `🛳 SHIP`,
  'transport': `🚊 TRANSPORT`,
  'drive': `🚗 DRIVE`,
  'flight': `✈️ FLIGHT`,
  'check-in': `🏨 CHECK-IN`,
  'sightseeing': `🏛 SIGHTSEEING`,
  'restaurant': `🍴 RESTAURANT`,
};

export const TimeInMs = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
};

export const ServerUrl = {
  POINTS: `https://11.ecmascript.pages.academy/big-trip/points`,
  OFFERS: `https://11.ecmascript.pages.academy/big-trip/offers`,
  DESTINATIONS: `https://11.ecmascript.pages.academy/big-trip/destinations`
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const TRANSPORT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];

export const EVENT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
