import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from 'redux-logger';
import reducer from "../reducers";
import rootEpic from '../epics';

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
export default (initialState, options) => {
  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass`initialState`
   * when creating the store.
   */
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      epicMiddleware,
      logger
    )
  );

  epicMiddleware.run(rootEpic);

  return store;
};
