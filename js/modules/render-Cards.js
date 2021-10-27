import { getPokemons, PAGE_SIZE} from './api-call.js';
import { capitalize, hideSpinner, alertFinalList } from './utilities.js';


export const renderIndexCards = async (offset, type_id) => {


  const pokeList = await getPokemons(offset, type_id);
  if(pokeList.length === 0) {
    hideSpinner();
    alertFinalList();

  } else {
    renderCards(pokeList);
  }
}


export const renderCards = async (pokeList) => {
  const areaContent = document.querySelector('.js-grid');

  pokeList.forEach(item => {
    let { name, id, sprite, mainType, secondType} = item;
    // hacer funcion
    name = capitalize(name);
    mainType = capitalize(mainType);
    secondType = capitalize(secondType);

    areaContent.innerHTML += `
      <div class="card js-card">
        <a href="show-more.html?poke_id=${id}">
          <span class="card__line"></span>
          <div class="card__content">
            <img src=${sprite} alt="" class="card__img">
            <div class="card__id">
              <p class="card__name">${name}</p>
              <p class="card__number"># ${ ("00" + id).slice(-3)}</p>
            </div>
          </div>
          <div class="card__details">
            <p class="card__element">${mainType}</p>
            <p class="card__type">${secondType}</p>
          </div>
        </a>
      </div>
    `
  });
}


export const cleanPokemonCards = () => {
  const cardContainer = document.querySelector('.js-grid');
  while(cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
};

