import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  private authService = inject(AuthService);
  public isLoggedIn = this.authService.isLoggedIn;
  public userName = this.authService.currentUserName;

  logout() {
    this.authService.logout();
  }
}
