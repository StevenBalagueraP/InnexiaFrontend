import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/models/login-response.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private localStorageService = inject(LocalStorageService);
    private apiUrl = 'http://localhost:3000/auth/login';

    public isLoggedIn = signal<boolean>(false);
    public currentUserName = signal<string | null>(null);

    constructor() {
        this.checkLoginStatus();
    }

    login(credentials: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
            tap((response) => {
                this.localStorageService.setToken(response.access_token);
                this.setUserData(response.access_token);
                this.isLoggedIn.set(true);
            })
        );
    }

    private checkLoginStatus(): void {
        const token = this.localStorageService.getToken();
        if (token) {
            this.setUserData(token);
            this.isLoggedIn.set(true);
        }
    }

    logout(): void {
        this.localStorageService.removeToken();
        this.isLoggedIn.set(false);
        this.currentUserName.set(null);
    }

    private setUserData(token: string): void {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            // Adjust property name based on your JWT payload structure (e.g. 'name', 'username', 'sub')
            // Assuming 'name' or fallback to 'email' or 'sub'
            const name = payload.name || payload.username || payload.email || payload.sub;
            this.currentUserName.set(name);
        } catch (e) {
            console.error('Error decoding token', e);
            this.logout();
        }
    }
}
