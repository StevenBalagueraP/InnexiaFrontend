import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BackendError } from '../interfaces/backend-error.interface';
import { LocalStorageService } from '../services/local-storage.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                localStorageService.removeToken();
                return throwError(() => new Error('Credenciales inválidas'));
            }

            if (error.status >= 400 && error.status < 600) {
                const backendError: BackendError = error.error;
                console.error('Backend Error:', backendError);
            }
            return throwError(() => error);
        })
    );
};
