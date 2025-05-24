import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Компоненты
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DoctorListComponent } from './doctors/doctor-list.component';
import { AppointmentFormComponent } from './appointments/appointment-form.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ReviewFormComponent } from './features/review-form/review-form.component';

// Guards
import { authGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'clinic', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'clinic',
    component: DoctorListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'appointments/form',
    component: AppointmentFormComponent,
    canActivate: [authGuard]
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

  // fallback
  { path: '**', redirectTo: 'clinic' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}