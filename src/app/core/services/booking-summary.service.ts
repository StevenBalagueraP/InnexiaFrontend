import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingSummaryRequest {
    startDate: string;
    endDate: string;
    peopleCount: number;
    roomIds: string[];
    childCount: number;
    adultCount: number;
}

export interface SelectedRoom {
    id: string;
    type: string;
    price: number;
    capacity: number;
}

export interface PromotionApplied {
    name: string;
    discountAmount: number;
    discountPercentage: number;
}

export interface BookingSummaryResponse {
    validated: boolean;
    checkInDate: string;
    checkOutDate: string;
    roomsSelected: SelectedRoom[];
    nightsCount: number;
    baseCost: number;
    promotionsApplied: PromotionApplied[];
    estimatedDiscount: number;
    finalCost: number;
    cancellationPolicy: string;
}

@Injectable({
    providedIn: 'root',
})
export class BookingSummaryService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/bookings/summary';

    getSummary(request: BookingSummaryRequest): Observable<BookingSummaryResponse> {
        return this.http.post<BookingSummaryResponse>(this.apiUrl, request);
    }
}
