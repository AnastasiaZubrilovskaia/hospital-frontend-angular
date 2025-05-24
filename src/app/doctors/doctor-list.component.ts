import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../core/services/doctor.service';
import { Doctor } from '../core/models/doctor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../core/models/review.model';
import { ReviewListComponent } from '../features/review-list/review-list.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReviewListComponent]
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  specialties: { name: string }[] = [];
  selectedSpecialty: string | null = null;
  doctorReviews: { [doctorId: number]: Review[] } = {};
  expandedDoctorId: number | null = null;

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

  isAuthorized(): boolean {
    return !!localStorage.getItem('token');
  }

  leaveReview(doctorId: number) {
    this.router.navigate(['/reviews/doctor', doctorId]);
  }

  toggleReviews(doctorId: number) {
    if (this.expandedDoctorId === doctorId) {
      this.expandedDoctorId = null;
    } else {
      this.expandedDoctorId = doctorId;
      if (!this.doctorReviews[doctorId]) {
        this.loadReviewsForDoctor(doctorId);
      }
    }
  }

  loadReviewsForDoctor(doctorId: number) {
    this.doctorService.getReviews(doctorId).subscribe({
      next: (reviews) => {
        this.doctorReviews[doctorId] = reviews;
      },
      error: (err) => {
        console.error('Ошибка загрузки отзывов:', err);
      }
    });
  }
}
