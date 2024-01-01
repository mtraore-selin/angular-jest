import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <!-- Show error div if there is an error -->
      <div *ngIf="error" class="error-popup">
        {{ error }}
      </div>

      <!-- Display housing locations if no error -->
      <ng-container *ngIf="!error">
        <app-housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation"
        >
        </app-housing-location>
      </ng-container>
    </section>
  `,

  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  error: string | null = null; // Variable to store the error message

  constructor(private housingService: HousingService) {
    this.loadHousingLocations();
  }

  private async loadHousingLocations() {
    try {
      this.housingLocationList =
        await this.housingService.getAllHousingLocations();
      this.filteredLocationList = [...this.housingLocationList];
    } catch (error) {
      this.error = 'Error loading housing locations. Please try again later.';
    }
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = [...this.housingLocationList];
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
