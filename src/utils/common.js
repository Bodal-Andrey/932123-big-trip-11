const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatDate = (data) => {
  const calend = new Date(data).toLocaleDateString(`ru`).replace(/\./ig, `/`).slice(0, -2);
  const hours = castTimeFormat(new Date(data).getHours() % 12);
  const minutes = castTimeFormat(new Date(data).getMinutes());

  return `${calend} ${hours}:${minutes}`;
};

const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};


export {formatDate, getRandomInteger};
