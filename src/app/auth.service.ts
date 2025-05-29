import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(data: { email: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.API}/login`, data);
  }

  register(data: { name: string, email: string, password: string }) {
    return this.http.post(`${this.API}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
