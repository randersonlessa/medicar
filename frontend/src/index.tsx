import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores';
import App from './App';
import { CreateServer } from './mocks/Server';

CreateServer();

window.addEventListener(
  'beforeunload',
  (event) => {
    const confirmationMessage = 'Ao recarregar a página seus dados serão perdidos';
    event.returnValue = confirmationMessage;
    return confirmationMessage;
  },
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
