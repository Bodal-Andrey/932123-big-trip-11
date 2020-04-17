export const createCostTemplate = (card) => {
  const {price} = card;
  const cost = price * 50;

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`
  );
};
