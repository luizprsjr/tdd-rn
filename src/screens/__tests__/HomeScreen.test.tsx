import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {HomeScreen} from '../HomeScreen';

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
});
