import 'rxjs'

import { combineEpics } from 'redux-observable'
import { fetchGithubUser } from './github'
import { fetchPokemon, fetchPokemons } from './pokemon'

export default combineEpics(fetchGithubUser, fetchPokemon, fetchPokemons)