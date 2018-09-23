
import { ApolloClient } from 'apollo-client';
import { ReduxCache } from 'apollo-cache-redux';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import store from '../store';

const cache = new ReduxCache({ store });
const httpLink = new HttpLink({
  uri: 'https://graphql-pokemon.now.sh/',
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
