import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { BackendError } from '../interfaces/backend-error.interface';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status >= 400 && error.status < 600) {
                const backendError: BackendError = error.error;
                console.error('Backend Error:', backendError);
            }
            return throwError(() => error);
        })
    );
};
