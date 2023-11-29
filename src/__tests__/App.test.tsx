import React from 'react';
import {AppNavigator} from '../screens';
import {View} from 'react-native';
import {render, screen} from '@testing-library/react-native';
import {App} from '../App';
import {Provider} from 'react-redux';
import store from '../store';

jest.mock('../screens', () => ({
  AppNavigator: jest.fn(),
}));
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual<object>('react-redux'),
    Provider: jest.fn(),
  };
});

describe('App', () => {
  it('should render routes', () => {
    (Provider as jest.Mock).mockImplementationOnce(({children}) => children);
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );
    render(<App />);
    screen.getByTestId('mock-routes');
  });

  it('should render Provider', () => {
    let providerStore!: typeof store;

    (Provider as jest.Mock).mockImplementationOnce(({store}) => {
      providerStore = store;
      return <View testID="mock-provider" />;
    });

    render(<App />);
    screen.getByTestId('mock-provider');
    expect(providerStore).toBe(store);
  });
});
