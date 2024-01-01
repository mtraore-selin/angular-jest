import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import mockHousingLocations from '../constants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [
        {
          provide: HousingService,
          useValue: {
            getAllHousingLocations: () => Promise.resolve(mockHousingLocations),
            getHousingLocationById: (id: number) =>
              Promise.resolve(mockHousingLocations.filter((h) => h.id === id)),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load housing locations on initialization', async () => {
    // Ensure that the asynchronous operation in loadHousingLocations is complete
    await fixture.whenStable();

    // Expectations based on the loaded data
    expect(component.housingLocationList).toEqual(mockHousingLocations);
    expect(component.filteredLocationList).toEqual(mockHousingLocations);
  });

  it('should filter results based on city', () => {
    // Trigger filter
    component.filterResults('Cityville');

    // Expectations based on the filter
    expect(component.filteredLocationList.length).toBe(1);
    expect(component.filteredLocationList[0].city).toBe('Cityville');

    component.filterResults('');
    expect(component.filteredLocationList).toEqual(mockHousingLocations);
  });

  // it('should handle error during loading housing locations', async () => {
  //   const errorMessage = 'Network error';
  //   housingServiceSpy.mockRejectedValue(new ErrorEvent(errorMessage));

  //   await fixture.whenStable();

  //   expect(component.error).toEqual(
  //     'Error loading housing locations. Please try again later.'
  //   );
  // });

  // Add more test cases...
});
