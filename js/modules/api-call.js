//Variables
const POKE_API = 'https://pokeapi.co/api/v2/pokemon';
const POKE_TYPE = 'https://pokeapi.co/api/v2/type';
export const PAGE_SIZE = 20;


// functions
export const getData = async (offset) => {
  try {
    const response = await fetch(POKE_API + '?' +new URLSearchParams({
        offset: offset,
        limit: PAGE_SIZE,
      }));

    const pokeData = await response.json();
    const pokeArr = pokeData.results;

    return mapPokelistForCards(pokeArr);

  } catch (error) {
    console.log(error);
  }
};


export const getPokemons = async (offset, type_id) => {
  console.log(type_id)
  if (type_id) {
    if (window.FULL_POKE_LIST.length === 0) {
      window.FULL_POKE_LIST = await filterPokemonsByType(type_id);
    }
  } else {
    if (offset + PAGE_SIZE > window.FULL_POKE_LIST.length) {
      window.FULL_POKE_LIST.push(... await getData(offset));
    }
  }

  let pokeListSlice = await window.FULL_POKE_LIST.slice(
                        offset, (offset + PAGE_SIZE));

  return getPokeCardsData(pokeListSlice);
};


const getPokeCardsData = async (pokeList) => {

  let collection = [];

  for(let element of pokeList) {
    const { url } = element;

    let dataUrl =  await fetch(url);
    let datajson = await dataUrl.json();

    let mainType = datajson.types[0]
    let secondType = datajson.types[1]
    const Pokemon = { name: datajson.name,
                       id: datajson.id,
                       mainType: mainType ? mainType.type.name : '',
                       secondType: secondType ? secondType.type.name : '',
                       sprite: datajson.sprites.front_default
                     };
    collection.push(Pokemon);
  }
  return collection;
}


export const showPokemon = async (id) => {
  try {
    const response = await fetch(POKE_API + '/' + id);
    const pokeData = await response.json();
    return pokeData;
  } catch (error) {
    console.log(error);
  }
};


export const filterPokemonsByType = async (id) => {
  try {
    const response = await fetch(POKE_TYPE + '/' + id);
    const typeData = await response.json();

    return mapPokelistForCards(
      typeData.pokemon.map(element => element.pokemon));

  } catch (error) {
    console.log(error);
  }
}


const mapPokelistForCards = (pokeList) => {
  return pokeList.map((element) => {
    element['id'] = parseInt(element.url.split('pokemon/')[1].split('/')[0]);
    return element;
  });
}
