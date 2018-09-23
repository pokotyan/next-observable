export const FETCH_GITHUB_USER = Symbol(
  'FETCH_GITHUB_USER'
);

export const FETCH_GITHUB_USER_FULFILLED = Symbol(
  'FETCH_GITHUB_USER_FULFILLED'
);

export const fetchGithubUser = payload => ({
  type: FETCH_GITHUB_USER,
  payload
});

export const fetchUserFulfilled = payload => ({ type: FETCH_GITHUB_USER_FULFILLED, payload });
