import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'homes'`, () => {
    expect(component.title).toEqual('homes');
  });

  it('should render header with logo', () => {
    const compiled = fixture.nativeElement;
    const headerElement = compiled.querySelector('header.brand-name');
    const logoElement = compiled.querySelector('img.brand-logo');

    expect(headerElement).toBeTruthy();
    expect(logoElement).toBeTruthy();
  });

  it('should render router outlet', () => {
    const compiled = fixture.nativeElement;
    const routerOutletElement = compiled.querySelector('router-outlet');

    expect(routerOutletElement).toBeTruthy();
  });
});
