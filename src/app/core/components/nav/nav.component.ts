import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/">Медицинский центр</a>
      </div>
      <div class="nav-links">
        <ng-container *ngIf="authService.isAuthenticated(); else authButtons">
          <a routerLink="/clinic" routerLinkActive="active">Врачи</a>
          <a routerLink="/appointments/form" routerLinkActive="active">Записаться</a>
          <a routerLink="/profile" routerLinkActive="active">Профиль</a>
          <a routerLink="/reviews" routerLinkActive="active">Отзывы</a>
          <button (click)="logout()" class="logout-btn">Выход</button>
        </ng-container>
        <ng-template #authButtons>
          <a routerLink="/login" routerLinkActive="active">Вход</a>
          <a routerLink="/register" routerLinkActive="active">Регистрация</a>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .nav-brand a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-links a {
      color: #666;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      color: #333;
      background-color: #f5f5f5;
    }

    .nav-links a.active {
      color: #007bff;
      font-weight: 500;
    }

    .logout-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
      background-color: #c82333;
    }
  `]
})
export class NavComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
} 