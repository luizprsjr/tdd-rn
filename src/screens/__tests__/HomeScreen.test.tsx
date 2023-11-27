import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {HomeScreen} from '../HomeScreen';
import {WeatherCurrent} from '../../components/WeatherCurrent';
import {View} from 'react-native';
import {WeatherCoordinates} from '../../components/WeatherCoordinates';

jest.mock('../../components/WeatherCurrent.tsx', () => ({
  WeatherCurrent: jest.fn().mockReturnValue(null),
}));
jest.mock('../../components/WeatherCoordinates.tsx', () => ({
  WeatherCoordinates: jest.fn().mockReturnValue(null),
}));

describe('HomeScreen', () => {
  it('should render correctly', () => {
    render(<HomeScreen />);
    screen.getByTestId('home-screen');
  });

  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(946684800000);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should contain current date', () => {
      render(<HomeScreen />);
      expect(screen.getByText('Jan 01, 2000')).toBeDefined();
    });

    it('should contain current day', () => {
      render(<HomeScreen />);
      expect(screen.getByText('Saturday')).toBeDefined();
    });
  });

  it('should contain a section to get current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-weather-current" />,
    );
    render(<HomeScreen />);
    expect(screen.getByTestId('mock-weather-current')).toBeDefined();
  });

  it('should contain a divider', () => {
    render(<HomeScreen />);
    screen.getByTestId('home-screen-divider');
  });

  it('should contain a section to get weather at given latitude and longitude', () => {
    (WeatherCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-weather-coordinates" />,
    );
    render(<HomeScreen />);
    expect(screen.getByTestId('mock-weather-coordinates')).toBeDefined();
  });
});
