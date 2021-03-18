import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.render(
  <Auth0Provider
    domain={'khodeblack.us.auth0.com'}
    clientId={'EhUVAN01CSHM4eNzvm58pQVM8ZNLPIgY'}
    redirectUri = {window.location.origin}
    >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
