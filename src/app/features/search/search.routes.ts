import { Routes } from '@angular/router';

export const SEARCH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/search').then(m => m.Search)
    },
    {
        path: 'hotel-booking/:hotelId',
        loadComponent: () => import('../../shared/components/hotel-booking/hotel-booking.component').then(m => m.HotelBookingComponent)
    }
];
