import { showPokemon } from './api-call.js';
import { capitalize } from './utilities.js';



export const showStatsPokemon = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const pokeData = await showPokemon(params.poke_id);

  cardDetails(pokeData);
  stats(pokeData);
  abilities(pokeData);
}

function cardDetails(pokeData) {
  const cardContent = document.querySelector('.js-card');
  cardContent.innerHTML += `
    <div class="card js-card">
      <a href="show-more.html?poke_id=${pokeData.id}">
        <span class="card__line"></span>
        <div class="card__content">
          <img src=${pokeData.sprites.front_default} alt="" class="card__img">
          <div class="card__id">
            <p class="card__name">${capitalize(pokeData.name)}</p>
            <p class="card__number"># ${ ("00" + pokeData.id).slice(-3)}</p>
          </div>
        </div>
        <div class="card__details">
          <p class="card__element">${pokeData.types[0] ?  capitalize(pokeData.types[0].type.name) : ''}</p>
          <p class="card__type">${pokeData.types[1] ?  capitalize(pokeData.types[1].type.name) : ''}</p>
        </div>
      </a>
    </div>
  `;
};

function stats(pokeData) {
  const contenStats = document.querySelector('.js-stats');
  const stats = pokeData.stats;
  const maxValue = 300;

  contenStats.innerHTML += `
    ${renderStat('HP',maxValue, stats[0].base_stat)}
    ${renderStat('Attack',maxValue, stats[1].base_stat)}
    ${renderStat('Defence',maxValue, stats[2].base_stat)}
    ${renderStat('Sp.Attack',maxValue, stats[3].base_stat)}
    ${renderStat('Sp. Defence',maxValue, stats[4].base_stat)}
    ${renderStat('Speed',maxValue, stats[5].base_stat)}
  `;
}


function renderStat(title, max, value) {
  return `
    <div class="show-more__stats">
      <label class="show-more__title show-more__title--right show-more__title--light-weight" for="stats">${title}</label>
      <div class="show-more__progress">
        <div class="show-more__bar" style="width:${value}%;"></div>
        <span class="show-more__value">${value}</span>
      </div>
    </div>
  `;
}


async function abilities(pokeData) {
  const contenAbilities = document.querySelector('.js-abilities');
  const abilities = pokeData.abilities;


  for(let dataAbility of abilities) {
    const url  = dataAbility.ability.url;
    let dataUrl =  await fetch(url);
    let datajson = await dataUrl.json();

    let abilityDescription = datajson.flavor_text_entries.find(item => item.language.name === 'en').flavor_text;

    contenAbilities.innerHTML += `
      ${renderAbilities( capitalize(dataAbility.ability.name), abilityDescription)}
    `;
  }
};


function renderAbilities(title, description){
  return `
    <div class="show-more__abilities">
      <h3 class="show-more__title">${title}</h3>
      <p class="show-more__text">${description}</p>
    </div>
  `;
}


document.addEventListener('DOMContentLoaded', showStatsPokemon);
