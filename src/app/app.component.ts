import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main class="container mt-4">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet]
})
export class AppComponent {}
