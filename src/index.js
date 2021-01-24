import React from 'react';
import ReactDOM from 'react-dom';
import { debugContextDevtool } from 'react-context-devtool';

import AppProviders from '@context';
import App from './App';

const container = document.getElementById('root');

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  container
);

debugContextDevtool(container, { disable: process.env.NODE_ENV === 'production' });
