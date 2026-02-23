import { Component, signal, computed, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

export interface SearchFilters {
  checkIn: string;
  checkOut: string;
  people: number;
  minPrice: number;
  maxPrice: number;
  location: string | null;
  hasChanges: boolean;
}

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule, MatIconModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchForm {

  readonly initialState = {
    checkIn: this.getToday(),
    checkOut: this.getTomorrow(),
    people: 0,
    minPrice: 0,
    maxPrice: 1000,
    location: ''
  };

  checkIn = signal(this.initialState.checkIn);
  checkOut = signal(this.initialState.checkOut);

  people = signal(this.initialState.people);

  minPrice = signal(this.initialState.minPrice);
  maxPrice = signal(this.initialState.maxPrice);

  location = signal<string | null>(this.initialState.location);

  locations = [
    'Phoenix',
    'New York',
    'Los Angeles',
    'Aspen',
    'Alaska',
    'Miami',
    'Honolulu',
    'Chicago'
  ];

  // Output to notify parent of filter changes
  filtersChanged = output<SearchFilters>();

  updateMin(value: number) {
    if (value < this.maxPrice()) {
      this.minPrice.set(value);
    }
  }

  updateMax(value: number) {
    if (value > this.minPrice()) {
      this.maxPrice.set(value);
    }
  }

  filters = computed(() => ({
    checkIn: this.checkIn(),
    checkOut: this.checkOut(),
    people: this.people(),
    minPrice: this.minPrice(),
    maxPrice: this.maxPrice(),
    location: this.location()
  }));

  dateError = computed(() => {
    const start = new Date(this.checkIn());
    const end = new Date(this.checkOut());

    return start > end;
  });

  increasePeople() {
    if (this.people() < 30) {
      this.people.update(v => v + 1);
    }
  }

  decreasePeople() {
    if (this.people() > 0) {
      this.people.update(v => v - 1);
    }
  }

  clearFilters() {
    this.checkIn.set(this.initialState.checkIn);
    this.checkOut.set(this.initialState.checkOut);
    this.people.set(this.initialState.people);
    this.minPrice.set(this.initialState.minPrice);
    this.maxPrice.set(this.initialState.maxPrice);
    this.location.set(this.initialState.location);
  }

  private getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private getTomorrow(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  hasChanges = computed(() => {
    return (
      this.checkIn() !== this.initialState.checkIn ||
      this.checkOut() !== this.initialState.checkOut ||
      this.people() !== this.initialState.people ||
      this.minPrice() !== this.initialState.minPrice ||
      this.maxPrice() !== this.initialState.maxPrice ||
      this.location() !== this.initialState.location
    );
  });

  constructor() {
    // Emit whenever any filter changes
    effect(() => {
      const currentFilters: SearchFilters = {
        checkIn: this.checkIn(),
        checkOut: this.checkOut(),
        people: this.people(),
        minPrice: this.minPrice(),
        maxPrice: this.maxPrice(),
        location: this.location(),
        hasChanges: this.hasChanges()
      };
      this.filtersChanged.emit(currentFilters);
    });
  }
}