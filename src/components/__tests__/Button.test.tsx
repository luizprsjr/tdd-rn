import React from 'react';
import {Button} from '../Button';
import {fireEvent, render, screen} from '@testing-library/react-native';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button label="" onPress={jest.fn()} />);
    screen.getByTestId('button');
  });

  it('should render loader when loading', () => {
    render(<Button label="" onPress={jest.fn} loading />);
    screen.getByTestId('button-loading');
  });

  it('should call given onPress when clicked', () => {
    const mockOnPress = jest.fn();
    render(<Button label="" onPress={mockOnPress} />);
    const button = screen.getByTestId('button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should render label', () => {
    render(<Button label="mock-label" onPress={jest.fn()} />);
    screen.getByText(/mock-label/i);
  });

  it('should accept custom view props', () => {
    render(<Button label="" onPress={jest.fn()} testID="mock-test-id" />);
    screen.getByTestId('mock-test-id');
  });
});
