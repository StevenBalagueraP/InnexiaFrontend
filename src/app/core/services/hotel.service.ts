import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/models/hotel-model';
import { API_URL } from '../../app.config';

@Injectable({
    providedIn: 'root',
})
export class HotelService {
    private apiUrl = `${API_URL}/hotels`;
    constructor(private http: HttpClient) { }
    getHotels(): Observable<Hotel[]> {
        return this.http.get<Hotel[]>(this.apiUrl);
    }
}