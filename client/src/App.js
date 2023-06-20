import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Details from './pages/Details';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import PurchaseHistory from './pages/PurchaseHistory';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              {/* <Route 
                path="/confirmation" 
                element={<Confirmation />} 
              /> */}
              <Route 
                path="/purchaseHistory" 
                element={<PurchaseHistory />} 
              />
              <Route 
                path="/car/:_id" 
                element={<Details />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
