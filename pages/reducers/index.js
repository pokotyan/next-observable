import { combineReducers } from 'redux';
import { apolloReducer } from 'apollo-cache-redux';
import github from './github';
import pokemon from './pokemon';

const reducer = combineReducers({
  apollo: apolloReducer,
  github,
  pokemon
});

export default reducer;
