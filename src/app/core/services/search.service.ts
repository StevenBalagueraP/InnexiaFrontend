import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from '../interfaces/models/SearchResult';
import { API_URL } from '../../app.config';

export interface SearchParams {
    startDate: string;
    endDate: string;
    peopleCount?: number;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    hotelId?: string;
}

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private apiUrl = `${API_URL}/search`;

    constructor(private http: HttpClient) { }

    loadSearchResults(params: SearchParams): Observable<SearchResult[]> {
        let httpParams = new HttpParams()
            .set('startDate', params.startDate)
            .set('endDate', params.endDate);

        if (params.peopleCount !== undefined && params.peopleCount > 0) {
            httpParams = httpParams.set('peopleCount', params.peopleCount.toString());
        }
        if (params.city) {
            httpParams = httpParams.set('city', params.city);
        }
        if (params.minPrice !== undefined) {
            httpParams = httpParams.set('minPrice', params.minPrice.toString());
        }
        if (params.maxPrice !== undefined) {
            httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
        }
        if (params.hotelId) {
            httpParams = httpParams.set('hotelId', params.hotelId);
        }
        console.log(httpParams);

        return this.http.get<SearchResult[]>(this.apiUrl, { params: httpParams });
    }
}