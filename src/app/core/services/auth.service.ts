import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/models/login-response.model';
import { LocalStorageService } from './local-storage.service';
import { API_URL } from '../../app.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private localStorageService = inject(LocalStorageService);
    private router = inject(Router);

    public isLoggedIn = signal<boolean>(false);
    public currentUserName = signal<string | null>(null);

    constructor() {
        this.checkLoginStatus();
    }

    login(credentials: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${API_URL}/auth/login`, credentials).pipe(
            tap((response) => {
                this.localStorageService.setToken(response.access_token);
                this.setUserData(response.access_token);
                this.isLoggedIn.set(true);
            })
        );
    }

    /**
     * Calls POST /auth/refresh with the current (possibly expired) token.
     * The backend accepts expired tokens on this endpoint via JwtRefreshGuard.
     * Returns the new access_token or throws on failure.
     */
    refreshToken(): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${API_URL}/auth/refresh`, {}).pipe(
            tap((response) => {
                this.localStorageService.setToken(response.access_token);
                this.setUserData(response.access_token);
                this.isLoggedIn.set(true);
            })
        );
    }

    /**
     * Clears all session data and redirects to the login page.
     * Called when a token refresh fails (token is too old / invalid signature).
     */
    handleSessionExpired(): void {
        this.localStorageService.removeToken();
        this.isLoggedIn.set(false);
        this.currentUserName.set(null);
        this.router.navigate(['/auth/login']);
    }

    logout(): void {
        this.localStorageService.removeToken();
        this.isLoggedIn.set(false);
        this.currentUserName.set(null);
    }

    private checkLoginStatus(): void {
        const token = this.localStorageService.getToken();
        if (!token) return;

        if (this.isTokenExpired(token)) {
            // Token is expired at startup — try a silent refresh before giving up
            this.refreshToken().pipe(
                catchError(() => {
                    this.handleSessionExpired();
                    return of(null);
                })
            ).subscribe();
        } else {
            this.setUserData(token);
            this.isLoggedIn.set(true);
        }
    }

    /** Returns true if the JWT exp claim is in the past. */
    isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            // exp is in seconds; Date.now() is in milliseconds
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }

    private setUserData(token: string): void {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const name = payload.name || payload.username || payload.email || payload.sub;
            this.currentUserName.set(name);
        } catch (e) {
            console.error('Error decoding token', e);
            this.logout();
        }
    }
}
