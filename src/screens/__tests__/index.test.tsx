import React = require('react');

import {AppNavigator} from '..';
import {HomeScreen} from '../HomeScreen';
import {View} from 'react-native';
import {render, screen, waitFor} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import WeatherScreen from '../WeatherScreen';

jest.mock('../HomeScreen', () => ({
  HomeScreen: jest.fn(),
}));
jest.mock('../WeatherScreen', () => jest.fn());

describe('AppNavigator', () => {
  it('should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );

    render(<AppNavigator />);

    await waitFor(() => {
      screen.getByTestId('mock-home-screen');
    });
  });

  it('should render WeatherScreen on "Weather" route ', async () => {
    (HomeScreen as jest.Mock).mockImplementation(() => {
      const navigation = useNavigation();

      React.useEffect(() => {
        navigation.navigate('Weather', {
          latitude: 0,
          longitude: 0,
        });
      }, [navigation]);

      return null;
    });

    (WeatherScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-weather-screen" />,
    );
  });
});
