import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import apolloClient from 'src/services/apollo-client';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
