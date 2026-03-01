import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface SelectedRoom {
  id: string;
  type: string;
  price: number;
  capacity: number;
}

interface PromotionApplied {
  name: string;
  discountAmount: number;
  discountPercentage: number;
}

interface BookingSummaryMock {
  validated: boolean;
  checkInDate: string;
  checkOutDate: string;
  roomsSelected: SelectedRoom[];
  nightsCount: number;
  baseCost: number;
  promotionsApplied: PromotionApplied[];
  estimatedDiscount: number;
  finalCost: number;
  cancellationPolicy: string;
}

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css',
})
export class BookingDetailComponent {
  readonly accentColor = '#CDA349';

  readonly booking: BookingSummaryMock = {
    validated: true,
    checkInDate: '2026-03-01T08:00:00.000Z',
    checkOutDate: '2026-03-03T00:00:00.000Z',
    roomsSelected: [
      {
        id: '697d899386917d58b52d8409',
        type: 'SIMPLE_TWO',
        price: 120,
        capacity: 2,
      },
      {
        id: '697d899386917d58b52d840f',
        type: 'SUITE_FAMILY',
        price: 180,
        capacity: 4,
      },
    ],
    nightsCount: 2,
    baseCost: 600,
    promotionsApplied: [
      {
        name: 'Niños menores de 5 años (2) - Descuento 10%',
        discountAmount: 60,
        discountPercentage: 10,
      },
    ],
    estimatedDiscount: 60,
    finalCost: 540,
    cancellationPolicy: 'Cancelación 3 días antes de la fecha de reserva.',
  };

  constructor(private readonly router: Router) {}

  get checkInLabel(): string {
    return this.formatDate(this.booking.checkInDate);
  }

  get checkOutLabel(): string {
    return this.formatDate(this.booking.checkOutDate);
  }

  get totalGuests(): number {
    return this.booking.roomsSelected.reduce((acc, room) => acc + room.capacity, 0);
  }

  get totalRooms(): number {
    return this.booking.roomsSelected.length;
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onConfirm(): void {
    console.log('Reserva confirmada (mock):', this.booking);
  }

  private formatDate(isoDate: string): string {
    const d = new Date(isoDate);
    const day = d.getDate();
    const year = d.getFullYear();
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const monthName = months[d.getMonth()];
    return `${day} de ${monthName} de ${year}`;
  }
}