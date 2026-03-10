import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {
    BookingSummaryService,
    BookingSummaryRequest,
    BookingSummaryResponse,
} from '../../core/services/booking-summary.service';
import { AddBookingService } from '../../core/services/add-booking.service';
import { BookingDetailComponent } from '../../shared/components/booking-detail/booking-detail.component';

export interface BookingDetailNavState {
    adults: number;
    children: number;
    arrivalDate: string;
    departureDate: string;
    roomIds: string[];
    hotelId: string;
    hotelImage?: string;
}

@Component({
    selector: 'app-booking-detail-page',
    standalone: true,
    imports: [CommonModule, BookingDetailComponent, MatProgressSpinnerModule, MatIconModule],
    templateUrl: './booking-detail.page.component.html',
    styleUrl: './booking-detail.page.component.css',
})
export class BookingDetailPageComponent implements OnInit {
    private bookingSummaryService = inject(BookingSummaryService);
    private addBookingService = inject(AddBookingService);
    private router = inject(Router);

    loading = signal<boolean>(true);
    error = signal<string | null>(null);
    summary = signal<BookingSummaryResponse | null>(null);

    confirmLoading = signal<boolean>(false);
    confirmError = signal<string | null>(null);

    private navState: BookingDetailNavState | null = null;

    private toLocalNoon(dateStr: string): string {
        return `${dateStr}T12:00:00`;
    }

    ngOnInit(): void {
        const state = history.state as BookingDetailNavState | null;

        if (!state || !state.roomIds || state.roomIds.length === 0) {
            this.router.navigate(['/']);
            return;
        }

        this.navState = state;

        const request: BookingSummaryRequest = {
            startDate: this.toLocalNoon(state.arrivalDate),
            endDate: this.toLocalNoon(state.departureDate),
            adultCount: state.adults,
            childCount: state.children,
            peopleCount: state.adults + state.children,
            roomIds: state.roomIds,
        };

        this.bookingSummaryService.getSummary(request).subscribe({
            next: (response) => {
                this.summary.set(response);
                this.loading.set(false);
            },
            error: (err: Error) => {
                console.error('Error fetching booking summary:', err);
                this.loading.set(false);

                const is409 = (err as any)?.status === 409
                    || err?.message?.includes('One or more rooms are already booked');


                if (is409) {
                    this.goBackToHotelBooking(true);
                    return;
                }

                this.error.set('No se pudo obtener el resumen de la reserva. Intenta de nuevo.');
            },
        });
    }

    onConfirm(): void {
        const s = this.summary();
        const state = this.navState;
        if (!s || !state) return;

        this.confirmLoading.set(true);
        this.confirmError.set(null);

        this.addBookingService.createBooking({
            checkInDate: s.checkInDate,
            checkOutDate: s.checkOutDate,
            roomIds: state.roomIds,
            finalCost: s.finalCost,
            peopleCount: state.adults + state.children,
            hotelImage: state.hotelImage,
        }).subscribe({
            next: () => {
                this.confirmLoading.set(false);
                this.router.navigate(['/user']);
            },
            error: (err: Error) => {
                console.error('Error creating booking:', err);
                this.confirmLoading.set(false);

                const is409 = (err as any)?.status === 409
                    || err?.message?.includes('One or more rooms are already booked');

                if (is409) {
                    this.goBackToHotelBooking(true);
                    return;
                }

                this.confirmError.set(err.message || 'No se pudo confirmar la reserva. Intenta de nuevo.');
            },
        });
    }

    onCancel(): void {
        this.goBackToHotelBooking();
    }

    private goBackToHotelBooking(conflict = false): void {
        const state = this.navState;
        if (!state?.hotelId) {
            this.router.navigate(['/']);
            return;
        }

        this.router.navigate(['/hotel-booking', state.hotelId], {
            state: {
            conflict,          
            filters: {
                checkIn: state.arrivalDate,
                checkOut: state.departureDate,
            },
            },
        });
    }
}
