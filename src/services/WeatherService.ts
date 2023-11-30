import axios, {AxiosResponse} from 'axios';
import {WeatherType} from '../@types/Weather';
import {CurrentWeatherRawResponseDto} from './dto/weather-service-dto';

export class WeatherService {
  static async fetchCurrentWeather(
    lat: number,
    lon: number,
  ): Promise<WeatherType> {
    return axios
      .get<CurrentWeatherRawResponseDto>(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat,
            lon,
            appid: 'a8e293649ecf2b37b96d8cf20e3da968',
            units: 'metric',
          },
        },
      )
      .then(WeatherService.formatCurrentWeatherResponse);
  }

  private static async formatCurrentWeatherResponse(
    response: AxiosResponse<CurrentWeatherRawResponseDto>,
  ) {
    const {data} = response;
    const weather = data.weather[0];

    return {
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      icon: weather
        ? `https://openweathermap.org/img/wn/${weather.icon}@4x.png`
        : null,
      description: weather?.description ?? null,
      city: data.name,
    };
  }
}
