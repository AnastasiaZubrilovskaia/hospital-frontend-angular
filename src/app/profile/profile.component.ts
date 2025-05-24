import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { AppointmentService } from '../core/services/appointment.service';
import { User } from '../core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  appointments: any[] = [];

  constructor(private authService: AuthService, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => this.user = profile);
    this.appointmentService.getUserAppointments(this.user.id).subscribe(apps => this.appointments = apps);
  }
}