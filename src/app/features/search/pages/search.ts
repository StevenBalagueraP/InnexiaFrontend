import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../../core/services/hotel.service';
import { Hotel } from '../../../core/interfaces/models/hotel-model';

@Component({
  selector: 'app-search',
  imports: [],
  standalone: true,
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private hotelService = inject(HotelService)
  hotels = signal<Hotel[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  constructor() {
    this.loadHotels();
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

} 
