import jwtDecode from 'jwt-decode';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { split, ApolloLink, ApolloClient, InMemoryCache } from '@apollo/client';

import { checkRole } from 'src/utils/check-roles';

import { HOST_API, HOST_API_WS } from 'src/config-global';

import { Role } from 'src/types/graphql/typeDefs';

interface DecodedToken {
  role: Role;
}

const getTokenFromLocalStorage = (): string | null => {
  const token: string = window.localStorage.getItem('token') || '';
  const loggedAsToken = window.localStorage.getItem('logged-as-token');

  if (loggedAsToken && token) {
    const decodedToken: DecodedToken = jwtDecode(token);
    if (checkRole({ currentRole: decodedToken.role, rolesToCheck: Role.Admin }))
      return loggedAsToken;
  }

  return token;
};

// Http link
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getTokenFromLocalStorage();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    uri: HOST_API,
  }));

  return forward(operation);
});

const errorLink = onError(({ networkError }) => {
  if (networkError && 'bodyText' in networkError) {
    try {
      JSON.parse(networkError.bodyText);
    } catch (e) {
      networkError.message = networkError.bodyText;
    }
  }
});

const uploadLink: any = createUploadLink({ uri: HOST_API });

// Order matters!
const httpLink = ApolloLink.from([authMiddleware, errorLink, uploadLink]);

// Websocket link
const getWebsocketUri = (): string => {
  const wsUrl = HOST_API_WS;
  if (wsUrl.startsWith('wss://') || wsUrl.startsWith('ws://')) return wsUrl;
  const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
  return `${protocol}${window.location.host}${wsUrl}`;
};

const wsLink = new WebSocketLink({
  options: {
    connectionParams: () => ({
      token: getTokenFromLocalStorage(),
    }),
    reconnect: true,
  },
  uri: getWebsocketUri(),
});

// Http and websocket client
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default apolloClient;
export { wsLink };
