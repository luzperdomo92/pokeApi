//API
import { showFilters, closeFilters, filtersByType, filterBySort } from './modules/filters.js';
import { renderIndexCards } from './modules/render-Cards.js';
import { getData, PAGE_SIZE } from './modules/api-call.js';


window.pokePaginationOffset = 0;
window.FULL_POKE_LIST = [];
window.pokeTypeId = null;

// Events Listeners
window.addEventListener('click', closeFilters);

document.addEventListener('DOMContentLoaded', async () => {
  showFilters();
  filtersByType();
  filterBySort();

  const loader = document.querySelector('.sk-chase');

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        renderIndexCards(pokePaginationOffset, window.pokeTypeId);
        window.pokePaginationOffset += PAGE_SIZE;
      }
    });
  }

  let observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(loader);
});
