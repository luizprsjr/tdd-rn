import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {WeatherCurrent} from '../WeatherCurrent';

describe('WeatherCurrent', () => {
  it('should render correctly', () => {
    render(<WeatherCurrent />);
    expect(screen.getByTestId('weather-current')).toBeDefined();
  });
});
