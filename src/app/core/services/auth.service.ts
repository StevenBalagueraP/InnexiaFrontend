import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isLoggedIn = signal<boolean>(false);

    constructor() { }
}
