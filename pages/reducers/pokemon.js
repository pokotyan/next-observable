import * as pokemonActions from '../actions/pokemon';

const initialState = {
  pokemon: null,
  pokemons: null,
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case pokemonActions.FETCH_POKEMON:
      return Object.assign({}, state, {
        isFetching: true
      });
    case pokemonActions.FETCH_POKEMON_FULFILLED:
      return Object.assign({}, state, {
        pokemon: action.payload,
        isFetching: false
      });
    case pokemonActions.FETCH_POKEMONS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case pokemonActions.FETCH_POKEMONS_FULFILLED:
      return Object.assign({}, state, {
        pokemons: action.payload,
        isFetching: false
      });
    default:
      return state;
  }
};
