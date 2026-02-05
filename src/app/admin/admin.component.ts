import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
    <div class="list-group">
      <a routerLink="/" class="list-group-item list-group-item-action">
        Search
      </a>
      <a routerLink="/user" class="list-group-item list-group-item-action">
        User
      </a>
      <a routerLink="/auth" class="list-group-item list-group-item-action">
        Auth
      </a>
    </div>

    <router-outlet></router-outlet>
  `
})
export class AdminComponent { }
