import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DoctorListComponent } from './doctors/doctor-list.component';
import { MyAppointmentsComponent } from './appointments/my-appointments.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ReviewFormComponent } from './features/review-form/review-form.component';
import { authGuard } from './core/services/auth.guard';
import { AppointmentBookComponent } from './appointments/appointment-booking.component';


export const routes: Routes = [
  { path: '', redirectTo: 'clinic', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'clinic',
    component: DoctorListComponent
  },
  {
    path: 'appointments/book',
    component: AppointmentBookComponent,
    canActivate: [authGuard]
  },
  {
    path: 'appointments/form',
    component: MyAppointmentsComponent
  },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'reviews',
    component: ReviewFormComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'reviews/doctor/:id',
    component: ReviewFormComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'clinic' }
]; 