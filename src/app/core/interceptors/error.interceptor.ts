import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { BackendError } from '../interfaces/backend-error.interface';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // 401 is handled by authInterceptor (token refresh + redirect).
            // Here we only translate other HTTP errors into user-friendly messages.
            if (error.status === 401) {
                return throwError(() => error); // let it propagate as-is
            }

            if (error.status >= 400 && error.status < 600) {
                const backendError: BackendError = error.error;
                console.error('Backend Error:', backendError);

                const message =
                    backendError?.message ||
                    (error.status === 400 ? 'Parámetros de búsqueda inválidos.' :
                        error.status === 404 ? 'No se encontraron resultados.' :
                            error.status === 409 ? 'Ya existe una reserva para esas fechas o habitaciones.' :
                                error.status === 500 ? 'Error interno del servidor. Intente más tarde.' :
                                    `Error ${error.status}: algo salió mal.`);

                return throwError(() => new Error(message));
            }

            return throwError(() => new Error('Error de red. Verifique su conexión.'));
        })
    );
};
