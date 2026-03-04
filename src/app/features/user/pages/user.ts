import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../../core/services/booking.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  private bookingService = inject(BookingService);

  bookings = signal<Booking[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.bookingService.getUserBookings().subscribe({
      next: (data) => {
        console.log('Reservas del usuario:', data);
        this.bookings.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar reservas:', err);
        this.isLoading.set(false);
      }
    });
  }
}
