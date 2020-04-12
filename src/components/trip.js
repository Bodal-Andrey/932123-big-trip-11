export const createTripTemplate = (trip) => {
  const {startPoint, intermediatePoint, endPoint, month, startDate, endDate} = trip;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startPoint} &mdash; ${intermediatePoint} &mdash; ${endPoint}</h1>
  
        <p class="trip-info__dates">${month} ${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
      </div>
  
    </section>`
  );
};
