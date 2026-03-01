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
import { BookingDetailComponent } from '../../shared/components/booking-detail/booking-detail.component';

export interface BookingDetailNavState {
    adults: number;
    children: number;
    arrivalDate: string;   // ISO string
    departureDate: string; // ISO string
    roomIds: string[];
}

@Component({
    selector: 'app-booking-detail-page',
    standalone: true,
    imports: [CommonModule, BookingDetailComponent, MatProgressSpinnerModule, MatIconModule],
    template: `
    @if (loading()) {
      <div class="page-loader">
        <mat-spinner diameter="56" />
        <p>Calculando el detalle de tu reserva…</p>
      </div>
    } @else if (error()) {
      <div class="page-error">
        <mat-icon>error_outline</mat-icon>
        <p>{{ error() }}</p>
      </div>
    } @else if (summary(); as s) {
      <app-booking-detail [booking]="s" />
    }
  `,
    styles: [`
    .page-loader,
    .page-error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 16px;
      color: #888;
    }
    .page-error mat-icon { font-size: 48px; color: #e57373; }
  `],
})
export class BookingDetailPageComponent implements OnInit {
    private bookingSummaryService = inject(BookingSummaryService);
    private router = inject(Router);

    loading = signal<boolean>(true);
    error = signal<string | null>(null);
    summary = signal<BookingSummaryResponse | null>(null);

    ngOnInit(): void {
        const state = history.state as BookingDetailNavState | null;

        if (!state || !state.roomIds || state.roomIds.length === 0) {
            // No booking data – redirect back
            this.router.navigate(['/']);
            return;
        }

        const request: BookingSummaryRequest = {
            startDate: state.arrivalDate,
            endDate: state.departureDate,
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
                this.error.set('No se pudo obtener el resumen de la reserva. Intenta de nuevo.');
                this.loading.set(false);
            },
        });
    }
}
