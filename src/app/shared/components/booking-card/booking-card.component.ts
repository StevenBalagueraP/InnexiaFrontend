import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    bookings = signal<BookingCardData[]>([
        {
            id: '69a7bdde92c1e8548f970cf2',
            hotelName: 'Desert Oasis Resort',
            hotelLocation: 'Phoenix',
            hotelImage: 'https://images.pexels.com/photos/31587931/pexels-photo-31587931.jpeg',
            status: 'CONFIRMED',
            checkIn: '2026-03-04T05:06:29.157Z',
            checkOut: '2026-03-05T05:06:29.157Z',
            rooms: [
                { id: '69992d3af480e2b0614d3150', type: 'SUITE_FAMILY', price: 250, capacity: 4 },
                { id: '69992d3af480e2b0614d314c', type: 'SIMPLE_TWO', price: 279, capacity: 2 },
            ],
        },
    ]);

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