export const createCostTemplate = (card) => {
  const arr = [];
  card.forEach((it) => {
    arr.push(it.price);
  });
  const sumOfCosts = arr.reduce((sum, current) => sum + current, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumOfCosts}</span>
    </p>`
  );
};
