import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomSuggestion } from '../../../core/interfaces/models/RoomSuggestion';
import { RoomComponent } from '../room/room.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../core/services/search.service';
import { SearchResult } from '../../../core/interfaces/models/SearchResult';
import { SearchFilters } from '../search-form/search-form.component';

interface HotelBookingData {
  hotelId: string;
  hotelName: string;
  location: string;
  description: string;
  amenities: string[];
  image: string[];
  optionLabel: string;
  rooms: RoomSuggestion[];
  totalPrice: number;
  available: boolean;
}

@Component({
  selector: 'app-hotel-booking',
  standalone: true,
  imports: [
    CommonModule,
    RoomComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './hotel-booking.component.html',
  styleUrl: './hotel-booking.component.css',
})
export class HotelBookingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);

  readonly today = new Date();
  private readonly tomorrow = (() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t;
  })();

  arrivalDate = signal<Date>(this.today);
  departureDate = signal<Date>(this.tomorrow);

  arrivalLabel = computed(() => this.formatDate(this.arrivalDate()));
  departureLabel = computed(() => this.formatDate(this.departureDate()));

  adults = signal(1);
  children = signal(0);

  dateError = computed(() => {
    const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const baseToday = normalize(this.today);
    const arrival = normalize(this.arrivalDate());
    const departure = normalize(this.departureDate());
    return arrival < baseToday || departure < baseToday || arrival > departure;
  });

  hotel = signal<HotelBookingData | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  hasManyRooms = computed(() => (this.hotel()?.rooms.length ?? 0) > 2);

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('hotelId') ?? '';
    // Angular populates history.state with the router navigation state before the component initializes
    const stateFilters: SearchFilters | null =
      (history.state as { filters?: SearchFilters | null })?.filters ?? null;

    // Sync the date pickers to whatever the user had in the search form
    if (stateFilters?.checkIn) {
      // ISO string 'YYYY-MM-DD' — parse as local date to avoid timezone offset shifts
      const [y, m, d] = stateFilters.checkIn.split('-').map(Number);
      this.arrivalDate.set(new Date(y, m - 1, d));
    }
    if (stateFilters?.checkOut) {
      const [y, m, d] = stateFilters.checkOut.split('-').map(Number);
      this.departureDate.set(new Date(y, m - 1, d));
    }

    this.loadHotelData(hotelId, stateFilters);
  }

  private loadHotelData(hotelId: string, filters: SearchFilters | null): void {
    this.loading.set(true);
    this.error.set(null);

    const startDate = filters?.checkIn ?? this.toIsoDate(this.today);
    const endDate = filters?.checkOut ?? this.toIsoDate(this.tomorrow);

    this.searchService.loadSearchResults({
      hotelId,
      startDate,
      endDate,
      peopleCount: filters?.people && filters.people > 0 ? filters.people : undefined,
      city: filters?.location ?? undefined,
      minPrice: filters?.minPrice,
      maxPrice: filters?.maxPrice,
    }).subscribe({
      next: (results: SearchResult[]) => {
        if (results.length === 0) {
          this.error.set('No se encontraron habitaciones disponibles para este hotel.');
          this.hotel.set(null);
        } else {
          const r = results[0];
          this.hotel.set({
            hotelId: r.hotelId,
            hotelName: r.hotelName,
            location: r.location,
            description: r.description ?? '',
            amenities: r.amenities ?? [],
            image: r.image ?? [],
            optionLabel: r.optionLabel,
            rooms: r.rooms.map(room => ({
              _id: room.id,
              type: room.type,
              price: room.price,
              capacity: room.capacity,
            })),
            totalPrice: r.totalPrice,
            available: r.available,
          });
        }
        this.loading.set(false);
      },
      error: (err: Error) => {
        console.error('Error loading hotel booking:', err);
        this.error.set(err.message || 'Error al cargar la información del hotel.');
        this.loading.set(false);
      },
    });
  }

  private toIsoDate(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  private formatDate(d: Date): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    return `${d.getDate()} de ${months[d.getMonth()]}, ${d.getFullYear()}`;
  }

  setAdults(v: number): void {
    this.adults.update((n) => Math.max(0, n + v));
  }

  setChildren(v: number): void {
    this.children.update((n) => Math.max(0, n + v));
  }

  onArrivalDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.arrivalDate.set(event.value);
    }
  }

  onDepartureDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.departureDate.set(event.value);
    }
  }

  get minDate(): Date {
    const d = new Date(this.today);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}