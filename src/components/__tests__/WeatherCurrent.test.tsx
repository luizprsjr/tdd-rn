import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {WeatherCurrent} from '../WeatherCurrent';
import {useNavigation} from '@react-navigation/native';
import {LocationService} from '../../services/LocationService';
import {act} from 'react-test-renderer';
import {Colors} from '../../constants';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WeatherCurrent', () => {
  it('should render correctly', () => {
    render(<WeatherCurrent />);
    expect(screen.getByTestId('weather-current')).toBeDefined();
  });

  it('should render label', () => {
    render(<WeatherCurrent />);
    screen.getByText(/weather at my position/i);
  });

  it('should navigate to weather screen with location', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate});
    render(<WeatherCurrent />);
    const button = screen.getByTestId('weather-current');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Loader', () => {
    it('should be renderer when position is being fetched', async () => {
      const mockNavigate = jest.fn();
      (useNavigation as jest.Mock).mockReturnValueOnce({
        navigate: mockNavigate,
      });

      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            mockResolve = resolve;
          }),
      );

      const {getByTestId} = render(<WeatherCurrent />);

      fireEvent.press(getByTestId('weather-current'));

      await waitFor(() => {
        expect(getByTestId('button-loading')).toBeDefined();
      });

      await act(async () => {
        await mockResolve({latitude: 0, longitude: 0});
      });
    });

    it('should not be rendered when position been fetched', async () => {
      render(<WeatherCurrent />);
      const button = screen.getByTestId('weather-current');
      fireEvent.press(button);
      await waitFor(() => {
        expect(screen.queryByTestId('button-loading')).toBeNull();
      });
    });

    it('should not be rendered when fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValue(new Error());

      render(<WeatherCurrent />);
      const button = screen.getByTestId('weather-current');
      fireEvent.press(button);
      await waitFor(() => {
        expect(screen.queryByTestId('button-loading')).toBeNull();
      });
    });
  });

  describe('Error', () => {
    it('should be displayed after fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error());

      render(<WeatherCurrent />);
      const button = screen.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        expect(button).toHaveStyle({
          borderColor: Colors.ERROR,
        });
      });
    });

    it('should be removed after fetching position again', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error());

      render(<WeatherCurrent />);
      const button = screen.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        fireEvent.press(button);
        expect(button).not.toHaveStyle({
          borderColor: Colors.ERROR,
        });
      });
    });
  });
});
