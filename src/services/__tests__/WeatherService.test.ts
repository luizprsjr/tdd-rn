import nock from 'nock';
import {nullCurrentWeatherRawResponse} from '../dto/weather-service-dto';
import {WeatherService} from '../WeatherService';
import {WeatherType} from '../../@types/Weather';

describe('WeatherService', () => {
  const mockResponse = {
    ...nullCurrentWeatherRawResponse,
    main: {
      ...nullCurrentWeatherRawResponse.main,
      temp: 10,
      humidity: 100,
      pressure: 1000,
    },
    wind: {
      ...nullCurrentWeatherRawResponse.wind,
      speed: 10,
    },
    weather: [
      {description: 'mock-description', icon: 'mock-icon', main: '', id: 0},
    ],
    name: 'mock-city',
  };

  it('should fetch current weather', async () => {
    const expectedWeather: WeatherType = {
      temperature: 10,
      windSpeed: 10,
      humidity: 100,
      pressure: 1000,
      icon: 'https://openweathermap.org/img/wn/mock-icon@4x.png',
      description: 'mock-description',
      city: 'mock-city',
    };

    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, mockResponse);

    const weather = await WeatherService.fetchCurrentWeather(0, 0);

    expect(weather).toEqual(expectedWeather);
  });

  it('Should return formatted CurrentWeather with empty weather', async () => {
    const mockResponseEmptyWeather = {
      ...mockResponse,
      weather: [],
    };

    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, mockResponseEmptyWeather);

    const {description, icon} = await WeatherService.fetchCurrentWeather(0, 0);

    expect(description).toBeNull();
    expect(icon).toBeNull();
  });
});
