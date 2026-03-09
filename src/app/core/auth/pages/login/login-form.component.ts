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
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    initialData = input<string>(''); 
    loading = input<boolean>(false); 
    errorMessage = input<string>(''); 
    loginSuccess = output<{ email: string, password: string }>();

    private fb = inject(FormBuilder);

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    email = toSignal(this.loginForm.controls['email'].valueChanges, { initialValue: '' });
    password = toSignal(this.loginForm.controls['password'].valueChanges, { initialValue: '' });

    hidePassword = signal(true);

    constructor() {
        effect(() => {
            const initial = this.initialData();
            if (initial) {
                this.loginForm.patchValue({ email: initial });
            }
        });

        effect(() => {
            const error = this.errorMessage();
            if (error) {
                this.loginForm.get('password')?.setErrors({ invalidCredentials: true });
                this.loginForm.markAllAsTouched(); 
            }
        });

    }

    togglePasswordVisibility(event: MouseEvent) {
        event.preventDefault();
        this.hidePassword.update(value => !value);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Login with:', { email: this.email(), password: this.password() });
            this.loginSuccess.emit({ email: this.email()!, password: this.password()! });
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
        if (control?.hasError('invalidCredentials')) {
            return this.errorMessage() || 'Credenciales inválidas';
        }
        return '';
    }
}
