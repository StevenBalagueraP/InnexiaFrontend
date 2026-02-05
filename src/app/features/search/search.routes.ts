import { Routes } from '@angular/router';

export const SEARCH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./search').then(m => m.Search)
    }
];
