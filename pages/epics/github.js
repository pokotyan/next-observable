import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { map, tap, mergeMap, debounceTime, ignoreElements } from 'rxjs/operators';
import { FETCH_GITHUB_USER, fetchUserFulfilled } from '../actions/github';

export const fetchGithubUser = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_GITHUB_USER),
    debounceTime(500),
    tap(action => console.log(action)),
    mergeMap(action => ajax.getJSON(`https://api.github.com/users/${action.payload.userName}`)),
    tap(response => console.log(response)),
    tap(response => console.log(response)),
    map(response => fetchUserFulfilled(response))
  );