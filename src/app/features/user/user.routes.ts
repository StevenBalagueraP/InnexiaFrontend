import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../../shared/components/booking-card/booking-card.component').then(m => m.BookingCardComponent)
    }
];
