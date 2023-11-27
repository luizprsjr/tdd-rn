import React from 'react';
import {AppNavigator} from '../screens';
import {View} from 'react-native';
import {render, screen} from '@testing-library/react-native';
import {App} from '../App';

jest.mock('../screens', () => ({
  AppNavigator: jest.fn(),
}));

describe('App', () => {
  it('should render routes', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );
    render(<App />);
    screen.getByTestId('mock-routes');
  });
});
