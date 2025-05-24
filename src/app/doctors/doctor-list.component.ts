import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../core/services/doctor.service';
import { Doctor } from '../core/models/doctor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  specialties: { name: string }[] = [];
  selectedSpecialty: string | null = null;

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit() {
    this.loadDoctors();
    this.doctorService.getSpecialties().subscribe(data => this.specialties = data);
  }

  loadDoctors() {
    if (this.selectedSpecialty) {
      this.doctorService.getBySpecialty(this.selectedSpecialty).subscribe(data => this.doctors = data);
    } else {
      this.doctorService.getAll().subscribe(data => this.doctors = data);
    }
  }

  onSpecialtyChange() {
    this.loadDoctors();
  }

  bookAppointment(doctorId: number) {
    this.router.navigate(['/appointments/form'], { queryParams: { doctorId } });
  }
}

