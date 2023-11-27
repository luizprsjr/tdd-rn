import {render, screen} from '@testing-library/react-native';
import React = require('react');
import {WeatherScreen} from '../WeatherScreen';
describe('WeatherScreen', () => {
  it('should render correctly', () => {
    render(<WeatherScreen />);
    expect(screen.getByTestId('weather-screen')).toBeDefined();
  });
});
