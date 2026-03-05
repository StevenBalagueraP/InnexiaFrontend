import { Component, input, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookingService } from '../../../core/services/booking.service';

export interface BookingCardRoom {
    id: string;
    type: string;
    price: number;
    capacity: number;
}

export interface BookingCardData {
    id: string;
    hotelName: string;
    hotelLocation: string;
    hotelImage: string | null;
    status: string;
    checkIn: string;
    checkOut: string;
    rooms: BookingCardRoom[];
}

@Component({
    selector: 'app-booking-card',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule],
    templateUrl: './booking-card.component.html',
    styleUrl: './booking-card.component.css',
})
export class BookingCardComponent {
    // Angular v17+ signal input
    booking = input.required<BookingCardData>();

    private bookingService = inject(BookingService);

    isCancelling = signal<boolean>(false);
    cancelError = signal<string | null>(null);
    cancelled = signal<boolean>(false);

    /** El botón está deshabilitado si: status es CANCELLED, ya se canceló en esta sesión,
     *  la fecha de checkOut ya pasó, o se está procesando la cancelación. */
    isDisabled = computed(() => {
        const b = this.booking();
        if (!b) return true;
        if (this.isCancelling()) return true;
        if (this.cancelled()) return true;
        if (b.status === 'CANCELLED') return true;
        const checkOutDate = new Date(b.checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        checkOutDate.setHours(0, 0, 0, 0);
        if (checkOutDate < today) return true;
        return false;
    });

    onCancel(): void {
        const bookingId = this.booking().id;
        this.isCancelling.set(true);
        this.cancelError.set(null);
        console.log(bookingId)

        this.bookingService.cancelBooking(bookingId).subscribe({
            next: () => {
                this.cancelled.set(true);
                this.isCancelling.set(false);
            },
            error: (err) => {
                this.isCancelling.set(false);
                if (err?.status === 400) {
                    this.cancelError.set('Debe cancelar con 3 días de anticipación. Se cobrará el monto total.');
                } else {
                    this.cancelError.set('Ocurrió un error al cancelar la reserva.');
                }
            }
        });
    }

    formatDate(dateStr: string): string {
        return new Date(dateStr).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    getStatusLabel(status: string): string {
        const map: Record<string, string> = {
            CONFIRMED: 'Confirmado',
            CANCELLED: 'Cancelado',
            COMPLETED: 'Completado',
        };
        return map[status] ?? status;
    }

    formatRoomType(type: string): string {
        return type.replace(/_/g, ' ');
    }
}