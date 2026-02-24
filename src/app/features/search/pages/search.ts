import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { Hotel } from '../../../core/interfaces/models/hotel-model';
import { BookingService } from '../../../core/services/booking.service';
import { SearchResult } from '../../../core/interfaces/models/SearchResult';
import { SearchService } from '../../../core/services/search.service';
import { HotelListComponent } from '../../../shared/components/hotel-list/hotel-list.component';
import { SearchForm, SearchFilters } from '../../../shared/components/search-form/search-form.component';

@Component({
  selector: 'app-search',
  imports: [HotelListComponent, SearchForm],
  standalone: true,
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private hotelService = inject(HotelService);
  private bookingService = inject(BookingService);
  private searchService = inject(SearchService);

  hotels = signal<Hotel[]>([]);
  searchResults = signal<SearchResult[]>([]);
  isSearchActive = signal<boolean>(false);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadHotels();
    this.loadBookings();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        const sortedHotels = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.hotels.set(sortedHotels);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar el hotel', err);
        this.error.set('Error al cargar el hotel');
      }
    });
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        console.log('Bookings loaded:', data);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
  }

  onFiltersChanged(filters: SearchFilters): void {
    if (filters.hasChanges) {
      this.isSearchActive.set(true);
      this.error.set(null);
      this.searchService.loadSearchResults({
        startDate: filters.checkIn,
        endDate: filters.checkOut,
        peopleCount: filters.people,
        city: filters.location ?? undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      }).subscribe({
        next: (data) => {
          this.searchResults.set(data);
          this.error.set(null);
        },
        error: (err: Error) => {
          console.error('Search error:', err);
          this.searchResults.set([]);
          // err.message is already normalized by the ErrorInterceptor
          this.error.set(err.message || 'No se pudieron cargar los resultados de búsqueda.');
        }
      });
    } else {
      this.isSearchActive.set(false);
      this.searchResults.set([]);
      this.error.set(null);
    }
  }
}
