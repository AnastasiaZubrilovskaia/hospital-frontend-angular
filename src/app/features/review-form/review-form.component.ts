import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReviewService, Review } from '../../core/services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: 'review-form.component.html',
  styleUrls: ['review-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReviewFormComponent implements OnInit {
  doctorId: number = 0;
  reviews: Review[] = [];
  loading = true;
  error: string | null = null;
  newReview = {
    rating: 5,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id'];
      if (this.doctorId) {
        this.loadReviews();
      }
    });
  }

  loadReviews() {
    this.loading = true;
    this.error = null;

    this.reviewService.getDoctorReviews(this.doctorId)
      .pipe(
        catchError(error => {
          this.error = 'Ошибка при загрузке отзывов';
          return of([]);
        })
      )
      .subscribe((reviews: Review[]) => {
        this.reviews = reviews;
        this.loading = false;
      });
  }

  submitReview() {
    if (!this.newReview.comment.trim()) {
      this.error = 'Пожалуйста, введите комментарий';
      return;
    }

    this.loading = true;
    this.error = null;

    this.reviewService.createReview(this.doctorId, this.newReview)
      .pipe(
        catchError(error => {
          this.error = 'Ошибка при отправке отзыва';
          return of(null);
        })
      )
      .subscribe(review => {
        if (review) {
          this.reviews = [...this.reviews, review];
          this.newReview.comment = '';
          this.newReview.rating = 5;
        }
        this.loading = false;
      });
  }
} 