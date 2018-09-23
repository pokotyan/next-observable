export const FETCH_POKEMON = Symbol(
  'FETCH_POKEMON'
);

export const FETCH_POKEMON_FULFILLED = Symbol(
  'FETCH_POKEMON_FULFILLED'
);

export const FETCH_POKEMONS = Symbol(
  'FETCH_POKEMONS'
);

export const FETCH_POKEMONS_FULFILLED = Symbol(
  'FETCH_POKEMONS_FULFILLED'
);

export const fetchPokemon = payload => ({
  type: FETCH_POKEMON,
  payload
});

export const fetchPokemonFulfilled = response => ({ type: FETCH_POKEMONS_FULFILLED, payload: response });

export const fetchPokemons = payload => ({
  type: FETCH_POKEMONS,
  payload
});

export const fetchPokemonsFulfilled = payload => ({ type: FETCH_POKEMONS_FULFILLED, payload });
