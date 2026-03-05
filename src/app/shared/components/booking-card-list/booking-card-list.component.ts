import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingCardComponent, BookingCardData } from '../booking-card/booking-card.component';

@Component({
    selector: 'app-booking-card-list',
    standalone: true,
    imports: [CommonModule, BookingCardComponent],
    templateUrl: './booking-card-list.component.html',
    styleUrl: './booking-card-list.component.css',
})
export class BookingCardListComponent {
    @Input() bookings: BookingCardData[] = [];
}