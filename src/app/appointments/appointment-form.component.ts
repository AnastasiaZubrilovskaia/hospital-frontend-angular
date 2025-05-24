import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../core/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class AppointmentFormComponent {
  appointment = { date: '', time: '', doctorId: 0, userId: 0 };

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.appointment.doctorId = +params['doctorId'] || 0;
    });
  }

  submitAppointment() {
    this.appointmentService.create(this.appointment).subscribe();
  }
}