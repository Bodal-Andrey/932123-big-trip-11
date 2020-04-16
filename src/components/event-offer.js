import {getRandomInteger} from "../utils.js";

export const createEventOfferTemplate = (card) => {
  const {offerNames, price} = card;
  const offer = offerNames[Math.floor(Math.random() * offerNames.length)];

  return (
    `<li class="event__offer">
    <span class="event__offer-title">${offer}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
   </li>`
  );
};
