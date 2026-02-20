import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { Hotel } from '../../../core/interfaces/models/hotel-model';
import { BookingService } from '../../../core/services/booking.service';
import { SearchResult } from '../../../core/interfaces/models/SearchResult';
import { SearchService } from '../../../core/services/search.service';
import { HotelCard } from '../../../shared/components/hotel-card/hotel-card.component';


@Component({
  selector: 'app-search',
  imports: [HotelCard],
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

  hotel: Hotel = {
    _id: 'h2',
    name: 'Mountain View Resort',
    location: 'Medellín',
    description: 'Descripción:  Lorem Ipsum -is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    amenities: ['Spa', 'WiFi', 'Gym'],
    images: ['https://images.pexels.com/photos/17836121/pexels-photo-17836121.jpeg']

  };

  testSearchResult: SearchResult = {
    hotel: {
      _id: 'h2',
      name: 'Mountain View Resort',
      location: 'Medellín',
      description: 'Descripción:  Lorem Ipsum -is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      amenities: ['Spa', 'WiFi', 'Gym'],
      images: ['https://images.pexels.com/photos/17836121/pexels-photo-17836121.jpeg']
    },
    optionLabel: 'Best Option',
    suggestedRooms: [
      {
        _id: 'r1',
        type: 'Deluxe',
        description: 'Descripción:  Lorem Ipsum -is simply dummy',
        capacity: 3
      },
      {
        _id: 'r2',
        type: 'Standard',
        description: 'Descripción:  Lorem Ipsum -is simply dummy',
        capacity: 2
      },
      {
        _id: 'r3',
        type: 'Standard',
        description: 'Descripción:  Lorem Ipsum -is simply dummy',
        capacity: 2
      },
      {
        _id: 'r4',
        type: 'Standard',
        description: 'Descripción:  Lorem Ipsum -is simply dummy',
        capacity: 2
      },
      {
        _id: 'r5',
        type: 'Standard',
        description: 'Descripción:  Lorem Ipsum -is simply dummy',
        capacity: 2
      },
      {
        _id: 'r6',
        type: 'Standard',
        description: 'Descripción:  Lorem Ipsum -is simply dummy',
        capacity: 2
      },
      {
        _id: 'r7',
        type: 'Standard',
        description: 'Descripción:  Lorem Ipsum -is simply dummy',
        capacity: 2
      }
    ],
    totalPrice: 600000,
    available: true
  };


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
