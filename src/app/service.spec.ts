import { HousingService } from './housing.service';
import mockHousingLocations from './constants';

describe('HousingService', () => {
  let service: HousingService;

  beforeEach(() => {
    service = new HousingService();
  });

  it('should fetch and parse housing locations', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockHousingLocations),
    });

    const result = await service.getAllHousingLocations();

    expect(fetch).toHaveBeenCalledWith(' http://localhost:3000/locations');
    expect(result).toEqual(mockHousingLocations);
  });

  it('should handle fetch error', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    try {
      await service.getAllHousingLocations();
      fail('Expected the promise to be rejected, but it was resolved.');
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith(' http://localhost:3000/locations');
      expect((error as Error).message).toEqual('Network error');
    }
  });

  it('should fetch and parse a housing location by id', async () => {
    // Mock the fetch API
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockHousingLocations[0]),
    });

    // Call the method under test
    const result = await service.getHousingLocationById(1);

    // Expectations
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/locations/1');
    expect(result).toEqual(mockHousingLocations[0]);
  });

  it('should handle fetch error for getHousingLocationById', async () => {
    // Mock the fetch API to simulate an error
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    // Call the method under test
    try {
      await service.getHousingLocationById(1);
      // If the promise doesn't reject, fail the test
      fail('Expected the promise to be rejected, but it was resolved.');
    } catch (error) {
      // Expectations for error handling
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/locations/1');
      expect((error as Error).message).toEqual('Network error');
    }
  });
});
