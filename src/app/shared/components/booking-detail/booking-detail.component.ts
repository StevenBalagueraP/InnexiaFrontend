import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BookingSummaryResponse } from '../../../core/services/booking-summary.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css',
})
export class BookingDetailComponent {
  readonly accentColor = '#CDA349';

  @Input({ required: true }) booking!: BookingSummaryResponse;
  @Input() confirmLoading = false;
  @Input() confirmError: string | null = null;

  /** Emitted when the user clicks "Confirmar Reserva" */
  @Output() confirmClicked = new EventEmitter<void>();

  constructor(private readonly router: Router) { }

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
    this.confirmClicked.emit();
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