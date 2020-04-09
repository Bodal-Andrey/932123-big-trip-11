const transportValueNames = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const stopPointNames = [`Check-in`, `Sightseeing`, `Restaurant`];
const cityNames = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;

const arrayOfSentence = text.split(`.`).splice(1, 10);

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getDescription = (arr) => {
  const description = [];

  for (let i = 0; (i < randomInteger(1, 5)) && (i < arr.length); i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const sentence = arr[r];
    arr[r] = arr[i];
    arr[i] = sentence;
    description.push(sentence);
  }

  return description;
};

const newDescription = getDescription(arrayOfSentence).join(`. `);
console.log(newDescription);


const task = {transportValueNames, stopPointNames, cityNames};

export {task};
