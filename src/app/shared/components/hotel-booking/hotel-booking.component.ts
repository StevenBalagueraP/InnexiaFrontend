import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomSuggestion } from '../../../core/interfaces/models/RoomSuggestion';
import { RoomComponent } from '../room/room.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';

interface HotelBookingMock {
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
  promotions: string[];
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
    RouterLink,
  ],
  templateUrl: './hotel-booking.component.html',
  styleUrl: './hotel-booking.component.css',
})
export class HotelBookingComponent {
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

  hotel = signal<HotelBookingMock>({
    hotelId: '69992d3af480e2b0614d313c',
    hotelName: 'Tropical Garden Inn',
    location: 'Honolulu',
    description:
      'Tropical Garden Inn es un encantador hotel rodeado de exuberantes jardines y vegetación tropical. Su ambiente relajado invita a disfrutar del clima cálido y la tranquilidad del entorno. Las habitaciones están decoradas con colores frescos y materiales naturales que evocan el paraíso. Cuenta con acceso cercano a la playa y actividades acuáticas para todos los huéspedes. El hotel dispone de una piscina al aire libre rodeada de palmeras y áreas de descanso. Su restaurante ofrece cocina fresca con sabores caribeños y cócteles tropicales.',
    amenities: ['Beach Access', 'Spa', 'Pool'],
    image: ['https://images.pexels.com/photos/7154962/pexels-photo-7154962.jpeg'],
    optionLabel: 'suggested option (1 people)',
    promotions: [
      'Carnaval',
      'Familias de 8 integrantes',
      'Niños menores de 5 años no pagan estadía',
      'Desayuno incluido',
    ],
    rooms: [
      {
        _id: '69992d3af480e2b0614d3168',
        type: 'SIMPLE_ONE',
        price: 97,
        capacity: 1,
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      {
        _id: '69992d3af480e2b0614d3169',
        type: 'SIMPLE_ONE',
        price: 97,
        capacity: 1,
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
    ],
    totalPrice: 97,
    available: true,
  });

  hasManyRooms = computed(() => this.hotel().rooms.length > 2);

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