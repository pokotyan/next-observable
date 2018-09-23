import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, tap, mergeMap, debounceTime, ignoreElements } from 'rxjs/operators';
import gql from 'graphql-tag';
import * as pokemonActions from '../actions/pokemon';
import client from '../utils/client';
import pokemonConfigList from '../config/pokedex.json'

export const fetchPokemon = (action$) =>
  action$.pipe(
    ofType(pokemonActions.FETCH_POKEMON),
    debounceTime(500),
    tap(action => console.log(action)),
    mergeMap(action => client.query({
      variables: {
        name: action.payload.name,
      },
      query: gql`
        query($name: String) {
          pokemon(name: $name) {
            id
            number
            name
            attacks {
              special {
                name
                type
                damage
              }
            }
            evolutions {
              id
              number
              name
              weight {
                minimum
                maximum
              }
              attacks {
                fast {
                  name
                  type
                  damage
                }
              }
            }
          }
        }
      `
    })),
    tap(response => console.log(response)),
    map(response => pokemonActions.fetchPokemonFulfilled(response))
  );

export const fetchPokemons = (action$) =>
  action$.pipe(
    ofType(pokemonActions.FETCH_POKEMONS),
    debounceTime(500),
    tap(action => console.log(action)),
    mergeMap(action => client.query({
      variables: {
        first: action.payload.first,
      },
      query: gql`
        query($first: Int!) {
          pokemons(first: $first) {
            id
            number
            name
            attacks {
              special {
                name
                type
                damage
              }
            }
            evolutions {
              id
              number
              name
              weight {
                minimum
                maximum
              }
              attacks {
                fast {
                  name
                  type
                  damage
                }
              }
            }
          }
        }
      `
    })),
    tap(response => console.log(response)),
    map(response => {
      return response.data.pokemons.map(pokemon => {
        let jname;

        pokemonConfigList.some(pokemonConfig => {
          if (pokemonConfig.ename === pokemon.name) {
            jname = pokemonConfig.jname;
            return true;
          }
        })

        pokemon.jname = jname || '';

        return pokemon;
      })
    }),
    map(pokemons => {
      return pokemons.map(pokemon => {

        const pokemonGifUrl = pokemon.name.toLowerCase()
          .replace(/\./g,'')
          .replace(/'/g,'')
          .replace(/\-/g, '')
          .replace(/\s/g, '-');

        pokemon.gif = `http://www.pokestadium.com/sprites/xy/${pokemonGifUrl}.gif`;

        return pokemon;
      })
    }),
    map(pokemons => pokemonActions.fetchPokemonsFulfilled(pokemons))
  );