import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf]
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  goToProfile(event: Event) {
    event.preventDefault();  // отменяем дефолтное поведение ссылки
  
    this.authService.loadProfile(); // обновляем профиль (асинхронно, но ок)
    this.router.navigate(['/profile']);
  }
  
}
