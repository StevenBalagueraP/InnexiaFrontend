import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { Hotel } from '../../../core/interfaces/models/hotel-model';
import { BookingService } from '../../../core/services/booking.service';
import { SearchResult } from '../../../core/interfaces/models/SearchResult';
import { SearchService } from '../../../core/services/search.service';
import { HotelListComponent } from '../../../shared/components/hotel-list/hotel-list.component';

@Component({
  selector: 'app-search',
  imports: [HotelListComponent],
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
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadHotels();
    this.loadBookings();
    this.loadSearchResults();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        const sortedHotels = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
        this.hotels.set(sortedHotels)
        console.log(this.hotels());
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar el hotel', err);
        this.error.set('Error al cargar el hotel');
      }
    })
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
  loadSearchResults(): void {
    this.searchService.loadSearchResults().subscribe({
      next: (data) => {
        console.log('Search results loaded:', data);
        this.searchResults.set(data);
      },
      error: (err) => {
        console.error('Error loading search results:', err);
        this.error.set('Error loading search results');
      }
    })
  }


} 
