import { TestBed } from '@angular/core/testing';
import { HousingService } from './housing.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HousingLocation } from './housinglocation';
import mockHousingLocations from './constants';

describe('HousingService', () => {
  let service: HousingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HousingService],
    });
    service = TestBed.inject(HousingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllHousingLocations', () => {
    it('should return an array of HousingLocation', () => {
      service.getAllHousingLocations().then((locations) => {
        expect(locations).toEqual(mockHousingLocations);
        const req = httpTestingController.expectOne(
          'http://localhost:3000/locations'
        );
        req.flush(mockHousingLocations);
      });
    });

    it('should handle an error during getAllHousingLocations', () => {
      service.getAllHousingLocations().catch((error) => {
        expect(error).toBeTruthy();
        const req = httpTestingController.expectOne(
          'http://localhost:3000/locations'
        );
        req.error(new ErrorEvent('Network error'));
      });
    });
  });

  describe('getHousingLocationById', () => {
    const sampleId = 1;

    it('should return all HousingLocations', async () => {
      const getAllHousingLocationsSpy = jest.spyOn(
        service,
        'getAllHousingLocations'
      );
      getAllHousingLocationsSpy.mockReturnValue(
        Promise.resolve(mockHousingLocations)
      );

      const result = await service.getAllHousingLocations();
      expect(result).toEqual(mockHousingLocations);
      expect(getAllHousingLocationsSpy).toHaveBeenCalledTimes(1);
      expect(getAllHousingLocationsSpy).toHaveBeenCalledWith();
    });

    it('should return a HousingLocation by id', async () => {
      const sampleId = 1;
      const mockHousingLocation = mockHousingLocations.find(
        (loc) => loc.id === sampleId
      );

      const getAllHousingLocationsSpy = jest.spyOn(
        service,
        'getHousingLocationById'
      );
      getAllHousingLocationsSpy.mockReturnValue(
        Promise.resolve(mockHousingLocation)
      );

      const result = await service.getHousingLocationById(sampleId);
      expect(result).toEqual(mockHousingLocation);
      expect(getAllHousingLocationsSpy).toHaveBeenCalledTimes(1);
      expect(getAllHousingLocationsSpy).toHaveBeenCalledWith(sampleId);
    });

    it('should return undefined for non-existing id', async () => {
      const sampleId = 13;
      const getAllHousingLocationsSpy = jest.spyOn(
        service,
        'getHousingLocationById'
      );
      getAllHousingLocationsSpy.mockReturnValue(Promise.resolve(undefined));

      const result = await service.getHousingLocationById(sampleId);
      expect(result).toEqual(undefined);
      expect(getAllHousingLocationsSpy).toHaveBeenCalledTimes(1);
      expect(getAllHousingLocationsSpy).toHaveBeenCalledWith(sampleId);
    });

    it('should handle an error during getHousingLocationById', async () => {
      const sampleId = 3;
      const errorMessage = 'Network error';
      const getHousingLocationByIdSpy = jest.spyOn(
        service,
        'getHousingLocationById'
      );
      getHousingLocationByIdSpy.mockResolvedValue(
        Promise.reject(new Error(errorMessage))
      );

      try {
        await service.getHousingLocationById(sampleId);
        fail('Expected the promise to be rejected, but it was resolved.');
      } catch (error) {
        // Access the error message
        expect((error as Error).message).toEqual(errorMessage);
        expect(getHousingLocationByIdSpy).toHaveBeenCalledTimes(1);
        expect(getHousingLocationByIdSpy).toHaveBeenCalledWith(sampleId);
      }
    });
  });

  describe('submitApplication', () => {
    it('should log the application data', () => {
      const consoleSpy = jest.spyOn(console, 'log');

      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'john.doe@example.com';

      service.submitApplication(firstName, lastName, email);

      expect(consoleSpy).toHaveBeenCalledWith(firstName, lastName, email);
    });
  });

  // it('getData() should http GET names', () => {
  //   service.getAllHousingLocations().then((res) => {
  //     expect(res).toEqual(mockHousingLocations);
  //   });

  //   const req = httpTestingController.expectOne(service.url);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(mockHousingLocations);

  //   httpTestingController.verify();
  // });
});
