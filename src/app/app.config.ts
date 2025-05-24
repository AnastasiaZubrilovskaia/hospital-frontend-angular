import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/services/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { DoctorService } from './core/services/doctor.service';
import { AppointmentService } from './core/services/appointment.service';
import { ReviewService } from './core/services/review.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthService,
    DoctorService,
    AppointmentService,
    ReviewService,
    NavbarComponent,
    FooterComponent
  ]
}; 