import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormComponent } from './login-form.component';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [LoginFormComponent],
    template: `
    <app-login 
      (loginSuccess)="onLogin($event)"
      [initialData]="''"
      [loading]="isLoading()"
    ></app-login>
    @if (isLoading()) {
      <div class="loading-overlay">
        <p>Iniciando sesión...</p>
      </div>
    }
  `,
    styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  `]
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = signal<boolean>(false);

    onLogin(credentials: { email: string, password: string }) {
        this.isLoading.set(true);
        this.authService.login(credentials).subscribe({
            next: () => {
                this.isLoading.set(false);
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.isLoading.set(false);
                console.error('Login failed', err);
                // Error is handled by interceptor, but we stop loading here
            }
        });
    }
}
