import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from '../interfaces/models/SearchResult';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private apiUrl = 'http://localhost:3000/search?startDate=2026-02-08&endDate=2026-02-09&hotelId=697d899386917d58b52d8405';
    constructor(private http: HttpClient) { }
    loadSearchResults(): Observable<SearchResult[]> {
        return this.http.get<SearchResult[]>(this.apiUrl);
    }
}