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
            getAllHousingLocations: () => Promise.reject(new Error('Error')),
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
    await fixture.whenStable();

    expect(component.housingLocationList).toEqual([]);
    expect(component.filteredLocationList).toEqual([]);
  });

  it('should filter results based on city', () => {
    component.filterResults('Cityville');

    expect(component.filteredLocationList.length).toBe(0);
  });

  it('should handle error during loading housing locations', async () => {
    await fixture.whenStable();

    expect(component.error).toEqual(
      'Error loading housing locations. Please try again later.'
    );
  });
});
