const createFilterMarkup = (value, isChecked) => {
  const name = value.toLowerCase();
  return (
    `<div class="trip-filters__filter">
    <input 
    id="filter-${name}" 
    class="trip-filters__filter-input  visually-hidden" 
    type="radio" 
    name="trip-filter" 
    value="${name}" 
    ${isChecked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${name}">${value}</label>
  </div>`
  );
};

export const createFiltersTemplate = (list) => {

  const filterMarkup = list.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filterMarkup}  
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
