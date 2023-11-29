import Status from '../../../@types/Status';
import {WeatherType, nullWeather} from '../../../@types/Weather';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherReset,
  fetchWeatherSuccess,
} from '../actions';
import reducer from '../reducer';

describe('Store/weather', () => {
  const initialState = {
    status: Status.START,
    error: '',
    weather: nullWeather,
  };

  describe('reducer', () => {
    const mockWeather: WeatherType = {
      city: 'mock-city',
      description: 'mock-description',
      humidity: 100,
      icon: 'mock-icon',
      pressure: 1000,
      temperature: 10,
      windSpeed: 10,
    };

    it('should return initialState', () => {
      const state = reducer(undefined, {type: '@@INIT'});
      expect(state).toEqual(initialState);
    });

    it('should handle fetchWeather action', () => {
      const state = reducer(undefined, fetchWeather(0, 0));
      expect(state).toEqual({
        status: Status.LOADING,
        error: '',
        weather: nullWeather,
      });
    });

    it('should handle fetchWeatherSuccess action', () => {
      const state = reducer(undefined, fetchWeatherSuccess(mockWeather));
      expect(state).toEqual({
        status: Status.SUCCESS,
        error: '',
        weather: mockWeather,
      });
    });

    it('should handle fetchWeatherFailure action', () => {
      const state = reducer(undefined, fetchWeatherFailure('mock-error'));
      expect(state).toEqual({
        status: Status.FAILURE,
        error: 'mock-error',
        weather: nullWeather,
      });
    });

    it('should handle fetchWeatherReset action', () => {
      const success = reducer(undefined, fetchWeatherSuccess(mockWeather));
      const state = reducer(success, fetchWeatherReset());
      expect(state).toEqual(initialState);
    });
  });
});
