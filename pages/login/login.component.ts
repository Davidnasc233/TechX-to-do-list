import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<{ token: string }>('http://localhost:3000/api/login', {
      username: this.username,
      password: this.password,
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/todolist']);
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos.';
      }
    });
  }
}

