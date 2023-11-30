import React = require('react');
import WeatherScreen from '../WeatherScreen';
import {useNavigation} from '@react-navigation/native';
import {
  mockStore,
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '../../utils/test.utils';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../../store/weather/actions';
import {nullWeather} from '../../@types/Weather';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({goBack: jest.fn()}),
    useRoute: jest.fn().mockReturnValue({params: {longitude: 0, latitude: 0}}),
  };
});

describe('WeatherScreen', () => {
  it('should render correctly', () => {
    render(<WeatherScreen />);
    expect(screen.getByTestId('weather-screen')).toBeDefined();
  });

  it('should return to home when button home is pressed ', () => {
    const mockGoBack = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({goBack: mockGoBack});

    render(<WeatherScreen />);
    const button = screen.getByText(/home/i);
    fireEvent.press(button);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('should fetch weather', async () => {
    const interceptor = jest.fn();
    const store = mockStore(interceptor);

    render(<WeatherScreen />, {store});
    await waitFor(() => {
      expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0));
    });
  });

  it('should display loader when fetching weather', () => {
    render(<WeatherScreen />);
    screen.getByTestId('weather-screen-loader');
  });

  it('should display given error', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherFailure('mock-error'));
    });

    screen.getByText('mock-error');
  });

  it('should display image with given weather icon', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, icon: 'mock-icon'}));
    });

    const image = screen.getByTestId('weather-screen-icon');
    expect(image).toHaveProp('source', {uri: 'mock-icon'});
  });

  it('should not display icon when weather has no icon', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => screen.getByTestId('weather-screen-icon')).toThrow();
  });

  it('should display description from given weather', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(
        fetchWeatherSuccess({...nullWeather, description: 'mock-description'}),
      );
    });

    screen.getByText(/mock-description/i);
  });

  it('should not display description when given weather has no description', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => screen.getByTestId('weather-screen-description')).toThrow();
  });

  it('should display city name from given weather', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, city: 'mock-city'}));
    });

    screen.getByText(/mock-city/i);
  });

  it('should display formatted temperature', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, temperature: 10.8}));
    });

    const container = screen.getByTestId('weather-screen-temperature');
    const title = screen.getByText('temperature');
    const temperature = screen.getByText('11°C');

    expect(container).toContainElement(title);
    expect(container).toContainElement(temperature);
  });

  it('should display formatted wind', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, windSpeed: 3.8}));
    });

    const container = screen.getByTestId('weather-screen-wind');
    const title = screen.getByText('wind');
    const wind = screen.getByText('3.8m/s');

    expect(container).toContainElement(title);
    expect(container).toContainElement(wind);
  });

  it('should display formatted humidity', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, humidity: 68}));
    });

    const container = screen.getByTestId('weather-screen-humidity');
    const title = screen.getByText('humidity');
    const humidity = screen.getByText('68%');

    expect(container).toContainElement(title);
    expect(container).toContainElement(humidity);
  });

  it('should display formatted pressure', () => {
    const store = mockStore();
    render(<WeatherScreen />, {store});

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, pressure: 1018}));
    });

    const container = screen.getByTestId('weather-screen-pressure');
    const title = screen.getByText('pressure');
    const pressure = screen.getByText('1018 hPa');

    expect(container).toContainElement(title);
    expect(container).toContainElement(pressure);
  });
});
