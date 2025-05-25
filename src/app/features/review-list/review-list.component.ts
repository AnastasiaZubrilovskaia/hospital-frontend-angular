import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../core/services/review.service';
import { Review } from '../../core/models/review.model';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
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
