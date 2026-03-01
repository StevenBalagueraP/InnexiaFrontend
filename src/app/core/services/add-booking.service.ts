import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AddBookingRequest {
    checkInDate: string;   // ISO string e.g. "2026-02-07T00:00:00.000Z"
    checkOutDate: string;  // ISO string
    roomIds: string[];
    finalCost: number;
    peopleCount: number;
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
