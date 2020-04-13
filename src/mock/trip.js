import {getRandomInteger} from "../utils.js";

const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `London`, `Berlin`, `Tokyo`];
const months = [`Jan`, `Fab`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

const generateTrip = () => {
  const startDate = getRandomInteger(1, 31);
  const endDate = getRandomInteger(1, 31);

  return {
    startPoint: cities[Math.floor(Math.random() * cities.length)],
    intermediatePoint: cities[Math.floor(Math.random() * cities.length)],
    endPoint: cities[Math.floor(Math.random() * cities.length)],
    month: months[Math.floor(Math.random() * months.length)],
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
  };
};

export const trip = generateTrip();
