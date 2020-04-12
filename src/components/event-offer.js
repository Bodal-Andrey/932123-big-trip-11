export const createEventOfferTemplate = (task) => {
  const {offers} = task;
  const offerMarkup = offers[Math.floor(Math.random() * offers.length)];
  const offerValue = offerMarkup.value;
  const offerPrice = offerMarkup.price;

  return (
    `<li class="event__offer">
    <span class="event__offer-title">${offerValue}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
   </li>`
  );
};
