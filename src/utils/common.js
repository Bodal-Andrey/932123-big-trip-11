import moment from "moment";

const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const formatDate = (data) => {
  const calend = moment(data).format(`L`);
  const time = moment(data).format(`hh:mm`);

  return `${calend} ${time}`;
};

const formatTime = (data) => {
  return moment(data).format(`hh:mm`);
};

const timeDifference = (endTime, startTime) => {
  return moment.utc(moment.duration(endTime) - moment.duration(startTime)).format(`D[D] hh[H] mm[M]`);
};

export {formatDate, formatTime, timeDifference, getRandomInteger};
