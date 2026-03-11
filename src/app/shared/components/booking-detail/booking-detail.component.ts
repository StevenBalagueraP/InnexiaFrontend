import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookingSummaryResponse } from '../../../core/services/booking-summary.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css',
})
export class BookingDetailComponent {

  booking = input.required<BookingSummaryResponse>();
  confirmLoading = input<boolean>(false);
  confirmError = input<string | null>(null);

  confirmClicked = output<void>();
  cancelClicked = output<void>();

  checkInLabel = computed(() => this.formatDate(this.booking().checkInDate));
  checkOutLabel = computed(() => this.formatDate(this.booking().checkOutDate));

  totalGuests = computed(() =>
    this.booking().roomsSelected.reduce((acc, room) => acc + room.capacity, 0)
  );

  totalRooms = computed(() => this.booking().roomsSelected.length);

  onCancel(): void {
    this.cancelClicked.emit();
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