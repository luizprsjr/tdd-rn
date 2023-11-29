import {View} from 'react-native';
import {render, screen} from '../../utils/test.utils';
import store from '..';

describe('tst', () => {
  it('testse', () => {
    render(<View testID="mock-component" />, {store});
    screen.getByTestId('mock-component');
  });
});
