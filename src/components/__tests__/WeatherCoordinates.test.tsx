import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import {WeatherCoordinates} from '../WeatherCoordinates';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WeatherCurrent', () => {
  it('should render correctly', () => {
    render(<WeatherCoordinates />);
    expect(screen.getByTestId('weather-coordinates')).toBeDefined();
  });

  it('should navigate to weather screen with given coordinates when valid form is submit', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });

    render(<WeatherCoordinates />);

    const fields = {
      latitude: screen.getByTestId('weather-coordinates-latitude'),
      longitude: screen.getByTestId('weather-coordinates-longitude'),
    };

    fireEvent.changeText(fields.latitude, 0);
    fireEvent.changeText(fields.longitude, 0);

    const button = screen.getByTestId('button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Latitude Field', () => {
    it('should not show an error when value is the lowest range value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '-90');

      await waitFor(() => {
        expect(
          screen.queryByText(/Latitude must be a valid number/i),
        ).not.toBeOnTheScreen();
      });
    });

    it('should not show an error when value is the highest range value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '90');

      await waitFor(() => {
        expect(
          screen.queryByText(/Latitude must be a valid number/i),
        ).not.toBeOnTheScreen();
      });
    });

    it('should show an error when value is lower than the lowest range value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '-91');

      await waitFor(() => {
        expect(
          screen.queryByText(/Latitude must be a valid number/i),
        ).toBeOnTheScreen();
      });
    });

    it('should show an error when value is higher than the highest value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '91');

      await waitFor(() => {
        expect(
          screen.queryByText(/Latitude must be a valid number/i),
        ).toBeOnTheScreen();
      });
    });

    it('should show an error when value is not a number', async () => {
      render(<WeatherCoordinates />);

      const field = screen.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, 'x');

      await waitFor(() => {
        expect(
          screen.queryByText(/Latitude must be a valid number/i),
        ).toBeOnTheScreen();
      });
    });
  });

  describe('Longitude Field', () => {
    it('should not show an error when value is the lowest range value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '-180');

      await waitFor(() => {
        expect(
          screen.queryByText(/Longitude must be a valid number/i),
        ).not.toBeOnTheScreen();
      });
    });

    it('should not show an error when value is the highest range value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '180');

      await waitFor(() => {
        expect(
          screen.queryByText(/Longitude must be a valid number/i),
        ).not.toBeOnTheScreen();
      });
    });

    it('should show an error when value is lower than the lowest range value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '-181');

      await waitFor(() => {
        expect(
          screen.queryByText(/Longitude must be a valid number/i),
        ).toBeOnTheScreen();
      });
    });

    it('should show an error when value is higher than the highest value', async () => {
      render(<WeatherCoordinates />);
      const field = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '181');

      await waitFor(() => {
        expect(
          screen.queryByText(/Longitude must be a valid number/i),
        ).toBeOnTheScreen();
      });
    });

    it('should show an error when value is not a number', async () => {
      render(<WeatherCoordinates />);

      const field = screen.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, 'x');

      await waitFor(() => {
        expect(
          screen.queryByText(/Longitude must be a valid number/i),
        ).toBeOnTheScreen();
      });
    });
  });
});
