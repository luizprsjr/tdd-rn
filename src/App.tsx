import React from 'react';
import {AppNavigator} from './screens';
import {Provider} from 'react-redux';
import store from './store';
import {StatusBar} from 'react-native';

export function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </Provider>
  );
}
