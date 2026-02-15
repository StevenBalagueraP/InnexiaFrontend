import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/bookings';

    getBookings(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
