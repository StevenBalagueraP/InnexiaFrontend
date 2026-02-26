import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('./features/search/search.routes').then(m => m.SEARCH_ROUTES)
            },
            {
                path: 'user',
                loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES)
            },
            {
                path: 'auth',
                loadChildren: () => import('./core/auth/auth.routes').then(m => m.AUTH_ROUTES)
            },
            {
                path: 'hotel-booking',
                loadComponent: () => import('./shared/components/hotel-booking/hotel-booking.component').then(m => m.HotelBookingComponent)
            }
        ]
    }
];
