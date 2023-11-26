import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {HomeScreen} from '../HomeScreen';

describe('HomeScreen', () => {
  it('should render correctly', () => {
    render(<HomeScreen />);
    screen.getByTestId('home-screen');
  });
});
