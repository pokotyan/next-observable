import * as githubActions from '../actions/github';

const initialState = {
  user: null,
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case githubActions.FETCH_GITHUB_USER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case githubActions.FETCH_GITHUB_USER_FULFILLED:
      return Object.assign({}, state, {
        user: action.payload,
        isFetching: false
      });
    default:
      return state;
  }
};
