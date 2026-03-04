import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingRoom {
    id: string;
    type: string;
    price: number;
    capacity: number;
}

export interface Booking {
    id: string;
    hotelName: string;
    hotelLocation: string;
    hotelImage: string | null;
    status: string;
    checkIn: string;
    checkOut: string;
    rooms: BookingRoom[];
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/bookings';

    getBookings(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getUserBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.apiUrl);
    }
}

