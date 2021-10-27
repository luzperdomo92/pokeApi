import { cleanPokemonCards, renderIndexCards } from './render-Cards.js';
import { showSpinner } from './utilities.js';
// pointer-events: none;
export const showFilters = () => {

  let contentFilters = document.querySelector('.js-filter-options');

  contentFilters.addEventListener('click', e => {
    let target = e.target;

    if (target.tagName === 'BUTTON') {
      let action = target.getAttribute('data-action');

      if ( action === 'open-dropdown') {
        let sibling = target.nextElementSibling;

        if (sibling.classList.contains('js-show') ) {
          sibling.classList.remove('js-show');
        } else {
          sibling.classList.add('js-show');
        }
      }
    }
  });
}


export function closeFilters(e) {
  if (e.target.closest('.js-filter-options') === null ) {
    closeSelectedFilter();
  }
};


export async function filtersByType() {
  const filterType = document.querySelector('.js-filterType');

  filterType.addEventListener('click', async (e) => {
    window.pokeTypeId = e.target.getAttribute('data-key');
    const value = e.target.textContent;

    if (pokeTypeId) {
      window.FULL_POKE_LIST = [];
      closePokeTypeSelect(value);
    }

    window.pokePaginationOffset = 0;
    cleanPokemonCards();
    showSpinner();
  });
}

export async function filterBySort() {
  const filterSort = document.querySelector('.js-filterSort');

  filterSort.addEventListener('click', async (e) => {
    const key = e.target.getAttribute('data-key');
    const value = e.target.textContent;

    if(key){
      closePokeOrderSelect(value);
      window.pokePaginationOffset = 0;
    };

    if (key === 'numberAcs'){
      sortNumberAcs();
    } else if (key === 'numberDes'){
      sortNumberDes();
    } else if (key === 'nameAcs'){
      sortNameAcs();
    } else {
      sortNameDes();
    }

    cleanPokemonCards();
  });
}

function closeSelectedFilter() {
  document.querySelectorAll('.dropdown__content').forEach(item => {
    item.classList.remove('js-show');
  });
}

function closePokeTypeSelect(value) {
  closeSelectedFilter();
  document.querySelector('.js-btnType').textContent = `${value}`;
}

function closePokeOrderSelect(value) {
  closeSelectedFilter();
  document.querySelector('.js-btnSort').textContent = `${value}`;
}


function sortNumberAcs () {
  window.FULL_POKE_LIST.sort((a, b) => a.id > b.id ? 1: -1);
}

function sortNumberDes () {
  window.FULL_POKE_LIST.sort((a, b) => a.id > b.id ? -1: 1);
}

function sortNameAcs () {
  window.FULL_POKE_LIST.sort((a, b) => a.name > b.name ? 1: -1);
}

function sortNameDes () {
  window.FULL_POKE_LIST.sort((a, b) => a.name > b.name ? -1 : 1);
}
