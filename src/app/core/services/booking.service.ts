import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingGuests {
    adults: number;
    children: number;
    childrenAges: number[];
    _id: string;
}

export interface BookingRoom {
    _id: string;
    hotel: string;
    type: string;
    price: number;
    isAvailable: boolean;
    capacity: number;
    __v: number;
}

export interface BookingHotel {
    _id: string;
    name: string;
    location: string;
    description: string;
    amenities: string[];
    images: string[];
    __v: number;
}

export interface BookingUser {
    _id: string;
    name: string;
    email: string;
    __v: number;
}

export interface Booking {
    _id: string;
    user: BookingUser;
    hotel: BookingHotel;
    rooms: BookingRoom[];
    promotions: any[];
    checkIn: string;
    checkOut: string;
    guests: BookingGuests;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    cancelledAt?: string;
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

