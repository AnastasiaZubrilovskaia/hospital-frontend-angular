import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../core/services/review.service';
import { Review } from '../../core/models/review.model';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading">Загрузка отзывов...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
    <div *ngIf="!loading && reviews.length === 0">Пока нет отзывов</div>
    <div *ngFor="let review of reviews" class="review-item">
      <div>Оценка: {{ review.rating }} / 5</div>
      <div><strong>Комментарий:</strong> {{ review.comment }}</div>
      <div *ngIf="review.Patient"><em>Пациент: {{ review.Patient.firstName }} {{ review.Patient.lastName }}</em></div>
    </div>
  `,
  styles: [`
    .review-item { border-top: 1px solid #ccc; padding: 8px 0; }
    .error { color: red; }
  `]
})
export class ReviewListComponent implements OnChanges {
  @Input() doctorId!: number;
  reviews: Review[] = [];
  loading = false;
  error: string | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['doctorId'] && this.doctorId) {
      this.loadReviews();
    }
  }

  loadReviews() {
    this.loading = true;
    this.error = null;
    this.reviewService.getDoctorReviews(this.doctorId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.loading = false;
      },
      error: () => {
        this.error = 'Ошибка загрузки отзывов';
        this.loading = false;
      }
    });
  }
}
