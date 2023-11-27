import {LocationService} from '../LocationService';

describe('LocationService', () => {
  it('should return latitude and longitude form current location', async () => {
    const position = await LocationService.getCurrentPosition();
    expect(position).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });
});
