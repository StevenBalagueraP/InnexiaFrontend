import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AddBookingRequest {
    checkInDate: string;
    checkOutDate: string;
    roomIds: string[];
    finalCost: number;
    peopleCount: number;
    hotelImage?: string;
}

export interface AddBookingResponse {
    id?: string;
    [key: string]: unknown;
}

@Injectable({
    providedIn: 'root',
})
export class AddBookingService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/bookings';

    createBooking(request: AddBookingRequest): Observable<AddBookingResponse> {
        return this.http.post<AddBookingResponse>(this.apiUrl, request);
    }
}
