import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);
    const authService = inject(AuthService);

    const token = localStorageService.getToken();

    return next(addAuthHeader(req, token)).pipe(
        catchError((error: HttpErrorResponse) => {
            if (
                error.status === 401 &&
                !req.url.includes('/auth/refresh') &&
                !req.url.includes('/auth/login')
            ) {
                return handle401(req, next, localStorageService, authService);
            }
            return throwError(() => error);
        })
    );
};

function addAuthHeader(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
    if (!token) return req;
    return req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
    });
}

function handle401(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
    localStorageService: LocalStorageService,
    authService: AuthService
): Observable<HttpEvent<unknown>> {
    if (isRefreshing) {
        return refreshTokenSubject.pipe(
            filter((token): token is string => token !== null),
            take(1),
            switchMap((token) => next(addAuthHeader(req, token)))
        );
    }

    isRefreshing = true;
    refreshTokenSubject.next(null); 

    return authService.refreshToken().pipe(
        switchMap((response) => {
            isRefreshing = false;
            refreshTokenSubject.next(response.access_token);
            return next(addAuthHeader(req, response.access_token));
        }),
        catchError((refreshError) => {
            isRefreshing = false;
            refreshTokenSubject.next(null);
            authService.handleSessionExpired();
            return throwError(() => refreshError);
        })
    );
}
