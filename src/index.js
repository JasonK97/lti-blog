import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { PrismicLink } from "apollo-link-prismic";

const client = new ApolloClient({
  link: PrismicLink({
    uri: `${process.env.REACT_APP_API_URL}`,
    accessToken: `${process.env.REACT_APP_API_KEY}`,
  }),
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
