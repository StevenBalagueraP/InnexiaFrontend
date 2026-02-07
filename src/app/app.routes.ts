import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/side-menu/side-menu.component').then(m => m.SideMenuComponent),
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
            }
        ]
    }
];
