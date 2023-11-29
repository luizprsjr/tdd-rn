import React from 'react';
import {AppNavigator} from './screens';
import {Provider} from 'react-redux';
import store from './store';

export function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
