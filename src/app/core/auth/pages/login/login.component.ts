import { Component, ChangeDetectionStrategy, signal, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    // Signals for inputs and outputs as requested
    initialData = input<string>(''); // Receiving initial data via signal
    loginSuccess = output<void>(); // Emitting event via signal

    private fb = inject(FormBuilder);

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Signals for password and email values as explicitly requested
    // We sync these with the form controls to ensure we meet the "use signals for password and email" requirement
    // while keeping the "Reactive Validators" requirement.
    email = toSignal(this.loginForm.controls['email'].valueChanges, { initialValue: '' });
    password = toSignal(this.loginForm.controls['password'].valueChanges, { initialValue: '' });

    // Signal for password visibility
    hidePassword = signal(true);

    constructor() {
        // Effect to handle initial data if provided
        effect(() => {
            const initial = this.initialData();
            if (initial) {
                this.loginForm.patchValue({ email: initial });
            }
        });

        // Logging signals to demonstrate usage (optional, or for debugging)
        // effect(() => console.log('Email Signal:', this.email()));
        // effect(() => console.log('Password Signal:', this.password()));
    }

    togglePasswordVisibility(event: MouseEvent) {
        event.preventDefault();
        this.hidePassword.update(value => !value);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Login with:', { email: this.email(), password: this.password() });
            this.loginSuccess.emit();
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    get emailError(): string {
        const control = this.loginForm.get('email');
        if (control?.hasError('required')) {
            return 'El correo es requerido';
        }
        if (control?.hasError('email')) {
            return 'Ingresa un correo válido';
        }
        return '';
    }

    get passwordError(): string {
        const control = this.loginForm.get('password');
        if (control?.hasError('required')) {
            return 'La contraseña es requerida';
        }
        if (control?.hasError('minlength')) {
            return 'Mínimo 6 caracteres';
        }
        return '';
    }
}
