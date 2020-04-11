const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatDate = (data) => {
  const calend = new Date(data).toLocaleDateString(`ru`).replace(/\./ig, `/`).slice(0, -2);
  const hours = castTimeFormat(new Date(data).getHours() % 12);
  const minutes = castTimeFormat(new Date(data).getMinutes());

  return `${calend} ${hours}:${minutes}`;
};
