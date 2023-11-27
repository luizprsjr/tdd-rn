import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {WeatherCoordinates} from '../WeatherCoordinates';

describe('WeatherCurrent', () => {
  it('should render correctly', () => {
    render(<WeatherCoordinates />);
    expect(screen.getByTestId('weather-coordinates')).toBeDefined();
  });
});
