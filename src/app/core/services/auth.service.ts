import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from "@angular/router";


export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthDate?: string;
  role?: string;
}


export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `http://localhost:5000/api/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadProfile();
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
          this.router.navigate(['/clinic']);
        })
      );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
          this.router.navigate(['/clinic']);
        })
      );
  }

  loadProfile(): void {
    this.http.get<User>(`${this.apiUrl}/profile`)
      .subscribe({
        next: (response) => {
          console.log('Profile loaded:', response);
          this.currentUserSubject.next(response);
        },
        error: (error) => {
          console.error('Error loading profile:', error);
          this.logout();
        }
      });
  }
  
  

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}