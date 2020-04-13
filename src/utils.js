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

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

const render = (container, template, place) => {
  if (place === `afterbegin`) {
    container.prepend(template);
  } else if (place === `beforeend`) {
    container.append(template);
  }
};

export {formatDate, getRandomInteger, createElement, render};
