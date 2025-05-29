import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  register() {
    if (this.form.invalid) return;
    
    interface RegisterForm {
      name: string;
      email: string;
      password: string;
    }
    
    
    const data = this.form.value as RegisterForm;

    this.authService.register(data).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: { error: { message: string } }) =>
        alert('Erro ao registrar: ' + (err?.error?.message || 'Erro desconhecido'))
    });
  }
}
