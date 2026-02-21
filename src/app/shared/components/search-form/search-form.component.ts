import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

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

  // ====== FECHAS ======
  today = new Date();
  tomorrow = new Date(this.today.getTime() + 86400000);

  checkIn = signal(this.formatDate(this.today));
  checkOut = signal(this.formatDate(this.tomorrow));

  // ====== FILTROS ======
  people = signal(1);

  minPrice = signal(100);
  maxPrice = signal(900);

  location = signal<string | null>(null);

  locations = [
    'Ubicación 1',
    'Ubicación 2',
    'Ubicación 3',
    'Ubicación 4',
    'Ubicación 5'
  ];

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

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
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
  this.checkIn.set('');
  this.checkOut.set('');
  this.people.set(0);
  this.minPrice.set(0);
  this.maxPrice.set(1000);
  this.location.set(null);
}
}