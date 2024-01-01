import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HousingService } from '../housing.service';
import mockHousingLocations from '../constants';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockActivatedRoute: any;

  beforeEach(waitForAsync(() => {
    mockActivatedRoute = {
      snapshot: convertToParamMap({ id: '1' }),
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: HousingService,
          useValue: {
            getHousingLocationById: (id: number) =>
              Promise.resolve(mockHousingLocations.find((h) => h.id === id)),
            submitApplication: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch housing location details on initialization', () => {
    const mockHousingLocation = mockHousingLocations[0];
    fixture.detectChanges();
    expect(component.housingLocation).toEqual(mockHousingLocation);
  });

  it('should submit application when the form is submitted', fakeAsync(() => {
    const submitSpy = jest.spyOn(component.housingService, 'submitApplication');
    component.applyForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    tick();
    expect(submitSpy).toHaveBeenCalledWith(
      'John',
      'Doe',
      'john.doe@example.com'
    );
  }));

  it('should not submit application when the form is empty', fakeAsync(() => {
    const emptyInput = '';
    const submitSpy = jest.spyOn(component.housingService, 'submitApplication');
    component.applyForm.setValue({
      firstName: null,
      lastName: null,
      email: null,
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    tick();
    expect(submitSpy).toHaveBeenCalledWith(emptyInput, emptyInput, emptyInput);
  }));
});
